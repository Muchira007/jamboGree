import React, { useEffect, useState, ChangeEvent } from 'react';
import { Grid, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import { Product } from '../../../types';
import { useGetAllProducts } from '../../../hooks/producthooks';
import { SelectChangeEvent } from '@mui/material';

interface Props {
  formValues: {
    product_name: string;
    // color: string;
    date_of_sale: string;
    quantity: number;
  };
  errors: {
    product_name?: string;
    // color?: string;
    date_of_sale?: string;
    quantity?: string;
  };
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: SelectChangeEvent<string>) => void;
}

const ProductInformation: React.FC<Props> = ({ formValues, errors, handleInputChange, handleChange }) => {
  const { data, isLoading, error } = useGetAllProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data.posts)) {
      console.log("Fetched products data:", data.posts);
      setProducts(data.posts);
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading products</div>;

  console.log("Form Values:", formValues);
  console.log("Errors:", errors);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <div className="form-group">
          <label htmlFor="product_name" className="form-label">
            Product Name<span className="required">*</span>:
          </label>
          <Select
            id="product_name"
            name="product_name"
            value={formValues.product_name}
            onChange={handleChange} // Use handleChange for Select
            fullWidth
          >
            {products.map((product) => (
              <MenuItem key={product.ID} value={product.Name}>
                {product.Name}
              </MenuItem>
            ))}
          </Select>
          {errors.product_name && <div className="error">{errors.product_name}</div>}
        </div>
      </Grid>
      <Grid item xs={12} sm={3}>
        <div className="form-group">
          <label htmlFor="date_of_sale" className="form-label">
            Date of Sale<span className="required">*</span>:
          </label>
          <TextField
            type="date"
            id="date_of_sale"
            name="date_of_sale"
            value={formValues.date_of_sale}
            onChange={handleInputChange} // Use handleInputChange for TextField
            fullWidth
          />
          {errors.date_of_sale && <div className="error">{errors.date_of_sale}</div>}
        </div>
      </Grid>
      <Grid item xs={12} sm={3}>
        <div className="form-group">
          <label htmlFor="quantity" className="form-label">
            Quantity<span className="required">*</span>:
          </label>
          <TextField
            type="number"
            id="quantity"
            name="quantity"
            value={formValues.quantity}
            onChange={handleInputChange} // Use handleInputChange for TextField
            fullWidth
          />
          {errors.quantity && <div className="error">{errors.quantity}</div>}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductInformation;
