import React, { useState, useEffect } from 'react';
import Modal, { ModalProps } from '@mui/material/Modal'; // Import the 'ModalProps' type
import { Button, TextField } from '@mui/material';
import { Product } from '../../types';
import './editProductModal.scss';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, onSave, product }): React.ReactNode => {
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-product-modal"
      aria-describedby="edit-product-description"
    >
      <div className="editProductModal">
        <h2>Edit Product</h2>
        <TextField
          label="Name"
          name="Name"
          value={formData.Name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="Description"
          value={formData.Description || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="Price"
          type="number"
          value={formData.Price || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="Quantity"
          type="number"
          value={formData.Quantity || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Color"
          name="Color"
          value={formData.Color || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div className="modal-actions">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
