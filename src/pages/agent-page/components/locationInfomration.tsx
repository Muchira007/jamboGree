import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { countries } from '../../../data';

interface Props {
  formValues: {
    country: string; // Use country code in form values
    county: string;
    subcounty: string;
    village: string;
  };
  errors: {
    country?: string;
    county?: string;
    subcounty?: string;
    village?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFetchLocation: () => void;
  latitude: number | null;
  longitude: number | null;
}

const countiesInKenya = [
  "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo",
  "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu",
  "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka Nithi", "Trans-Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const LocationInformation: React.FC<Props> = ({
  formValues,
  errors,
  handleChange,
  onFetchLocation,
  latitude,
  longitude,
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState<string>(formValues.country);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const selectedCountryCode = event.target.value;
    setSelectedCountry(selectedCountryCode);
    handleChange({
      target: { name: 'country', value: selectedCountryCode }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Find the country name for the selected code
  const selectedCountryName = countries.find(country => country.code === selectedCountry)?.name || '';

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="form-input"
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="county" className="form-label">
              County<span className="required">*</span>:
            </label>
            <select
              id="county"
              name="county"
              className="form-select"
              value={formValues.county}
              onChange={handleChange}
            >
              <option value="">Select County</option>
              {countiesInKenya.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
            {errors.county && <div className="error">{errors.county}</div>}
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="subcounty" className="form-label">
              Sub-County<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="subcounty"
              name="subcounty"
              className="form-input"
              value={formValues.subcounty}
              onChange={handleChange}
            />
            {errors.subcounty && <div className="error">{errors.subcounty}</div>}
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="village" className="form-label">
              Village/Town<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="village"
              name="village"
              className="form-input"
              value={formValues.village}
              onChange={handleChange}
            />
            {errors.village && <div className="error">{errors.village}</div>}
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <div className="form-group">
            <label htmlFor="village" className="form-label">
              Ward<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="village"
              name="village"
              className="form-input"
              value={formValues.village}
              onChange={handleChange}
            />
            {errors.village && <div className="error">{errors.village}</div>}
          </div>
        </Grid> */}
      </Grid>

      <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={4}>
          <button
            type="button"
            onClick={onFetchLocation}
            style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', width: '100%' }}
          >
            Get Current Location
          </button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="form-input" style={{ backgroundColor: 'white', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
            <label>Latitude:</label>
            <span>{latitude !== null ? latitude : 'Not available'}</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="form-input" style={{ backgroundColor: 'white', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
            <label>Longitude:</label>
            <span>{longitude !== null ? longitude : 'Not available'}</span>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationInformation;
