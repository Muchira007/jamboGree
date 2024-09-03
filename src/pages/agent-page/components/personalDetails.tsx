import React from 'react';

interface Props {
  formValues: {
    name: string;
    gender: string;
    national_id: number;
    phone_number: string;
    customer_id: number;
  };
  errors: {
    customer_id: number;
    name?: string;
    gender?: string;
    national_id?: number;
    phone_number?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  geoError: string | null;
}

const PersonalDetails: React.FC<Props> = ({ formValues, errors, handleChange, geoError }) => {
  return (
    <>
      {/* Name and Gender on the same row */}
      <div className="form-row">
        <div className="form-group name-group">
          <label htmlFor="name" className="form-label">
            Name<span className="required">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group gender-group">
          <label htmlFor="gender" className="form-label">
            Gender<span className="required">*</span>:
          </label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formValues.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>
      </div>

      {/* National ID and Phone Number on the same row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customer_id" className="form-label">
            National ID<span className="required">*</span>:
          </label>
          <input
            type="number"
            id="customer_id"
            name="customer_id"
            className="form-input"
            value={formValues.customer_id}
            onChange={handleChange}
          />
          {errors.customer_id && <div className="error">{errors.customer_id}</div>}
        </div>

        <div className="form-group phone-group">
          <label htmlFor="phone_number" className="form-label">
            Phone Number<span className="required">*</span>:
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-input"
            value={formValues.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <div className="error">{errors.phone_number}</div>}
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
