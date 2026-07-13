import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@/constants/theme';
import '@mui/x-data-grid/themeAugmentation';

// types
import type { ReactNode } from 'react';

// ----------------------------------------

const theme = createTheme({
    typography: {
        fontFamily: Theme.fonts.FONT.toString(),
    },
    palette: {
        brand: {
            main: Theme.colors.BRAND,
            contrastText: Theme.colors.BRAND_CONTRAST,
        },
        brandComplement: {
            main: Theme.colors.BRAND,
            contrastText: Theme.colors.BRAND_CONTRAST,
        },
        primary: {
            main: Theme.colors.PRIMARY,
            contrastText: Theme.colors.PRIMARY_CONTRAST,
        },
        secondary: {
            main: Theme.colors.SECONDARY,
            contrastText: Theme.colors.SECONDARY_CONTRAST,
        },
        action: {
            disabled: Theme.colors.DISABLED,
            disabledBackground: Theme.colors.DISABLED_BACKGROUND,
            hover: Theme.colors.SECONDARY_VARIANT,
        },
        error: {
            light: Theme.colors.ERROR_LIGHT,
            main: Theme.colors.ERROR,
            contrastText: Theme.colors.ERROR,
        },
        warning: {
            main: Theme.colors.WARNING,
        },

        divider: Theme.colors.DIVIDER,

        border: {
            main: Theme.colors.BORDER,
            light: Theme.colors.BORDER_LIGHT,
            dark: Theme.colors.DIVIDER,
            veryLight: Theme.colors.BORDER,
        },
        text: {
            primary: Theme.colors.PRIMARY_TEXT,
        },
    },
    shape: {
        borderRadius: Theme.borders.RADIUS,
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&.Mui-error': {
                        color: Theme.colors.ERROR,
                        marginLeft: '0px',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.MuiFormLabel-asterisk': {
                        color: Theme.colors.ERROR,
                        fontSize: '1.4rem',
                        verticalAlign: 'top',
                    },
                    '&.formLabel': {
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: Theme.colors.PRIMARY_TEXT,
                        textWrap: 'auto',
                        lineHeight: 1,
                        textAlign: 'right',
                        marginRight: '1rem',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.montBold': {
                        fontWeight: '700',
                    },
                    '&.montBlue': {
                        color: Theme.colors.BRAND,
                    },
                    '&.formLabel': {
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: Theme.colors.PRIMARY_TEXT,
                        textWrap: 'nowrap',
                        marginBottom: '1px',
                    },
                    '&.tab-heading': {
                        fontWeight: '700',
                        fontSize: '1rem',
                        marginBottom: '0.5rem',
                        color: Theme.colors.BRAND,
                    },
                    '&.dashMenu': {
                        fontWeight: '700',
                        fontSize: '1rem',
                        paddingTop: '0.5rem',
                        textTransform: 'capitalize',
                        color: Theme.colors.PRIMARY_TEXT,
                        whiteSpace: 'nowrap',
                    },
                    '&.policy-id-no': {
                        whiteSpace: 'nowrap',
                        fontSize: '12px',
                        fontWeight: '400',
                        textAlign: 'left',
                        color: Theme.colors.PRIMARY_TEXT,
                        marginTop: '4px',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    '&.MuiInputBase-input': {
                        padding: '10px 12px',
                    },
                    '&.MuiOutlinedInput-root': {
                        borderRadius: '0px',
                        '&:hover': {
                            borderRadius: '0px',
                            color: Theme.colors.PRIMARY,
                            backgroundColor: Theme.colors.BRAND_CONTRAST,
                        },
                        '&.active': {
                            borderRadius: '0px',
                            color: Theme.colors.PRIMARY,
                            backgroundColor: Theme.colors.BRAND_CONTRAST,
                        },
                        '&.Mui-disabled': {
                            border: `0.5px solid ${Theme.colors.DISABLED}`,
                            backgroundColor: Theme.colors.DISABLED_BACKGROUND,
                            color: `${Theme.colors.SECONDARY_VARIANT} !important`,
                        },
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-mainContent': {
                        '& .MuiDataGrid-main': {
                            border: `0.5px solid ${Theme.colors.DISABLED}`,
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: Theme.colors.BRAND,
                                color: Theme.colors.BRAND_CONTRAST,
                                fontSize: '14px',
                                fontWeight: '700',

                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: Theme.colors.BRAND,
                                    borderBottom: 'none',
                                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                                        justifyContent: 'start',
                                        paddingLeft: '1rem',
                                    },
                                    '& .MuiDataGrid-menuIcon': {
                                        '& .MuiSvgIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                },
                            },
                            '& .MuiDataGrid-filler': {
                                backgroundColor: Theme.colors.BRAND,
                                borderBottom: 'none',
                            },
                        },
                    },
                    '& .MuiDataGrid-row': {
                        fontWeight: 500,
                        ':hover': {
                            backgroundColor: Theme.colors.TABLE_ROW_HOVER,
                        },
                    },

                    '& .MuiDataGrid-cell': {
                        textAlign: 'left',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    '& .MuiCheckbox-root.Mui-disabled ': {
                        color: Theme.colors.DISABLED_BACKGROUND,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiButtonBase-root': {
                        textTransform: 'capitalize',
                    },
                    '& .MuiTabs-scroller': {
                        borderBottom: `1px solid ${Theme.colors.TERTIARY_CONTRAST}`,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    fontFamily: 'var(--font-roboto) !important',
                    borderRadius: '10px',
                    '& .MuiPopover-paper': {
                        fontFamily: 'var(--font-roboto) !important',
                        maxHeight: 'calc(100% - 264px)',
                        borderRadius: '10px',
                    },
                    '& .MuiPickersLayout-root': {
                        fontFamily: 'var(--font-roboto) !important',
                        display: 'inline-block',
                        '& .MuiPickersLayout-contentWrapper': {
                            backgroundColor: Theme.colors.CALENDER_BG,
                            '& .MuiButtonBase-root': {
                                '&.MuiPickersDay-root': {
                                    '&.Mui-selected': {
                                        color: Theme.colors.BRAND_CONTRAST,
                                    },
                                },
                            },
                        },
                    },
                },
                '& .MuiYearCalendar-root': {
                    '& .MuiYearCalendar-button.Mui-selected': {
                        color: Theme.colors.BRAND_CONTRAST,
                    },
                },
                '& .MuiMonthCalendar-root': {
                    '& .MuiMonthCalendar-button.Mui-selected': {
                        color: Theme.colors.BRAND_CONTRAST,
                    },
                },
                '& .MuiDateCalendar-root': {
                    maxHeight: '290px',
                    fontFamily: 'var(--font-roboto) !important',
                },
                '& .MuiList-root': {
                    padding: '0',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {},
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '1.5rem',
                    '& .MuiStack-root': {
                        '& .MuiFormLabel-root': {
                            fontWeight: '700',
                            fontSize: '0.875rem',
                            color: Theme.colors.PRIMARY_TEXT,
                        },
                    },
                    '& .MuiBox-root': {
                        width: '350px',
                        height: '400px',
                        '& .MuiTableBody-root': {
                            '& .MuiTableRow-root': {
                                borderBottom: '2px solid #00205B',
                            },
                            '& .MuiTableCell-alignRight': {
                                fontFamily: 'var(--font-roboto)',
                            },
                        },
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    '& .MuiFormControlLabel-label': {
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: '#000000',
                    },
                    '& .MuiPickersInputBase-root': {
                        fontSize: '14px',

                        '& .MuiPickersSectionList-root': {
                            '& .MuiPickersSectionList-sectionContent ': {
                                fontFamily: 'var(--font-roboto)',
                                fontSize: '0.9rem',
                            },
                        },
                        '& .MuiInputAdornment-positionEnd .MuiSvgIcon-root': {
                            width: '18px',
                            height: '18px',
                            position: 'relative',
                            right: '-5px',
                        },
                        // '&.MuiPickersTextField-root': {
                        //   width: '320px',
                        // },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '& .MuiButton-textInherit ': {
                        borderRadius: '1.5rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        backgroundColor: Theme.colors.PRIMARY,
                        color: Theme.colors.BRAND_CONTRAST,
                    },
                },
            },

            variants: [
                {
                    props: { variant: 'primary' },
                    style: {
                        backgroundColor: Theme.colors.PRIMARY,
                        border: `1px solid ${Theme.colors.PRIMARY}`,
                        color: Theme.colors.BRAND_CONTRAST,
                        borderRadius: '1.5rem',
                        paddingX: '0.5rem',
                        paddingY: '0.5rem',
                        textTransform: 'capitalize',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        maxHeight: '35px',
                        '&:hover': {
                            backgroundColor: Theme.colors.BUTTON_HOVER,
                            border: `1px solid ${Theme.colors.BUTTON_HOVER}`,
                            color: Theme.colors.BRAND_CONTRAST,
                        },
                        '&:disabled': {
                            backgroundColor: Theme.colors.TERTIARY_VARIANT,
                            border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
                            color: '#59646d',
                        },
                    },
                },
                {
                    props: { variant: 'secondary' },
                    style: {
                        backgroundColor: Theme.colors.BACKGROUND_BUTTON,
                        border: `1px solid ${Theme.colors.SECONDARY}`,
                        color: Theme.colors.SECONDARY,
                        borderRadius: '1.5rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        textTransform: 'capitalize',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        maxHeight: '35px',
                        '&:hover': {
                            backgroundColor: Theme.colors.SECONDARY_BUTTON_HOVER,
                            border: `1px solid ${Theme.colors.PRIMARY}`,
                            color: Theme.colors.PRIMARY,
                        },
                        '&:disabled': {
                            backgroundColor: Theme.colors.TERTIARY_VARIANT,
                            border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
                            color: '#59646d',
                        },
                    },
                },
                {
                    props: { variant: 'tertiary' },
                    style: {
                        backgroundColor: Theme.colors.TERTIARY_VARIANT,
                        border: `1px solid ${Theme.colors.TERTIARY_VARIANT}`,
                        color: Theme.colors.BRAND,
                        borderRadius: '1.5rem',
                        paddingX: '0.5rem',
                        paddingY: '0.5rem',
                        textTransform: 'capitalize',
                        fontSize: '1rem',
                        fontWeight: '500',

                        '&:hover': {
                            backgroundColor: '#c4cbd1',
                            border: `1px solid #c4cbd1`,
                            color: Theme.colors.BRAND,
                        },
                        // '&:disabled': {
                        //   backgroundColor: Theme.colors.PRIMARY_BUTTON_INACTIVE,
                        //   border: `1px solid ${Theme.colors.PRIMARY_BUTTON_INACTIVE}`,
                        //   opacity: 0.5,
                        // },
                    },
                },
                {
                    props: { variant: 'tableMedium' },
                    style: {
                        backgroundColor: Theme.colors.BRAND_CONTRAST,
                        border: `none`,
                        color: Theme.colors.BRAND,
                        borderRadius: 'none',
                        padding: '0',
                        textTransform: 'capitalize',
                        fontSize: '0.875rem',
                        fontWeight: '500',

                        '&:hover': {
                            color: Theme.colors.PRIMARY_BUTTON_INACTIVE,
                        },
                        '&:disabled': {
                            color: '#b4b6b8',
                        },
                    },
                },

                {
                    props: { variant: 'errorMedium' },
                    style: {
                        backgroundColor: Theme.colors.ERROR,
                        border: `1px solid ${Theme.colors.ERROR}`,
                        color: Theme.colors.BRAND_CONTRAST,
                        fontWeight: '700',
                        padding: '0 3em',
                        '&.MuiButtonBase-root': {
                            fontSize: '0.875rem',
                            textTransform: 'none',
                        },
                        '&:hover': {
                            backgroundColor: Theme.colors.ERROR_LIGHT,
                            border: `1px solid ${Theme.colors.ERROR}`,
                            color: Theme.colors.ERROR,
                        },
                    },
                },
            ],
        },
    },
});

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        primary: true;
        secondary: true;
        tertiary: true;
        errorMedium: true;
        tableMedium: true;
    }
}

declare module '@mui/material/styles' {
    interface TypeText {
        watermark: string;
    }

    interface Palette {
        brand: Palette['primary'];
        brandComplement: Palette['primary'];
        border: Palette['primary'];
    }

    interface PaletteOptions {
        brand: PaletteOptions['primary'];
        brandComplement: PaletteOptions['primary'];
        border: PaletteOptions['primary'];
    }

    interface TypeBackground {
        input?: string;
        inputDisabled?: string;
    }

    interface PaletteColor {
        veryLight?: string;
    }
    interface SimplePaletteColorOptions {
        veryLight?: string;
    }
}

function ThemeProvider({ children }: { children: ReactNode }) {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export { ThemeProvider };
