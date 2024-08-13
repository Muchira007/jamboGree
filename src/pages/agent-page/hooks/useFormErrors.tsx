import { useMemo } from 'react';

export const useFormErrors = (formValues: any) => {
  const errors = useMemo(() => {
    const errs: any = {};
    if (!formValues.name) errs.name = 'Name is required';
    if (!formValues.county) errs.county = 'County is required';
    if (!formValues.productType) errs.productType = 'Product Type is required';
    if (!formValues.uniqueSerialNumber) errs.uniqueSerialNumber = 'Unique Serial Number is required';
    return errs;
  }, [formValues]);

  const tabErrors = {
    personalDetails: errors.name ? 1 : 0,
    locationInformation: errors.county ? 1 : 0,
    productInformation: errors.productType ? 1 : 0,
    paymentInformation: errors.uniqueSerialNumber ? 1 : 0,
  };

  return { errors, tabErrors };
};
