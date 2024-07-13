import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddUser } from '../../services/apiServices'; // Adjust the path as per your project structure

// Define initial Formik values
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  //profilePicture: null,
};

const defaultTheme = createTheme();

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  //profilePicture: Yup.mixed().optional(),
});

const SignUp = () => {
  const navigate = useNavigate();
  // const [profilePicture, setProfilePicture] = useState<File | null>(null); // Adjusted profilePicture state

  const addUserMutation = useAddUser();

  // const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setProfilePicture(file); // Set profilePicture state to File object
  //   }
  // };

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    console.log('Form submitted', values); // Debug log
    const newUser = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      // profilePicture: profilePicture || undefined, // Pass undefined if profilePicture is null
    };

    try {
      await addUserMutation.mutateAsync(newUser);

      // Handle success
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/home'); // Redirect to home or another page on success
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
      <Container component="main" maxWidth="xs">
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form noValidate style={{ width: '100%', marginTop: '8px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First Name"
                      required
                      fullWidth
                      autoComplete="given-name"
                      autoFocus
                    />
                    <ErrorMessage name="firstName" component="div" className="error-message" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      required
                      fullWidth
                      autoComplete="family-name"
                    />
                    <ErrorMessage name="lastName" component="div" className="error-message" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      required
                      fullWidth
                      autoComplete="email"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
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
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
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
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        handlePictureUpload(event);
                        setFieldValue('profilePicture', event.currentTarget.files?.[0]);
                      }}
                      style={{ display: 'none' }}
                      id="profile-picture"
                    />
                    <label htmlFor="profile-picture">
                      <Button
                        variant="contained"
                        component="span"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                      >
                        Upload Profile Picture
                      </Button>
                    </label>
                  </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
