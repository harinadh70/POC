-- =============================================================================================================
-- Author:       AXA
-- Create date:  2026-09-06
-- Description:  OCBC Virtual Account (VA) credit notification - policy / application data retrieval.
--
--               PURPOSE
--               When OCBC notifies AXA that a payment has landed on a Virtual Account, payment-sapi has to
--               decide whether the payment can be posted to RLS straight through (STP DCR). The decision
--               tree is on VADesign v0.9 slide 28 ("DCR Payment Capture Validations"). This SP returns the
--               RLS data that tree needs for ONE policy number. It does NOT take any decision itself:
--               status allow / block lists, DCR type (NB vs Renewal), payer-name and currency rules are all
--               applied in payment-sapi (VaPaymentService) so that business can switch them on / off
--               without a database change.
--
--               LOOKUP ORDER  (same order as slide 28, stops at the first hit)
--                 1. Policy Master        MR_LFPPML / MR_LFPPMD / MR_LFPPMG / MR_LFPPMH
--                      found  -> stop. Application files are NOT read.
--                 2. Application Master   MR_LFPAPPL_M / MR_LFPAPPH_M / MR_LFPAPPG_M / MR_LFPAPPD_M
--                      found  -> stop. History is NOT read.
--                 3. Application History  MR_LFPAPPL_H / MR_LFPAPPH_H / MR_LFPAPPG_H / MR_LFPAPPD_H
--                      found  -> RECORD_SOURCE = APPLICATION_HISTORY, otherwise NONE.
--               Beneficiary names (MR_LFPBNFY for a policy, MR_LFPAPPBNFY for an application) are read once,
--               only for the file that matched.
--
--               DATA ACCESS
--               Self-contained: the four L/H/D/G files of each kind are combined with UNION ALL inside this
--               SP (no views, no temp tables, no dynamic SQL). The WHERE PNO = @V_POLICY_NO predicate is
--               pushed by the optimizer into every branch of the union, so each lookup is one index seek
--               per underlying table.
--
--               PERFORMANCE
--               Every lookup returns at most one row, so results are read into scalar variables. No tempdb
--               work, one cached plan, the JSON is built from the variables with no table access. Expected
--               cost is a few milliseconds per call provided each table has an index on PNO (BNPNO / I10PNO).
--
--               INPUT
--                 @IN_POLICY_NO   policy number exactly as stored in RLS, e.g. '303-5835077'
--
--               OUTPUT   one row, one column JSON_OP (same contract as SP_RETRIEVE_POL_DTLS_LIFE_RLS).
--                        On any error the CATCH block returns one row with JSON_OP = NULL.
--                        Exactly one of the three blocks is populated; the other two are null.
--               {
--                 "POLICY_NO":     "303-5835077",
--                 "RECORD_SOURCE": "POLICY_MASTER" | "APPLICATION_MASTER" | "APPLICATION_HISTORY" | "NONE",
--                 "POLICY_MASTER": {
--                     "SRC_FILE":           "LFPPML",        which of the four files the row came from
--                     "PL_STAT_CD":         "1",             PSTU   policy status
--                     "POLICY_EFF_DT":      "20120103",      PEFF   policy effective date, yyyymmdd
--                     "PAID_TO_DT":         "20270103",      PPTD   paid-to date, yyyymmdd
--                     "CURRENCY_CD":        "HKD",           PCCY   policy currency
--                     "INSURED_FIRST_NAME": "...",           PNAMF
--                     "INSURED_LAST_NAME":  "...",           PNAME
--                     "OWNER_FIRST_NAME":   "...",           POWNRF
--                     "OWNER_LAST_NAME":    "...",           POWNER
--                     "BENEFICIARIES": [ { "BENF_FIRST_NAME", "BENF_LAST_NAME", "BENF_TRUSTEE_FLAG" } ]   LFPBNFY, null if none
--                 } | null,
--                 "APPLICATION_MASTER": {
--                     "SRC_FILE", "APP_STAT_CD" (PSTUA), "POLICY_EFF_DT", "CURRENCY_CD",
--                     the four name fields, "BENEFICIARIES" (LFPAPPBNFY)
--                 } | null,
--                 "APPLICATION_HISTORY": {
--                     "SRC_FILE", "APP_STAT_CD", "POLICY_EFF_DT", "CURRENCY_CD", the four name fields
--                     (no beneficiaries - not needed by the slide 28 history branch)
--                 } | null
--               }
---------------------------------------------------------------------------------------------------------------
-- Version     Date            Author            User Story       Description
-- v1.0        20260906        Harinadh          VA-OCBC          Initial version. Replaces SP_GET_PAYINFO_BY_POLICY:
--                                                                - chained lookup (policy -> application -> history)
--                                                                - scalar variables instead of temp tables
--                                                                - business rules moved to payment-sapi
--                                                                - output column renamed to JSON_OP
-- =============================================================================================================
CREATE OR ALTER PROCEDURE [L_HK_CACHE].[SP_RETRIEVE_VA_PAYMENT_POLICY_DTLS_LIFE_RLS]
   @IN_POLICY_NO varchar(max)
