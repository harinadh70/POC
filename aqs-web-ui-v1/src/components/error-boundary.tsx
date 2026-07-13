import { useRouteError, isRouteErrorResponse } from 'react-router';
import { Box, Typography, Button, Paper, Alert, AlertTitle, Collapse } from '@mui/material';
import { useState, useEffect } from 'react';

// utils
import { createFeatureLogger } from '@/utils/logger-builder';
import { removeItem } from '@utils/local-storage';

// Create logger
const logger = createFeatureLogger('error', 'ErrorBoundary');

// ---------------------------------------

export function GlobalErrorBoundary() {
    const error = useRouteError();
    const [showDetails, setShowDetails] = useState(false);
    const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
    const isDev = import.meta.env.DEV;

    // Logic to determine the error message
    let errorMessage = 'An unexpected error occurred.';
    let errorStatus = 'Error';
    let errorStack: string | undefined;
    let errorContext: Record<string, unknown> | undefined;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status.toString();

        // Handle 401 specially
        if (error.status === 401) {
            errorMessage = 'Your session has expired. Redirecting to login...';
            setShouldAutoRedirect(true);

            // Clear session using utility
            const removed = removeItem('sessionInformation');
            if (!removed) {
                console.error('Failed to clear session');
            }
        }

        if (error.status === 404) errorMessage = 'Page not found.';
        if (error.status === 405) errorMessage = 'Method not allowed. Did you forget an action?';
        if (error.data?.message) errorMessage = error.data.message;
        errorContext = error.data;
    } else if (error instanceof Error) {
        errorMessage = error.message;
        errorStack = error.stack;

        // Check for ApiError with 401
        if ('statusCode' in error && (error as any).statusCode === 401) {
            errorStatus = '401';
            errorMessage = 'Your session has expired. Redirecting to login...';
            setShouldAutoRedirect(true);

            const removed = removeItem('sessionInformation');
            if (!removed) {
                console.error('Failed to clear session');
            }
        } else if ('statusCode' in error) {
            // Check if it's our custom ApiError
            errorStatus = String((error as any).statusCode || 'Error');
            errorContext = (error as any).context;
        }
    }

    // Log error with full context
    logger.error('Route error caught by boundary', error as Error, {
        status: errorStatus,
        message: errorMessage,
        context: errorContext,
    });

    // Auto-redirect effect for 401 errors
    useEffect(() => {
        if (shouldAutoRedirect) {
            logger.info('Auto-redirecting to login after 401 error');
            const timer = setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [shouldAutoRedirect]);

    const handleRetry = () => {
        logger.info('User retrying after error');
        window.location.reload();
    };

    const handleGoHome = () => {
        logger.info('User navigating home after error');
        window.location.href = '/';
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
            <Paper elevation={3} sx={{ p: 5, maxWidth: 700, width: '100%' }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h2" color="error" gutterBottom>
                        {errorStatus}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        {errorMessage}
                    </Typography>
                </Box>

                {/* Error context in dev mode */}
                {isDev && errorContext && (
                    <Box mb={3}>
                        <Alert
                            severity="warning"
                            onClick={() => setShowDetails(!showDetails)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <AlertTitle>Developer Info (Click to expand)</AlertTitle>
                            <Collapse in={showDetails}>
                                <Box
                                    component="pre"
                                    sx={{
                                        mt: 2,
                                        p: 2,
                                        bgcolor: 'grey.100',
                                        borderRadius: 1,
                                        overflow: 'auto',
                                        maxHeight: 200,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {JSON.stringify(errorContext, null, 2)}
                                </Box>
                            {errorStack && (
                                <Box
                                    component="pre"
                                    sx={{
                                        mt: 2,
                                        p: 2,
                                        bgcolor: 'grey.100',
                                        borderRadius: 1,
                                        overflow: 'auto',
                                        maxHeight: 200,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {errorStack}
                                </Box>
                            )}
                            </Collapse>
                        </Alert>
                    </Box>
                )}

                {/* Action buttons */}
                <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
                    <Button variant="contained" onClick={handleRetry} color="primary">
                        Retry
                    </Button>
                    <Button variant="outlined" onClick={handleGoHome}>
                        Back to Home
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
