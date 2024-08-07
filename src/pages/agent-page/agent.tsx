// src/pages/agent-page/agent.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, Container } from '@mui/material'; // Import Button from MUI
import { PersonalDetails, LocationInformation, ProductInformation, PaymentInformation } from './components';
import { useGeolocation } from './hooks/useGeolocation';
import { useFormErrors } from './hooks/useFormErrors';
import { useFormValues } from './hooks/useFormValues';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './agent.scss'; // Import custom styles

const Agent: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    formValues,
    handleChange,
    handleInputChange,
    handleSubmit,
    geoError,
    setGeolocation,
  } = useFormValues();

  const { errors } = useFormErrors(formValues);

  const { getCurrentLocation } = useGeolocation(setGeolocation, (error: string | null) => {
    if (error) {
      // Handle geolocation error (you might want to display this in the UI)
      console.error(error);
    }
  });

  // Handle navigation to the dashboard
  // const goToDashboard = () => {
  //   navigate('/home'); // Navigate to /home
  // };

  return (
    <div className="agent-page">
      <Container className="form-container">
        <div className="form-content">
          <PersonalDetails
            formValues={formValues}
            errors={errors}
            handleChange={handleChange}
            geoError={geoError}
          />
          <LocationInformation
            formValues={formValues}
            errors={errors}
            handleChange={handleChange}
            onFetchLocation={getCurrentLocation} // Pass the function to fetch location
            latitude={formValues.latitude}
            longitude={formValues.longitude}
          />
          <ProductInformation
            formValues={formValues}
            errors={errors}
            handleInputChange={handleInputChange}
            handleChange={handleChange}
          />
          <PaymentInformation
            formValues={formValues}
            errors={errors}
            handleChange={handleChange}
          />
          <div className="button-group">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit} // Handle form submission
            >
              Submit
            </Button>
            {/* Uncomment the button below if needed */}
            {/* <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={goToDashboard} // Handle navigation
            >
              Go to Dashboard
            </Button> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Agent;
