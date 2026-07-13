import { getItem } from '@utils/session-storage';
import { Suspense, useCallback, useMemo } from 'react';
import { Alert, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import { useLoaderData, useNavigation } from 'react-router';

import { FormRenderer } from '@components/form-renderer';
import { useBrowserCommands } from '@hooks/use-browser-commands';
import { useFormCommit } from '@hooks/use-form-commit';
import { useFormMethods } from '@providers/form-provider';

import type { PageBuildResponse } from '@services/page-build';
import type { BrowserCommand, CommitEventType, FormValues, NormalizedField } from '@/types';
import type { SessionInfo } from '@features/auth/services/auth';
import type { PageBuildButton } from '@utils/transform-pagebuild-response';

export interface DynamicFormLoaderData {
  pageBuildData?: PageBuildResponse;
  normalizedFields: NormalizedField[];
  buttons: PageBuildButton[];
  browserCommands: BrowserCommand[];
  sessionInfo: SessionInfo;
  isPopup: boolean;
  xmlFilePath?: string;
  error?: string;
}

const createInitialValues = (fields: NormalizedField[]): FormValues => {
  return fields.reduce<FormValues>((acc, field) => {
    acc[field.matchcode] =
      field.defaultValue !== undefined
        ? field.defaultValue
        : field.controlType === 'checkbox'
          ? false
          : '';
    return acc;
  }, {});
};

const FormPageFallback = () => {
  return (
    <Box className="flex min-h-[30vh] items-center justify-center" aria-live="polite">
      <CircularProgress size={30} />
    </Box>
  );
};

/**
 * Generic PageBuild form renderer for all dynamic AQS entry/edit pages.
 * Renders normalized fields, executes server browser commands, and commits field changes via XMLServerCall.
 */
export default function DynamicFormPage() {
  const loaderData = useLoaderData() as DynamicFormLoaderData;
  const navigation = useNavigation();
  const formMethods = useFormMethods();
  // useBrowserCommands has built-in deduplication to prevent infinite loops
  const { executeCommands, isExecuting } = useBrowserCommands(loaderData.browserCommands);

  const initialValues = useMemo(
    () => createInitialValues(loaderData.normalizedFields),
    [loaderData.normalizedFields],
  );

  // For user input, we track changes via handleValuesChange callback
  // For browser commands, we get latest RHF values directly via formMethods.getValues()
  const handleValuesChange = useCallback((_nextValues: FormValues) => {
    // No-op: RHF manages state internally
    // We'll get values via formMethods.getValues() when needed
  }, []);

  const {
    commitField,
    isCommitting,
    committingField,
    error: commitError,
    validationErrors,
  } = useFormCommit({
    pageBuildData: loaderData.pageBuildData,
    sessionInfo: loaderData.sessionInfo,
    formMethods,
    xmlFileName: loaderData.xmlFilePath,
    onCommands: executeCommands,
  });
  const handleCommitField = useCallback(
    async (matchcode: string, value: string | boolean, eventType: CommitEventType) => {
      console.log('COMMITTING_FIELD---000', { matchcode, value, eventType });
      await commitField(matchcode, value, eventType);
    },
    [commitField]
  );
  if (loaderData.error) {
    return (
      <div className="p-4 md:p-6" aria-live="assertive">
        <Alert severity="error">{loaderData.error}</Alert>
      </div>
    );
  }
  if (loaderData.normalizedFields.length === 0) {
    return (
      <div className="p-4 md:p-6" aria-live="polite">
        <Alert severity="warning">No form fields were provided for this page.</Alert>
      </div>
    );
  }

  const isRouteLoading = navigation.state === 'loading';
  const showBusyBar = isRouteLoading || isExecuting || isCommitting;
  const transactionType = getItem<Record<string, unknown>>(
    'aqs:global-variables',
    {},
  )?.mstrTransactionType;

  return (
    <Suspense fallback={<FormPageFallback />}>
      <div className="grid grid-cols-4 gap-x-2 items-start w-full h-full">
        <div className="col-span-1 p-4! relative h-full bg-[#F9F7F0] min-h-216">
          <h1 className="text-[16px] font-semibold text-left text-[#00205B]">
            Policy Structure
          </h1>
          <h3 className="text-[12px] font-normal text-left text-[#00205B] mt-1">
            Policy
          </h3>
        </div>
        <div className="col-span-3">
          <div className="px-16! p-4!" aria-busy={showBusyBar}>
            <h1 className="text-[28px] font-semibold text-left text-[#00205B]">
              Policy Start
            </h1>
            {showBusyBar && <LinearProgress sx={{ mb: 2 }} />}
            {commitError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {commitError}
              </Alert>
            ) : null}
            {loaderData.isPopup ? (
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  color: '#00205B',
                  fontSize: '14px',
                  backgroundColor: '#E9F1FF',
                  padding: '6px',
                  fontWeight: '600',
                  display: 'inline-block',
                }}
              >
                {(transactionType as string) || ''}
              </Typography>
            ) : null}
            <div className="grid gap-5">
              <FormRenderer
                fields={loaderData.normalizedFields}
                buttons={loaderData.buttons}
                initialValues={initialValues}
                onValuesChange={handleValuesChange}
                onCommitField={handleCommitField}
                disabled={isCommitting}
                fieldsPerRow={2}
                responsive
                useReactHookForm={true}
                validationErrors={validationErrors}
                committingField={committingField}
                className="startForm"
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
