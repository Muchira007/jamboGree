import React from 'react';
import { Button, Container } from '@mui/material';
import { PersonalDetails, LocationInformation, ProductInformation, PaymentInformation } from './components';
import { useGeolocation } from './hooks/useGeolocation';
import { useFormErrors } from './hooks/useFormErrors';
import { useFormValues } from './hooks/useFormValues';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './agent.scss';

const Agent: React.FC = () => {
  const {
    formValues,
    setFormValues,
    handleChange,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    geoError,
    setGeolocation,
  } = useFormValues();

  const { errors } = useFormErrors(formValues);
  const { getCurrentLocation } = useGeolocation(setGeolocation, (error: string | null) => {
    if (error) {
      console.error(error);
    }
  });

const handleSubmit = async () => {
  const result = await originalHandleSubmit();

  // Check if the response contains the sale object
  if (result && result.data && result.data.sale) {
    toast.success('Sale successfully recorded!', { autoClose: 2000 });

    console.log('Sale Data:', result.data.sale); // Log the sale data for verification

    // Clear form values immediately
    setFormValues({
      name: '',
      date_of_sale: '',
      gender: '',
      phone_number: '',
      customer_id: 0,
      latitude: 0,
      longitude: 0,
      country: '',
      county: '',
      subcounty: '',
      village: '',
      product_name: '',
      serial_number: '',
      payment_option: '',
      status_of_account: '',
      quantity: 0,
      national_id: 0
    });

    // Refresh the page
    setTimeout(() => {
      window.location.href = window.location.href; // Forces a full page reload
    }, 2000);
  } else {
    toast.error('Sale submission failed. Please try again.', { autoClose: 3000 });
    console.error('Failed response:', result.error || 'Unknown error');
  }
};

  
  return (
    <div className="agent-page">
      <Container className="form-container">
        <div className="row">
          <div className="col-md-9 form-section">
            <div className="form-group">
              <PersonalDetails
                formValues={formValues}
                errors={errors}
                handleChange={handleChange}
                geoError={geoError}
              />
            </div>

            <div className="form-group">
              <LocationInformation
                formValues={formValues}
                errors={errors}
                handleChange={handleChange}
                onFetchLocation={getCurrentLocation}
                latitude={formValues.latitude}
                longitude={formValues.longitude}
              />
            </div>

            <div className="form-group">
              <ProductInformation
                formValues={formValues}
                errors={errors}
                handleInputChange={handleInputChange}
                handleChange={handleChange}
              />
            </div>

            <div className="form-group">
              <PaymentInformation
                formValues={formValues}
                errors={errors}
                handleChange={handleChange}
              />
            </div>

            <div className="button-group">
              <Button type="button" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Agent;
