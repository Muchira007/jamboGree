import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

interface Props {
  formValues: {
    serial_number: string;
    payment_option: string;
    status_of_account: string;
    price?: string; // Optional field for price
    phone_number?: string; // Optional field for phone number
  };
  errors: {
    serial_number?: string;
    payment_option?: string;
    status_of_account?: string;
    price?: string; // Optional error for price
    phone_number?: string; // Optional error for phone number
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePaymentSuccess: () => void; // Callback for handling payment success
}

const PaymentInformation: React.FC<Props> = ({ formValues, errors, handleChange, handlePaymentSuccess }) => {
  const [showExtraFields, setShowExtraFields] = useState<boolean>(false);

  const handlePaymentOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e); // Call the original handleChange
    const selectedOption = e.target.value;
    setShowExtraFields(selectedOption === 'Credit');

    // If "Credit" is selected, set status_of_account to "Paid"
    if (selectedOption === 'Credit') {
      handlePaymentSuccess(); // Call the success handler
    }
  };

  const handlePay = async () => {
    if (formValues.payment_option === 'Credit') {
      const { price, phone_number } = formValues;
  
      // Validate that both price and phone_number are provided
      if (!price || !phone_number) {
        alert('Please enter both price and phone number.');
        return;
      }
  
      // Format the request body according to the specified requirements
      const data = {
        phone_number: phone_number.startsWith('0') ? `254${phone_number.slice(1)}` : phone_number, // Convert to international format
        amount: String(price), // Ensure amount is a string
      };
  
      try {
        const response = await axios.post('http://localhost:3000/stkpush', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response); // Handle success response
        alert('Payment successful!'); // Notify user of success
      } catch (error) {
        console.error(error);
        alert('Payment failed. Please try again.'); // Notify user of error
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <div className="form-group">
          <label htmlFor="serial_number" className="form-label">
            Unique Serial Number<span className="required">*</span>:
          </label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            className="form-input"
            value={formValues.serial_number}
            onChange={handleChange}
          />
          {errors.serial_number && <div className="error">{errors.serial_number}</div>}
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div className="form-group">
          <label htmlFor="payment_option" className="form-label">
            Payment Method<span className="required">*</span>:
          </label>
          <select
            id="payment_option"
            name="payment_option"
            className="form-select"
            value={formValues.payment_option}
            onChange={handlePaymentOptionChange} // Use the new handler
          >
            <option value="Select method">Select</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Mpesa</option>
          </select>
          {errors.payment_option && <div className="error">{errors.payment_option}</div>}
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div className="form-group">
          <label htmlFor="status_of_account" className="form-label">
            Payment Status<span className="required">*</span>:
          </label>
          <select
            id="status_of_account"
            name="status_of_account"
            className="form-select"
            value={formValues.status_of_account}
            onChange={handleChange}
          >
            <option value="Select Status">Select</option>
            <option value="Paid">Paid</option>
            <option value="Active">Active</option>
          </select>
          {errors.status_of_account && <div className="error">{errors.status_of_account}</div>}
        </div>
      </Grid>

      {/* Conditionally render extra fields for Credit payment option */}
      {showExtraFields && (
        <>
          <Grid item xs={12} sm={4}>
            <div className="form-group">
              <TextField
                label="Price"
                type="number"
                name="price"
                className="form-input"
                value={formValues.price || ''}
                onChange={handleChange}
                required
              />
              {errors.price && <div className="error">{errors.price}</div>}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="form-group">
              <TextField
                label="Phone Number"
                type="tel"
                name="phone_number"
                className="form-input"
                value={formValues.phone_number || ''}
                onChange={handleChange}
                required
              />
              {errors.phone_number && <div className="error">{errors.phone_number}</div>}
            </div>
          </Grid>

          {/* Pay Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handlePay}>
              Pay
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PaymentInformation;