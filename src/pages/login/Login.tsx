import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../../services/apiServices'; // Adjust the path as per your project structure
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
);

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export default function SignIn() {
  const loginUserMutation = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    try {
      const user = await loginUserMutation.mutateAsync({
        email: values.email,
        password: values.password,
        name: ''
      });
  
      // Handle success
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User logged in successfully:', user);
      // Navigate to home or another page on success
      // Add your navigation logic here, e.g., using a router or state management library
      navigate('/home'); // Example using react-router-dom
    } catch (error) {
      console.error('Error during login', error);
      setFieldError('email', 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <MainContent>
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={(theme) => ({
                marginTop: 8,
                marginBottom: 8,
                padding: 3,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'transparent',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              })}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form noValidate style={{ width: '100%', marginTop: '8px' }}>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <FormControlLabel
                      control={<Field as={Checkbox} value="remember" color="primary" name="remember" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isSubmitting}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="forgot-password" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="sign-up" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
            <Copyright />
          </Container>
        </Grid>
      </MainContent>
    </ThemeProvider>
  );
}
