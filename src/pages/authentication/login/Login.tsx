import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../../hooks/usersHooks'; // Adjust the import path
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // Import Cookies
import './Login.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export default function SignIn() {
  const queryClient = useQueryClient();
  const loginUserMutation = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string, password: string }, { setSubmitting, setFieldError }: { setSubmitting: (isSubmitting: boolean) => void, setFieldError: (field: string, message: string) => void }) => {
    try {
      const { token, user } = await loginUserMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      // Store the token in cookies
      Cookies.set('authToken', token, { expires: 1 }); // Store token with 1-day expiration

      // Store user data in React Query cache
      queryClient.setQueryData(['user'], user); // Assuming user contains the user details

      // Handle success
      console.log('User logged in successfully:', user);
      navigate('/home'); // Redirect to home or desired route
    } catch (error) {
      console.error('Error during login', error);
      setFieldError('password', 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="content">
        <Typography component="h1" variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Log In
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
                sx={{ borderRadius: '8px' }}
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
                sx={{ borderRadius: '8px' }}
              />
              {/* <FormControlLabel
                control={<Field as={Checkbox} value="remember" color="primary" name="remember" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: '1.1rem', padding: '12px 24px' }}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
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
      </div>
    </div>
  );
}