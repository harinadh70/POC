-- =============================================================================================================
-- DRY RUN of SP_RETRIEVE_VA_PAYMENT_POLICY_DTLS_LIFE_RLS - runs the SP's body as a plain batch.
-- Nothing is created or written: no CREATE PROCEDURE, no temp tables, no INSERT. Read-only against Datavault.
--
-- HOW TO USE
--   1. Set @SCENARIO below to the slide 28 branch you want to test. The batch then picks a real policy
--      number for that scenario FROM THE DATABASE (no hard-coded numbers anywhere in this file).
--   2. Optionally set @IN_POLICY_NO yourself instead; a non-blank value overrides the scenario pick.
--   3. Run the whole batch. Result 1 = the policy number chosen and why; Result 2 = JSON_OP exactly
--      as the SP would return it.
--
-- The section between the two "SP BODY" markers is the SP body copied verbatim from
-- 1_CREATE_SP_RETRIEVE_VA_PAYMENT_POLICY_DTLS_LIFE_RLS.sql. Regenerate this file if that one changes.
-- =============================================================================================================
DECLARE @SCENARIO     varchar(20) = 'RENEWAL';   -- RENEWAL | REVERSAL | POLICY_STATUS_INVALID | POLICY_NON_HKD | POLICY_HNW
                                                 -- APP_MASTER_VALID | APP_MASTER_INVALID | HISTORY_ONLY | NONE
DECLARE @IN_POLICY_NO varchar(max) = NULL;       -- leave NULL to let the scenario pick a policy from the database

/*-------------------------------------------------------------------------------------------------
  SCENARIO PICKER - one real policy number per branch, straight from the tables.
-------------------------------------------------------------------------------------------------*/
IF NULLIF(LTRIM(RTRIM(@IN_POLICY_NO)), '') IS NULL
BEGIN
   IF @SCENARIO = 'RENEWAL'
      SELECT TOP (1) @IN_POLICY_NO = PNO FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
      WHERE RTRIM(PSTU) IN ('1','2','5','6','B','F') AND PEFF <> PPTD AND PPTD > 0 ORDER BY PPTD DESC;

   ELSE IF @SCENARIO = 'REVERSAL'
      SELECT TOP (1) @IN_POLICY_NO = PNO FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
      WHERE RTRIM(PSTU) IN ('1','2','5','6','B','F') AND PEFF = PPTD AND PEFF > 0 ORDER BY PEFF DESC;

   ELSE IF @SCENARIO = 'POLICY_STATUS_INVALID'
      SELECT TOP (1) @IN_POLICY_NO = PNO FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
      WHERE RTRIM(PSTU) NOT IN ('1','2','5','6','B','F') ORDER BY PEFF DESC;

   ELSE IF @SCENARIO = 'POLICY_NON_HKD'
      SELECT TOP (1) @IN_POLICY_NO = PNO FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
      WHERE RTRIM(PSTU) IN ('1','2','5','6','B','F') AND RTRIM(PCCY) <> 'HKD' ORDER BY PEFF DESC;

   ELSE IF @SCENARIO = 'POLICY_HNW'
      SELECT TOP (1) @IN_POLICY_NO = PNO FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK)
      WHERE PNO LIKE '888-%' AND RTRIM(PSTU) IN ('1','2','5','6','B','F') ORDER BY PEFF DESC;

   ELSE IF @SCENARIO = 'APP_MASTER_VALID'
      SELECT TOP (1) @IN_POLICY_NO = A.PNO FROM [L_HK_CACHE].[MR_LFPAPPL_M] A WITH (NOLOCK)
      WHERE RTRIM(A.PSTUA) NOT IN ('03','09','11','X','Y')
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMD] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMG] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMH] WITH (NOLOCK) WHERE PNO = A.PNO)
      ORDER BY A.PEFF DESC;

   ELSE IF @SCENARIO = 'APP_MASTER_INVALID'
      SELECT TOP (1) @IN_POLICY_NO = A.PNO FROM [L_HK_CACHE].[MR_LFPAPPL_M] A WITH (NOLOCK)
      WHERE RTRIM(A.PSTUA) IN ('03','09','11','X','Y')
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPML] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMD] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMG] WITH (NOLOCK) WHERE PNO = A.PNO)
      AND NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMH] WITH (NOLOCK) WHERE PNO = A.PNO)
      ORDER BY A.PEFF DESC;

   ELSE IF @SCENARIO = 'HISTORY_ONLY'
      SELECT TOP (1) @IN_POLICY_NO = H.PNO FROM [L_HK_CACHE].[MR_LFPAPPL_H] H WITH (NOLOCK)
      WHERE NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPML]    WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMD]    WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMG]    WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMH]    WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPL_M] WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPH_M] WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPG_M] WITH (NOLOCK) WHERE PNO = H.PNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPD_M] WITH (NOLOCK) WHERE PNO = H.PNO)
      ORDER BY H.PEFF DESC;

   ELSE IF @SCENARIO = 'NONE'
      -- registered in LFPREG but present in no policy / application / history file
      SELECT TOP (1) @IN_POLICY_NO = R.REPNO FROM [L_HK_CACHE].[MR_LFPREG] R WITH (NOLOCK)
      WHERE NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPML]    WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMD]    WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMG]    WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPPMH]    WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPL_M] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPH_M] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPG_M] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPD_M] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPL_H] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPH_H] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPG_H] WITH (NOLOCK) WHERE PNO = R.REPNO)
      AND   NOT EXISTS (SELECT 1 FROM [L_HK_CACHE].[MR_LFPAPPD_H] WITH (NOLOCK) WHERE PNO = R.REPNO);
END

-- Result 1: what is being tested
SELECT @SCENARIO AS SCENARIO, @IN_POLICY_NO AS POLICY_NO_UNDER_TEST,
       CASE WHEN @IN_POLICY_NO IS NULL THEN 'no policy found for this scenario in the database' ELSE 'ok' END AS PICKER_STATUS;

/*=================================================================================================
  SP BODY - START  (verbatim copy of SP_RETRIEVE_VA_PAYMENT_POLICY_DTLS_LIFE_RLS)
=================================================================================================*/
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


/*=================================================================================================
  SP BODY - END
=================================================================================================*/
