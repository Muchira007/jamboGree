import { useState } from 'react';
import { postSale } from '../../../services/apiSales';
import { Sale } from '../../../types';

export const useFormValues = () => {
  const [formValues, setFormValues] = useState<Sale>({
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

  const [geoError, setGeoError] = useState<string | null>(null);

  const getNationalIdFromSession = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.NationalID || 0;
      } catch (error) {
        console.error('Error parsing user from session storage:', error);
        return 0;
      }
    }
    return 0;
  };

  const national_id = getNationalIdFromSession();

  const setGeolocation = (lat: number, lon: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lon,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else if (type === 'date') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (type === 'number') {
      const numericValue = parseFloat(value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: isNaN(numericValue) ? '' : numericValue,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else if (type === 'date') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (type === 'number') {
      const numericValue = parseFloat(value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: isNaN(numericValue) ? '' : numericValue,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await postSale({ ...formValues, national_id });

      if (response.success && response.data) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error || 'Submission failed' };
      }
    } catch (error) {
      console.error('Error posting sale:', error);
      return { success: false, error: error.message || 'Unknown error' };
    }
  };

  return {
    formValues,
    geoError,
    handleInputChange,
    handleChange,
    handleSubmit,
    setGeolocation,
  };
};
