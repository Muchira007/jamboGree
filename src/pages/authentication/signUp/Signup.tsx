import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Link,
  FormHelperText,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for styling

import "../login/login.scss";
import { useSignUp } from '../../../hooks/usersHooks';

// Define initial Formik values
const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  national_id: '',
  first_name: '',
  second_name: '',
  sur_name: '',
  phone_num: '',
};

const defaultTheme = createTheme();

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  second_name: Yup.string().required('Required'),
  sur_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  phone_num: Yup.string().required('Required'), // Added validation for phone number
  national_id: Yup.string().required('Required'), // Added validation for national_id
});

const SignUp = () => {
  const navigate = useNavigate();
  const addUserMutation = useSignUp();

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    const newUser = {
      national_id: parseInt(values.national_id, 10), // Convert national_id to number
      email: values.email,
      first_name: values.first_name,
      second_name: values.second_name,
      sur_name: values.sur_name,
      phone_num: values.phone_num.replace(/^\+/, ''), // Remove the leading '+' from phone number
      password: values.password,
    };

    try {
      const response = await addUserMutation.mutateAsync(newUser);
      const { token, user } = response; // Adjust according to your actual response structure

      // Store the token in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Navigate to home page
      navigate('/home');
    } catch (error) {
      console.error('Error during user creation', error);
      setFieldError(
        'email',
        (error as any).response?.data?.message || 'Unable to create account. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='login-page'>
        <div className="content">
          <CssBaseline />
          {/* <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
              <Form noValidate style={{ width: '100%', marginTop: '2px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="first_name"
                      label="First Name"
                      required
                      fullWidth
                      autoComplete="given-name"
                      autoFocus
                      error={Boolean(errors.first_name && touched.first_name)}
                      helperText={<ErrorMessage name="first_name" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="second_name"
                      label="Second Name"
                      required
                      fullWidth
                      autoComplete="family-name"
                      error={Boolean(errors.second_name && touched.second_name)}
                      helperText={<ErrorMessage name="second_name" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="sur_name"
                      label="Surname"
                      required
                      fullWidth
                      autoComplete="family-name"
                      error={Boolean(errors.sur_name && touched.sur_name)}
                      helperText={<ErrorMessage name="sur_name" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="national_id"
                      label="National ID"
                      required
                      fullWidth
                      error={Boolean(errors.national_id && touched.national_id)}
                      helperText={<ErrorMessage name="national_id" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      required
                      fullWidth
                      autoComplete="email"
                      error={Boolean(errors.email && touched.email)}
                      helperText={<ErrorMessage name="email" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      required
                      fullWidth
                      autoComplete="new-password"
                      error={Boolean(errors.password && touched.password)}
                      helperText={<ErrorMessage name="password" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                      fullWidth
                      autoComplete="new-password"
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      helperText={<ErrorMessage name="confirmPassword" />}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                      <PhoneInput
                        international
                        defaultCountry="KE"
                        name="phone_num"
                        value={values.phone_num}
                        onChange={(value) => setFieldValue('phone_num', value)}
                        placeholder="Enter phone number"
                        className="custom-phone-input"
                      />
                      <FormHelperText error={Boolean(errors.phone_num && touched.phone_num)}>
                        <ErrorMessage name="phone_num" />
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1rem', padding: '10px 20px' }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item className='Text-body'>
                    <Link href="login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;