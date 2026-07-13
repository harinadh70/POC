import { useState, useEffect } from 'react';
import { Form, useNavigation, useActionData, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';

// ----------------------------------------

export default function Login() {
    const location = useLocation();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <main className="flex flex-col grow items-center justify-center p-10! bg-[#EEF9FF]! h-[calc(100vh-100⟪cut off at right edge, continuation not visible⟫
        <DisplayUserStatus />
        <div className="flex items-center justify-center bg-white!">
            <Form
                method="post"
                style={{
                    minWidth: '450px',
                    minHeight: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                className=" p-10! text-center!"
                key={location.key}
                autoComplete="off"
            >
                <div className="  w-full">
                    <h6 className="text-[#0A2C6E] font-semibold text-[18px] mb-6!">
                        AQS/advantage User Login
                    </h6>
                    <div className="flex flex-col gap-y-4 justify-end ">
                        <div className="grid grid-cols-[70px_1fr] items-center gap-4">
                            <Typography
                                variant="body1"
                                className="shrink-0 text-left formLabel "
                            >
                                <span className="text-[#CC0000] text-2xl align-top leading-none">
                                    *
                                </span>
                                Username
                            </Typography>

                            <Tooltip
                                title={
                                    <span style={{ whiteSpace: 'pre-line' }}>
                                        name = dtaUserID
                                    </span>
                                }
                                placement="top"
                                arrow
                            >
                                <TextField
                                    size="small"
                                    type="text"
                                    id="username"
                                    name="username"
                                    fullWidth
                                    required
                                    autoFocus
                                    data-testid="Username"
                                    required
                                />
                            </Tooltip>
                        </div>
                        <div className="grid grid-cols-[70px_1fr] items-center gap-4">
                            <Typography
                                variant="body1"
                                className="shrink-0 text-left formLabel"
                            >
                                <span className="text-[#CC0000] text-2xl align-top leading-none">*</span>
                                Password
                            </Typography>
                            <TextField
                                size="small"
                                required
                                id="password"
                                name="password"
                                fullWidth
                                type="password"
                                data-testid="Password"
                            />
                        </div>
                        <div className="flex  justify-end ">
                            <Button
                                // TODO ⟪missing lines 89-96 — not captured in photos⟫
                                variant="primary"
                                size="large"
                                data-testid="Login"
                                className=" text-right"
                                sx={{
                                    maxWidth: '120px',
                                }}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        </main>
    );
}

// ----------------------------------------

function DisplayUserStatus() {
  const actionData = useActionData() as { error?: string } | undefined;

  if (!actionData?.error) return null;

  // By passing the error as a key, this component "re-mounts"
  // every time the error message changes.
  return <TimedAlert key={actionData.error} message={actionData.error} />;
}

// ----------------------------------------

function TimedAlert({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []); // Runs once on mount (which happens whenever the error changes)

  return (
    <Collapse in={visible}>
      <Alert severity="error" variant="filled" onClose={() => setVisible(false)}>
        {message}
      </Alert>
    </Collapse>
  );
}