AS
   BEGIN
      -- Suppress "n rows affected" messages. JDBC would otherwise receive them as extra results
      -- before the JSON_OP row.
      SET NOCOUNT ON;

      /*-------------------------------------------------------------------------------------------------
        VARIABLES
        The lookups below read straight into these variables (no temp tables).
        Widths are deliberately LARGER than the RLS column widths (PNO 11, PSTU/PSTUA 2, PCCY 3,
        PNAMF/POWNRF 30, PNAME/POWNER 50) and the text ones are nvarchar. Reason: T-SQL does not raise
        an error when a value is assigned into a variable that is too narrow or not unicode - it
        silently truncates or replaces characters with '?'. Wider variables cost nothing.
        Dates are carried as text (yyyymmdd) produced by CONVERT(..., 112), which gives the same result
        whether the column is numeric, char or date. Only the first 8 characters are used on output.
      -------------------------------------------------------------------------------------------------*/
      DECLARE @V_POLICY_NO     varchar(20),          -- trimmed copy of the input, used in every WHERE
              @V_RECORD_SOURCE varchar(20),          -- which file matched: POLICY_MASTER / APPLICATION_MASTER / APPLICATION_HISTORY / NONE

              -- The matched record. Filled by whichever lookup hits first.
              @V_SRC_FILE      varchar(10),          -- LFPPML / LFPPMD / LFPPMG / LFPPMH / LFPAPPL / LFPAPPH / LFPAPPG / LFPAPPD
              @V_STAT_CD       nvarchar(10),         -- PSTU (policy status) or PSTUA (application status)
              @V_PEFF          varchar(20),          -- PEFF policy effective date as yyyymmdd text
              @V_PPTD          varchar(20),          -- PPTD paid-to date as yyyymmdd text (policy master only)
              @V_PCCY          nvarchar(10),         -- PCCY currency
              @V_PNAMF         nvarchar(200),        -- insured first name
              @V_PNAME         nvarchar(200),        -- insured name
              @V_POWNRF        nvarchar(200),        -- owner first name
              @V_POWNER        nvarchar(200),        -- owner name
              @V_BENEFICIARIES nvarchar(max);        -- beneficiary list already rendered as a JSON array, matched file only

      BEGIN TRY

         -- Trim once so every comparison uses the same key. A NULL input becomes '' and simply
         -- matches nothing (RECORD_SOURCE = 'NONE') instead of breaking the WHERE clauses.
         SET @V_POLICY_NO = LTRIM(RTRIM(ISNULL(@IN_POLICY_NO, '')));

         /*-------------------------------------------------------------------------------------------------
           STEP 1 - POLICY MASTER  (MR_LFPPML / MR_LFPPMD / MR_LFPPMG / MR_LFPPMH)
           Slide 28: "PNO in Policy Master?"
           The four files are combined with UNION ALL; SRC_FILE records which one the row came from.
           A policy exists in only one of the four files, so TOP (1) ORDER BY SRC_PRIORITY is just a
           deterministic tie-break, never a real choice.
           If a row is found the application files are NOT read at all.
         -------------------------------------------------------------------------------------------------*/
         SELECT TOP (1)
                @V_SRC_FILE = PM.SRC_FILE,
                @V_STAT_CD  = PM.PSTU,
                @V_PEFF     = CONVERT(varchar(20), PM.PEFF, 112),
                @V_PPTD     = CONVERT(varchar(20), PM.PPTD, 112),
                @V_PCCY     = PM.PCCY,
                @V_PNAMF    = PM.PNAMF,
                @V_PNAME    = PM.PNAME,
                @V_POWNRF   = PM.POWNRF,
                @V_POWNER   = PM.POWNER
         FROM (
                SELECT PNO, PSTU, PEFF, PPTD, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPPML' AS SRC_FILE, 1 AS SRC_PRIORITY
                FROM   [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
                UNION ALL
                SELECT PNO, PSTU, PEFF, PPTD, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPPMD', 2
                FROM   [L_HK_CACHE].[MR_LFPPMD] WITH (NOLOCK)
                UNION ALL
                SELECT PNO, PSTU, PEFF, PPTD, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPPMG', 3
                FROM   [L_HK_CACHE].[MR_LFPPMG] WITH (NOLOCK)
                UNION ALL
                SELECT PNO, PSTU, PEFF, PPTD, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPPMH', 4
                FROM   [L_HK_CACHE].[MR_LFPPMH] WITH (NOLOCK)
              ) PM
         WHERE  PM.PNO = @V_POLICY_NO
         ORDER BY PM.SRC_PRIORITY;

         -- @@ROWCOUNT must be read immediately after the SELECT; any other statement resets it.
         IF @@ROWCOUNT > 0
         BEGIN
            SET @V_RECORD_SOURCE = 'POLICY_MASTER';

            -- Policy beneficiaries (MR_LFPBNFY). Rendered to a JSON array here so the final SELECT
            -- does not touch any table. Rows with an empty name are skipped.
            -- If there are no beneficiaries the variable stays NULL and the JSON shows "BENEFICIARIES": null.
            SET @V_BENEFICIARIES = (
               SELECT RTRIM(BN.BNBNFF) AS BENF_FIRST_NAME,
                      RTRIM(BN.BNBNFY) AS BENF_LAST_NAME,
                      RTRIM(BN.BNBAFL) AS BENF_TRUSTEE_FLAG
               FROM   [L_HK_CACHE].[MR_LFPBNFY] BN WITH (NOLOCK)
               WHERE  BN.BNPNO = @V_POLICY_NO
               AND    NULLIF(LTRIM(RTRIM(BN.BNBNFY)), '') IS NOT NULL
               FOR JSON PATH);
         END
         ELSE
         BEGIN
            /*----------------------------------------------------------------------------------------------
              STEP 2 - APPLICATION MASTER  (MR_LFPAPPL_M / MR_LFPAPPH_M / MR_LFPAPPG_M / MR_LFPAPPD_M)
              Slide 28: "PNO in Application Master?"  - reached only when Step 1 found nothing.
              A policy number can appear more than once in the application files (re-used number);
              the newest application (highest PEFF) is taken, SRC_PRIORITY breaks a tie.
              If a row is found the history files are NOT read.
            ----------------------------------------------------------------------------------------------*/
            SELECT TOP (1)
                   @V_SRC_FILE = AM.SRC_FILE,
                   @V_STAT_CD  = AM.PSTUA,
                   @V_PEFF     = CONVERT(varchar(20), AM.PEFF, 112),
                   @V_PCCY     = AM.PCCY,
                   @V_PNAMF    = AM.PNAMF,
                   @V_PNAME    = AM.PNAME,
                   @V_POWNRF   = AM.POWNRF,
                   @V_POWNER   = AM.POWNER
            FROM (
                   SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPL' AS SRC_FILE, 1 AS SRC_PRIORITY
                   FROM   [L_HK_CACHE].[MR_LFPAPPL_M] WITH (NOLOCK)
                   UNION ALL
                   SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPH', 2
                   FROM   [L_HK_CACHE].[MR_LFPAPPH_M] WITH (NOLOCK)
                   UNION ALL
                   SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPG', 3
                   FROM   [L_HK_CACHE].[MR_LFPAPPG_M] WITH (NOLOCK)
                   UNION ALL
                   SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPD', 4
                   FROM   [L_HK_CACHE].[MR_LFPAPPD_M] WITH (NOLOCK)
                 ) AM
            WHERE  AM.PNO = @V_POLICY_NO
            ORDER BY AM.PEFF DESC, AM.SRC_PRIORITY;

            IF @@ROWCOUNT > 0
            BEGIN
               SET @V_RECORD_SOURCE = 'APPLICATION_MASTER';

               -- Application beneficiaries (MR_LFPAPPBNFY). Same handling as the policy beneficiaries.
               SET @V_BENEFICIARIES = (
                  SELECT RTRIM(BN.I10NAMEF) AS BENF_FIRST_NAME,
                         RTRIM(BN.I10NAME)  AS BENF_LAST_NAME,
                         RTRIM(BN.I10BAFL)  AS BENF_TRUSTEE_FLAG
                  FROM   [L_HK_CACHE].[MR_LFPAPPBNFY] BN WITH (NOLOCK)
                  WHERE  BN.I10PNO = @V_POLICY_NO
                  AND    NULLIF(LTRIM(RTRIM(BN.I10NAME)), '') IS NOT NULL
                  FOR JSON PATH);
            END
            ELSE
            BEGIN
               /*-------------------------------------------------------------------------------------------
                 STEP 3 - APPLICATION HISTORY  (MR_LFPAPPL_H / MR_LFPAPPH_H / MR_LFPAPPG_H / MR_LFPAPPD_H)
                 Slide 28: "PNO in Application History?"  - reached only when Steps 1 and 2 found nothing.
                 Newest history row wins. No beneficiaries are read for this branch (slide 28 goes
                 straight from this question to "Continue with Exception, DCR Type = 1").
               -------------------------------------------------------------------------------------------*/
               SELECT TOP (1)
                      @V_SRC_FILE = AH.SRC_FILE,
                      @V_STAT_CD  = AH.PSTUA,
                      @V_PEFF     = CONVERT(varchar(20), AH.PEFF, 112),
                      @V_PCCY     = AH.PCCY,
                      @V_PNAMF    = AH.PNAMF,
                      @V_PNAME    = AH.PNAME,
                      @V_POWNRF   = AH.POWNRF,
                      @V_POWNER   = AH.POWNER
               FROM (
                      SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPL' AS SRC_FILE, 1 AS SRC_PRIORITY
                      FROM   [L_HK_CACHE].[MR_LFPAPPL_H] WITH (NOLOCK)
                      UNION ALL
                      SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPH', 2
                      FROM   [L_HK_CACHE].[MR_LFPAPPH_H] WITH (NOLOCK)
                      UNION ALL
                      SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPG', 3
                      FROM   [L_HK_CACHE].[MR_LFPAPPG_H] WITH (NOLOCK)
                      UNION ALL
                      SELECT PNO, PSTUA, PEFF, PCCY, PNAMF, PNAME, POWNRF, POWNER, 'LFPAPPD', 4
                      FROM   [L_HK_CACHE].[MR_LFPAPPD_H] WITH (NOLOCK)
                    ) AH
               WHERE  AH.PNO = @V_POLICY_NO
               ORDER BY AH.PEFF DESC, AH.SRC_PRIORITY;

               -- Found in history -> APPLICATION_HISTORY. Found nowhere -> NONE.
               SET @V_RECORD_SOURCE = CASE WHEN @@ROWCOUNT > 0 THEN 'APPLICATION_HISTORY' ELSE 'NONE' END;
            END
         END

         /*-------------------------------------------------------------------------------------------------
           STEP 4 - BUILD JSON_OP
           Everything below reads the variables only; no table is touched.
           Each block is wrapped in CASE WHEN @V_RECORD_SOURCE = '...' so that only the block of the
           file that matched is rendered. The other two come out as null because of INCLUDE_NULL_VALUES.
           JSON_QUERY(...) tells FOR JSON that the value is already JSON, so it is nested as an object /
           array instead of being escaped into a string.
           RTRIM removes the trailing blanks of RLS CHAR columns.
           LEFT(..., 8) keeps yyyymmdd from the CONVERT output; NULLIF(..., '0') turns an RLS "no date"
           value of 0 into null.
         -------------------------------------------------------------------------------------------------*/
         SELECT (
            SELECT
               @V_POLICY_NO                                                              AS POLICY_NO,
               @V_RECORD_SOURCE                                                          AS RECORD_SOURCE,

               /*---------------------------------- Policy Master ----------------------------------*/
               CASE WHEN @V_RECORD_SOURCE = 'POLICY_MASTER' THEN
                  JSON_QUERY((
                     SELECT
                        @V_SRC_FILE                                                       AS SRC_FILE,
                        RTRIM(@V_STAT_CD)                                                 AS PL_STAT_CD,
                        NULLIF(LEFT(LTRIM(@V_PEFF), 8), '0')                              AS POLICY_EFF_DT,
                        NULLIF(LEFT(LTRIM(@V_PPTD), 8), '0')                              AS PAID_TO_DT,
                        RTRIM(@V_PCCY)                                                    AS CURRENCY_CD,
                        RTRIM(@V_PNAMF)                                                   AS INSURED_FIRST_NAME,
                        RTRIM(@V_PNAME)                                                   AS INSURED_LAST_NAME,
                        RTRIM(@V_POWNRF)                                                  AS OWNER_FIRST_NAME,
                        RTRIM(@V_POWNER)                                                  AS OWNER_LAST_NAME,
                        JSON_QUERY(@V_BENEFICIARIES)                                      AS BENEFICIARIES
                     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
                  ))
               END                                                                        AS POLICY_MASTER,

               /*-------------------------------- Application Master --------------------------------*/
               CASE WHEN @V_RECORD_SOURCE = 'APPLICATION_MASTER' THEN
                  JSON_QUERY((
                     SELECT
                        @V_SRC_FILE                                                       AS SRC_FILE,
                        RTRIM(@V_STAT_CD)                                                 AS APP_STAT_CD,
                        NULLIF(LEFT(LTRIM(@V_PEFF), 8), '0')                              AS POLICY_EFF_DT,
                        RTRIM(@V_PCCY)                                                    AS CURRENCY_CD,
                        RTRIM(@V_PNAMF)                                                   AS INSURED_FIRST_NAME,
                        RTRIM(@V_PNAME)                                                   AS INSURED_LAST_NAME,
                        RTRIM(@V_POWNRF)                                                  AS OWNER_FIRST_NAME,
                        RTRIM(@V_POWNER)                                                  AS OWNER_LAST_NAME,
                        JSON_QUERY(@V_BENEFICIARIES)                                      AS BENEFICIARIES
                     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
                  ))
               END                                                                        AS APPLICATION_MASTER,

               /*-------------------------------- Application History -------------------------------*/
               CASE WHEN @V_RECORD_SOURCE = 'APPLICATION_HISTORY' THEN
                  JSON_QUERY((
                     SELECT
                        @V_SRC_FILE                                                       AS SRC_FILE,
                        RTRIM(@V_STAT_CD)                                                 AS APP_STAT_CD,
                        NULLIF(LEFT(LTRIM(@V_PEFF), 8), '0')                              AS POLICY_EFF_DT,
                        RTRIM(@V_PCCY)                                                    AS CURRENCY_CD,
                        RTRIM(@V_PNAMF)                                                   AS INSURED_FIRST_NAME,
                        RTRIM(@V_PNAME)                                                   AS INSURED_LAST_NAME,
                        RTRIM(@V_POWNRF)                                                  AS OWNER_FIRST_NAME,
                        RTRIM(@V_POWNER)                                                  AS OWNER_LAST_NAME
                     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
                  ))
               END                                                                        AS APPLICATION_HISTORY

            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
         ) AS JSON_OP;

      END TRY

      /*-------------------------------------------------------------------------------------------------
        ERROR HANDLING
        Same contract as SP_RETRIEVE_POL_DTLS_LIFE_RLS: the caller always gets one row, and JSON_OP is
        NULL when something went wrong. payment-sapi treats a NULL as "policy details unavailable" and
        retries the payment instead of guessing.
        The PRINT keeps the SQL error number, line and message in the server output for support.
      -------------------------------------------------------------------------------------------------*/
      BEGIN CATCH
         PRINT 'SP_RETRIEVE_VA_PAYMENT_POLICY_DTLS_LIFE_RLS error ' + CAST(ERROR_NUMBER() AS VARCHAR(10))
               + ' at line ' + CAST(ERROR_LINE() AS VARCHAR(10)) + ': ' + ISNULL(ERROR_MESSAGE(), '');

         SELECT NULL AS JSON_OP;
      END CATCH

   END
GO
