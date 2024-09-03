import { apiClient, getToken } from './apiClient';
import { Product } from '../types';

// Function to handle product creation including image upload
export async function addProduct(newProduct: Product, imageFile?: File): Promise<Product> {
  const formData = new FormData();
  const token = getToken();

  console.log('Retrieved Token:', token);

  formData.append('name', newProduct.Name);
  formData.append('description', newProduct.Description); 
  formData.append('price', newProduct.Price.toString());
  formData.append('quantity', newProduct.Quantity.toString());
  formData.append('color', newProduct.Color);
  
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await apiClient.post('/products', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in addProduct:', error);
    throw error;
  }
}

export const getAllProducts = async () => {
  const token = getToken();

  console.log('Retrieved Token for getAllProducts:', token);

  try {
    const response = await apiClient.post('/products/get-product', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    throw error;
  }
};

// Update product by ID
export const updateProduct = async (id: string, updatedProduct: Product) => {
  const token = getToken();

  try {
    const response = await apiClient.post(`/products/update/${id}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response for product update:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}
