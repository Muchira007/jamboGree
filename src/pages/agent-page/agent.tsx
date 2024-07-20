import React, { useState } from 'react';
import FormWizard, { FormWizardProps } from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './agent.scss';

const Wizard: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [county, setCounty] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [villageTown, setVillageTown] = useState('');
  const [village, setVillage] = useState('');
  const [productType, setProductType] = useState('');
  const [color, setColor] = useState('');
  const [uniqueSerialNumber, setUniqueSerialNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [currentTabIndex, setCurrentTabIndex] = useState(0); // Track current tab index
  const [isValid, setIsValid] = useState(false); // Track form validity

  // Handle form completion logic
  const handleComplete = () => {
    console.log('Form completed!');
    // Handle form completion logic here
  };

  // Handle tab change
  const tabChanged = ({ prevIndex, nextIndex }: FormWizardProps.TabChangeEvent) => {
    console.log('prevIndex', prevIndex);
    console.log('nextIndex', nextIndex);

    let isFormValid = false;

    // Validate fields based on current tab index
    switch (prevIndex) {
      case 0: // Basic Information tab
        isFormValid = validateBasicInfo();
        break;
      case 1: // Location Information tab
        isFormValid = validateLocationInfo();
        break;
      case 2: // Product Information tab
        isFormValid = validateProductInfo();
        break;
      case 3: // Payment Information tab
        isFormValid = validatePaymentInfo();
        break;
      default:
        isFormValid = true; // No validation needed for other tabs
        break;
    }

    setIsValid(isFormValid); // Update isValid state based on validation

    if (!isFormValid) {
      toast.error('Please fill in all required fields');
      return prevIndex; // Stay on the current tab if validation fails
    }
    else

    setCurrentTabIndex(nextIndex); // Allow navigation to the next tab
    toast.success("succesfully filled")
    return nextIndex;
  };

  // Validate basic information fields
  const validateBasicInfo = () => {
    return name.trim() !== '' && gender.trim() !== '' && nationalID.trim() !== '';
  };

  // Validate location information fields
  const validateLocationInfo = () => {
    return county.trim() !== '' && subCounty.trim() !== '' && villageTown.trim() !== '' && village.trim() !== '';
  };

  // Validate product information fields
  const validateProductInfo = () => {
    return productType.trim() !== '' && color.trim() !== '';
  };

  // Validate payment information fields
  const validatePaymentInfo = () => {
    return uniqueSerialNumber.trim() !== '';
  };

  return (
    <>
      <FormWizard
        shape="circle"
        color="#0056b3"
        onComplete={handleComplete}
        onTabChange={tabChanged}
        activeTab={currentTabIndex} // Pass current tab index to FormWizard
      >
        <FormWizard.TabContent title="Basic Information" icon="ti-user">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              id="gender"
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nationalID" className="form-label">
              National ID:
            </label>
            <input
              type="text"
              id="nationalID"
              className="form-input"
              value={nationalID}
              onChange={(e) => setNationalID(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Location Information" icon="ti-location-pin">
          <div className="form-group">
            <label htmlFor="county" className="form-label">
              County:
            </label>
            <input
              type="text"
              id="county"
              className="form-input"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subCounty" className="form-label">
              Sub-County:
            </label>
            <input
              type="text"
              id="subCounty"
              className="form-input"
              value={subCounty}
              onChange={(e) => setSubCounty(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="villageTown" className="form-label">
              Village/Town:
            </label>
            <input
              type="text"
              id="villageTown"
              className="form-input"
              value={villageTown}
              onChange={(e) => setVillageTown(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="village" className="form-label">
             Ward:
            </label>
            <input
              type="text"
              id="village"
              className="form-input"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Product Information" icon="ti-package">
          <div className="form-group">
            <label htmlFor="productType" className="form-label">
              Product Type:
            </label>
            <input
              type="text"
              id="productType"
              className="form-input"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="color" className="form-label">
              Color:
            </label>
            <input
              type="text"
              id="color"
              className="form-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Payment Information" icon="ti-credit-card">
          <div className="form-group">
            <label htmlFor="uniqueSerialNumber" className="form-label">
              Unique Serial Number:
            </label>
            <input
              type="text"
              id="uniqueSerialNumber"
              className="form-input"
              value={uniqueSerialNumber}
              onChange={(e) => setUniqueSerialNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
        </FormWizard.TabContent>
      </FormWizard>
      {!isValid && (
        <div className="form-step-error">
          <span>Please fill in all required fields</span>
          
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Wizard;