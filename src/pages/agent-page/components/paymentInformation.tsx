import React from 'react';
import { Grid } from '@mui/material';

interface Props {
  formValues: {
    serial_number: string;
    payment_option: string;
    status_of_account: string;
  };
  errors: {
    serial_number?: string;
    payment_option?: string;
    status_of_account?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PaymentInformation: React.FC<Props> = ({ formValues, errors, handleChange }) => (
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
          onChange={handleChange}
        >
          <option value="Select method">Select</option>
          <option value="Cash">Cash</option>
          <option value="Credit">Credit</option>

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
  </Grid>
);

export default PaymentInformation;
