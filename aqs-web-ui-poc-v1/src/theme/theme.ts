import { createTheme } from '@mui/material/styles';

/**
 * MUI theme = the app's design tokens (SDD §7.4).
 * All color / spacing / typography decisions live here so components stay
 * token-driven and Tailwind utilities layer on top without ad-hoc CSS.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1f4e82', light: '#2c6bb0', dark: '#163a61' },
    secondary: { main: '#a96c22' },
    success: { main: '#2e7d5b' },
    warning: { main: '#b07d12' },
    error: { main: '#b3261e' },
    background: { default: '#f1f4f7', paper: '#ffffff' },
    text: { primary: '#151a21', secondary: '#5a6472' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
    fontSize: 14,
    button: { textTransform: 'none', fontWeight: 600 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});
