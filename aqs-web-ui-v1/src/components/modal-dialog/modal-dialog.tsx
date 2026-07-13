import { useEffect, useRef } from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    CircularProgress,
    Alert,
    Box,
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { FormRenderer } from '@components/form-renderer';
import { useFormMethods } from '@providers/form-provider';
import { createFeatureLogger } from '@utils/logger-builder';
import type { CommitEventType } from '@/types';
import type { BrowserCommand } from '@utils/apply-server-commands';

import { useModalData } from '@components/modal-dialog/use-modal-data';
import { useModalState } from '@components/modal-dialog/use-modal-state';
import { useModalActions } from '@components/modal-dialog/use-modal-actions';
import { Theme } from '@/constants/theme';

const logger = createFeatureLogger('modal', 'ModalDialog');

export interface ModalDialogProps {
    open: boolean;
    url: string;
    width?: string;
    height?: string;
    xmlDetail?: unknown;
    xmlFileName?: string;
    browserCommands?: BrowserCommand[];
    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
    onBrowserCommands?: (commands: BrowserCommand[]) => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
    open,
    url,
    // width = '800',
    // height = '600', // Size is now controlled via CSS in ModalDialog for better responsiveness
    xmlDetail,
    xmlFileName,
    browserCommands: browserCommandsFromProps,
    onClose,
    onBrowserCommands,
}) => {
    const formMethods = useFormMethods();
    const { reset } = formMethods;
    const { state, dispatch } = useModalState();
    const processedData = useModalData(xmlDetail);
    const wasOpenRef = useRef(false);

    const { handleClose, handleCommitField, handleButtonClick, isButtonActionAllowed } =
        useModalActions({
            open,
            xmlDetail,
            xmlFileName,
            state,
            dispatch,
            formMethods,
            onClose,
            onBrowserCommands,
        });

    useEffect(() => {
        if (!open) {
            wasOpenRef.current = false;
            return;
        }

        if (wasOpenRef.current) {
            return;
        }

        wasOpenRef.current = true;
        dispatch({ type: 'LOADING' });

        if (processedData.error) {
            dispatch({ type: 'ERROR', error: processedData.error });
            return;
        }

        logger.info('Processing modal data from props', {
            hasXmlDetail: !!xmlDetail,
            xmlFileName,
            commandCount: browserCommandsFromProps?.length || 0,
            url,
            fieldCount: processedData.fields.length,
        });

        reset(processedData.defaultValues);

        dispatch({
            type: 'SUCCESS',
            payload: {
                fields: processedData.fields,
                buttons: processedData.buttons,
                metadata: processedData.metadata,
                fieldOrder: processedData.fieldOrder,
                utpOrder: processedData.utpOrder,
                sessionXml: processedData.sessionXml,
                browserCommands: browserCommandsFromProps || [],
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const hasFields = state.fields.length > 0;

    return (
        <MuiDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#0A2C6E',
                    padding: '5px 20px',
                    fontWeight: 700,
                    fontSize: '1rem',
                }}
            >

                {state.metadata.title || 'Modal'}

                <IconButton onClick={handleClose} size="small" aria-label="Close modal">
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>

            <DialogActions sx={{ bgcolor: Theme.colors.popupBG, padding: '10px 20px' }}>
                {state.buttons.length > 0 ? (
                    state.buttons
                        .filter((button) => button.visible)
                        .map((button) => {
                            const upper = button.matchcode.toUpperCase();
                            const isPrimary =
                                upper === 'OK' || upper === 'SUBMIT' || upper === 'NEXT';
                            const isActionPermitted = isButtonActionAllowed(upper);

                            return (
                                <Button
                                    key={button.matchcode}
                                    variant={isPrimary ? 'primary' : 'secondary'}
                                    className="px-7! py-1!"
                                    onClick={() => handleButtonClick(button)}
                                    // Keep guarded actions visible but disabled when permission is denied.
                                    disabled={
                                        state.submitting || button.disabled || !isActionPermitted
                                    }
                                >
                                    {button.text || button.matchcode}
                                </Button>
                            );
                        })
                ) : (
                    <Button
                        onClick={handleClose}
                        variant="primary"
                        className="px-7! py-1!"
                        disabled={state.submitting}
                    >
                        Cancel
                    </Button>
                )}
            </DialogActions>

            <DialogContent dividers className="min-h-50 dialogWrapper">
                {!!(state.metadata.pathLabel || state.metadata.pageLabel) && (
                    <Box sx={{ mb: 2 }} display="flex" alignItems="center" gap={4}>
                        {state.metadata.pathLabel ? (
                            <Typography variant="body2" color="text.secondary">
                                {state.metadata.pathLabel}
                            </Typography>
                        ) : null}
                        {state.metadata.pageLabel ? (
                            <Typography variant="body2" color="text.secondary">
                                {state.metadata.pageLabel}
                            </Typography>
                        ) : null}
                    </Box>
                )}

                {state.loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                        <CircularProgress />
                    </Box>
                )}

                {state.error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {state.error}
                    </Alert>
                )}

                {!state.loading && !state.error && hasFields && (
                    <FormRenderer
                        className="dialogForm"
                        fields={state.fields}
                        onCommitField={
                            handleCommitField as (
                                matchcode: string,
                                value: string | boolean,
                                eventType: CommitEventType,
                            ) => void
                        }
                        disabled={state.submitting}
                        useReactHookForm
                    />
                )}

                {!state.loading && !state.error && !hasFields && (
                    <Typography>No content available.</Typography>
                )}
            </DialogContent>
        </MuiDialog>
    );
};

export { ModalDialog };
