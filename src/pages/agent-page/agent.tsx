import React from 'react';
import FormWizard from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import { Container } from 'react-bootstrap';
import { PersonalDetails, LocationInformation, ProductInformation, PaymentInformation } from './components';
import { useGeolocation } from './hooks/useGeolocation';
import { useFormErrors } from './hooks/useFormErrors';
import { useFormValues } from './hooks/useFormValues';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './agent.scss'; // Import custom styles

const Wizard: React.FC = () => {
  const {
    formValues,
    handleChange,
    handleSubmit,
    geoError,
    latitude,
    longitude,
    setGeolocation,
  } = useFormValues();

  const { errors, tabErrors } = useFormErrors(formValues);

  const { getCurrentLocation } = useGeolocation(setGeolocation, (error: string | null) => {
    if (error) {
      // Handle geolocation error (you might want to display this in the UI)
      console.error(error);
    }
  });

  const getTabTitle = (tabName: string, count: number): string => {
    return `${tabName}${count > 0 ? ` (${count})` : ''}`;
  };

  return (
    <Container className="wizard-container">
      <div className="content">
        <FormWizard
          shape="circle"
          color="#0056b3"
          onComplete={handleSubmit}
        >
          <FormWizard.TabContent
            title={getTabTitle('Personal Details', tabErrors.personalDetails)}
            icon="fas fa-user" // Font Awesome user icon
          >
            <PersonalDetails
              formValues={{ ...formValues}}
              errors={errors}
              handleChange={handleChange}
              geoError={geoError}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent
            title={getTabTitle('Location Information', tabErrors.locationInformation)}
            icon="fas fa-map-marker-alt" // Font Awesome location pin icon
          >
            <LocationInformation
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
              onFetchLocation={getCurrentLocation} // Pass the function to fetch location
              latitude={latitude}
              longitude={longitude}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent
            title={getTabTitle('Product Information', tabErrors.productInformation)}
            icon="fas fa-box" // Font Awesome package icon
          >
            <ProductInformation
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent
            title={getTabTitle('Payment Information', tabErrors.paymentInformation)}
            icon="fas fa-credit-card" // Font Awesome credit card icon
          >
            <PaymentInformation
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
            />
          </FormWizard.TabContent>
        </FormWizard>
      </div>
    </Container>
  );
};

export default Wizard;
