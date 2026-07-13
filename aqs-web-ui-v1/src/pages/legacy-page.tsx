import { useLoaderData } from 'react-router';
import { Box, Typography, Alert } from '@mui/material';

import { FormRenderer } from '@components/form-renderer';
import { useBrowserCommands } from '@/hooks/use-browser-commands';
import { createFeatureLogger } from '@utils/logger-builder';

import type { CommitEventType, BrowserCommand } from '@/types';
import type { NormalizedField } from '@utils/normalize-service-config';

// Create logger for legacy page
const logger = createFeatureLogger('legacy', 'LegacyPage');

type LoaderData = {
  browserCommands: BrowserCommand[];
  fileName?: string;
  reactRoute?: string;
  xmlFileName?: string;
  xmlDetail?: string;
  frame?: string;
  normalizedFields: NormalizedField[];
  pageBuildData?: unknown;
  error?: string;
};

// TODO: Implement commit engine for legacy pages
// For now, stub the commit handler
const handleCommitField = (matchcode: string, value: string | boolean, eventType: CommitEventType) => {
  logger.info('Field commit (stub)', { matchcode, value, eventType });
  // TODO: Integrate with legacy commit engine
};

export default function LegacyPage() {
  const loaderData = useLoaderData() as LoaderData;
  const {
    browserCommands,
    fileName,
    normalizedFields,
    error,
  } = loaderData;

  // Apply browser commands from server
  useBrowserCommands(browserCommands);

  logger.info('LegacyPage rendering', {
    fileName,
    fieldCount: normalizedFields.length,
    commandCount: browserCommands.length,
    hasError: !!error,
  });

  return (
    <main className="bg-white min-h-[calc(100vh-122px)] p-4">

    {/* Debug info in development */}
    {import.meta.env.DEV && (
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          Legacy Page: {fileName} | Fields: {normalizedFields.length},
          Commands: {browserCommands.length}
        </Typography>
      </Box>
    )}

    {/* Error display */}
    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}

    {/* Form content */}
    {normalizedFields.length > 0 ? (
      <FormRenderer
        fields={normalizedFields}
        onCommitField={handleCommitField}
        disabled={false} // Legacy pages may not use react-hook-form
        useReactHookForm={false}
      />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography>No form content available for this page.</Typography>
      </Box>
    )}
  </main>
  );
}
}
