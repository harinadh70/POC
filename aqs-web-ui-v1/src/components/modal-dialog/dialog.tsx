const Dialog: React.FC<DialogProps> = ({
    // TODO ⟪missing lines 98-126 — not captured in photos⟫
    const fireAction = useCallback(
        (action: DialogAction) => {
            // TODO ⟪missing lines 129-137 — not captured in photos⟫
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

    const handleKeyDown: React.KeyboardEventHandler = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            fireAction(defaultAction);
        }
        if (e.key === 'Escape' && !disableEscapeKeyDown) {
            onClose?.('escapeKeyDown');
        }
    };

    const handleBackdropClose: MuiDialogProps['onClose'] = (_e, reason) => {
        if (reason === 'backdropClick' && disableBackdropClose) return;
        if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
        onClose?.(reason as DialogCloseReason);
    };

    const buttons: {
        key: DialogAction;
        label: string;
        color?: 'primary' | 'inherit' | 'error' | 'warning';
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
            ⟪?⟫
            // TODO ⟪missing lines 193-218 — not captured in photos⟫
                        aria-label='Close dialog'
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
                ) : (
                    message
                )}
            </DialogContent>

            <DialogActions>
                {buttons.map((b) => (
                    <Button
                        key={b.key}
                        autoFocus={b.key === defaultAction}
                        color={b.color}
                        variant={b.key === defaultAction ? 'primary' : 'text'}
                        onClick={() => fireAction(b.key)}
                    >
                        {b.label}
                    </Button>
                ))}
            </DialogActions>
        </MuiDialog>
    );
};

// ------------------------------------

export { Dialog };

