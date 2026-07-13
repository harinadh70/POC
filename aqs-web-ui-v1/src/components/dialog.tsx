import { useId, useCallback } from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    type DialogProps as MuiDialogProps,
} from '@mui/material';

// icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Theme } from '@/constants/theme';

// ---------------------------------------

export type MessageType = 'warning' | 'error' | 'question' | 'information';
export type DialogType = 'ok' | 'yesno' | 'yesnocancel';
export type DialogAction = 'ok' | 'yes' | 'no' | 'cancel';

export type DialogCloseReason =
    | 'backdropClick'
    | 'escapeKeyDown'
    | 'action:ok'
    | 'action:yes'
    | 'action:no'
    | 'action:cancel'
    | 'closeButton';

export interface DialogProps {
    open: boolean;
    message: React.ReactNode;
    messageType?: MessageType;
    dialogType?: DialogType;

    /** Events for respective actions */
    onOk?: () => void;
    onYes?: () => void;
    onNo?: () => void;
    onCancel?: () => void;

    /** Called whenever the dialog should close */
    onClose: (reason?: DialogCloseReason) => void;

    /** UI/Behavior customizations */
    title?: string;
    okText?: string;
    yesText?: string;
    noText?: string;
    cancelText?: string;
    autoFocusButton?: DialogAction; // which button should get autofocus
    closeOnAction?: boolean; // default: true
    hideCloseIcon?: boolean; // default: false
    disableBackdropClose?: boolean; // default: false
    disableEscapeKeyDown?: boolean; // default: false

    /** Pass-through MUI Dialog props (except open/onClose) */
    dialogProps?: Omit<MuiDialogProps, 'open' | 'onClose'>;
}

const iconForType = (type: MessageType) => {
    switch (type) {
        case 'warning':
            return {
                Icon: WarningAmberRoundedIcon,
                color: 'warning' as const,
                defaultTitle: 'Warning',
            };
        case 'error':
            return {
                Icon: ErrorOutlineRoundedIcon,
                color: 'error' as const,
                defaultTitle: 'Error',
            };
        case 'question':
            return {
                Icon: HelpOutlineRoundedIcon,
                color: 'info' as const,
                defaultTitle: 'Confirm',
            };
        case 'information':
        default:
            return {
                Icon: InfoOutlinedIcon,
                color: 'info' as const,
                defaultTitle: 'Informational',
            };
    }
};

const Dialog: React.FC<DialogProps> = ({
    open,
    message,
    messageType = 'information',
    dialogType = 'ok',

    onOk,
    onYes,
    onNo,
    onCancel,
    onClose,

    title,
    okText = 'OK',
    yesText = 'Yes',
    noText = 'No',
    cancelText = 'Cancel',
    autoFocusButton,
    closeOnAction = true,
    hideCloseIcon = false,
    disableBackdropClose = false,
    disableEscapeKeyDown = false,

    dialogProps,
}) => {
    const { Icon, defaultTitle } = iconForType(messageType);

    const labelId = useId();
    const descId = useId();

    const fireAction = useCallback(
        (action: DialogAction) => {
            switch (action) {
                case 'ok':
                    onOk?.();
                    break;
                case 'yes':
                    onYes?.();
                    break;
                case 'no':
                    onNo?.();
                    break;
                case 'cancel':
                    onCancel?.();
                    break;
            }

            if (closeOnAction) {
                onClose?.(`action:${action}`);
            }
        },
        [onOk, onYes, onNo, onCancel, closeOnAction, onClose],
    );

    const defaultAction: DialogAction =
        autoFocusButton ?? (dialogType === 'ok' ? 'ok' : dialogType === 'yesno' ? 'yes' : 'yes'); // for yesn⟪?⟫
// TODO ⟪missing lines 153-169 — not captured in photos⟫
    const buttons: {
// TODO ⟪missing lines 171-173 — not captured in photos⟫
    }[] =
        dialogType === 'ok'
            ? [{ key: 'ok', label: okText, color: 'primary' }]
            : dialogType === 'yesno'
                ? [
                      { key: 'yes', label: yesText, color: 'primary' },
                      { key: 'no', label: noText, color: 'inherit' },
                  ]
                : [
                      { key: 'yes', label: yesText, color: 'primary' },
                      { key: 'no', label: noText, color: 'inherit' },
                      { key: 'cancel', label: cancelText, color: 'inherit' },
                  ];

    return (
        <MuiDialog
            open={open}
            onClose={handleBackdropClose}
            aria-labelledby={labelId}
            aria-describedby={descId}
            onKeyDown={handleKeyDown}
            {...dialogProps}
            className="dialogWrap"
        >
            <DialogTitle id={labelId} sx={{ pr: hideCloseIcon ? 3 : 6 }}>
                <div className="flex items-center gap-3">
                    <Icon
                        sx={{
                            fontSize: '26px',
                            color: Theme.colors.BRAND,
                            backgroundColor: Theme.colors.SUBHEADER_BG,
                        }}
                    />
                    <Typography
                        component="span"
                        variant="h6"
                        sx={{
                            fontSize: '16px',
                            fontWeight: '700',
                        }}
                    >
                        {title ?? defaultTitle}
                    </Typography>
                </div>
                {!hideCloseIcon && (
                    <IconButton
                        aria-label="Close dialog"
                        onClick={() => onClose?.('closeButton')}
                        sx={{ position: 'absolute', right: 8, top: 8, color: Theme.colors.BRAND }}
                        size="small"
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                )}
            </DialogTitle>

            <DialogContent id={descId}>
                {typeof message === 'string' ? (
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {message}
                    </Typography>
