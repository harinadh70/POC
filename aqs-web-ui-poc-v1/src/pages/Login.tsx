import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Login (sprint task 11) — authenticates and seeds the auth store + session
 * (userId, CompLoc). The POC accepts any credentials; a real build calls the
 * Auth API.
 */
export function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('hsakalabhaktula');

  const submit = () => {
    login(
      { userId, compLoc: 'PIHW', lob: 'POL' },
      ['POLICY_VIEW', 'POLICY_EDIT'],
    );
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100%', display: 'grid', placeItems: 'center', bgcolor: 'background.default', p: 2 }}>
      <Paper elevation={0} sx={{ p: 4, width: 380, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          AQS Portal
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Legacy ASP → React migration POC
        </Typography>
        <Stack spacing={2}>
          <TextField label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <TextField label="Password" type="password" defaultValue="demo" />
          <Button variant="contained" size="large" onClick={submit} disabled={!userId.trim()}>
            Sign in
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
