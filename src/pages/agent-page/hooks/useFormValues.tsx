import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { postSale } from '../../../services/apiSales';
import { Sale } from '../../../types';
import { User } from '../../../types';

export const useFormValues = () => {
  const queryClient = useQueryClient();
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
    product_name: '', // Updated from product_id
    serial_number: '',
    payment_option: '',
    status_of_account: '',
    quantity: 0,
    national_id: 0
  });

  const [geoError, setGeoError] = useState<string | null>(null);

  // Fetch the national_id from React Query
  const user = queryClient.getQueryData<User>(['user']);
  const national_id = user ? (user.NationalID || 0) : 0;

  const setGeolocation = (lat: number, lon: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lon,
    }));
  };

  // Add handleInputChange
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
      // Ensure `national_id` is included in formValues if necessary
      const response = await postSale({ ...formValues, national_id });
      console.log('Sale posted successfully:', response);
    } catch (error) {
      console.error('Error posting sale:', error);
    }
  };

  return {
    formValues,
    geoError,
    handleInputChange, // Return handleInputChange
    handleChange,
    handleSubmit,
    setGeolocation,
  };
};
