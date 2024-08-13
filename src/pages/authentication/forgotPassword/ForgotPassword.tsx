import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForgotPassword } from '../../../hooks/usersHooks'; // Import the hook
import "../login/login.scss"; // Ensure this file contains the required styles

function ForgotPassword() {
  const { mutate: forgotPassword, status, error, data } = useForgotPassword(); // Destructure the mutate function and status from the hook

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string; // Ensure email is a string

    try {
      await forgotPassword({ email });
    } catch (error) {
      console.error('Error sending reset link', error);
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className='login-page'>
        <div className="content">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              padding: 3,
              borderRadius: 8,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Forgot Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ borderRadius: '20px' }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: '1.1rem', padding: '12px 24px' }}
                disabled={status === 'pending'} // Disable button while request is in progress
              >
                Send Reset Link
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="sign-up" variant="body2">
                    Remembered your password? Sign in
                  </Link>
                </Grid>
              </Grid>
              {status === 'error' && (
                <Typography color="red" sx={{ mt: 2 }}>
                  { 'An error occurred. Please try again. Please check the email entered'}
                </Typography>
              )}
              {status === 'success' && (
                <Typography color="green" sx={{ mt: 2 }}>
                  {data?.message || 'Password reset link sent successfully.'}
                </Typography>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;
