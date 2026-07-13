import { CircularProgress, Stack } from '@mui/material';

// -------------------------------------

function Loader() {
    return (
        <Stack
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            flex={'1 0 0'}
        >
            <CircularProgress />
        </Stack>
    );
}

// -------------------------------------

export { Loader };
