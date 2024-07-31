import axios from 'axios';
import { Product } from '../../src/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // your backend server URL
});

// Function to handle product creation including image upload
export async function addProduct(newProduct: Product, imageFile?: File): Promise<Product> {
  const formData = new FormData();
  
  // Append product details
  formData.append('name', newProduct.name);
  formData.append('description', newProduct.description);
  formData.append('price', newProduct.price.toString());
  formData.append('quantity', newProduct.quantity.toString());
  formData.append('color', newProduct.color);
  
  // Append image file if present
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

// Get product by ID
// async function getProductById(productId: string): Promise<Product> {
//   const response = await apiClient.get(`/products/${productId}`);
//   return response.data;
// }

// // Get all products
// async function getAllProducts(): Promise<Product[]> {
//   const response = await apiClient.get('/users/products');
//   return response.data;
// }

// // Delete product by ID
// async function deleteProduct(productId: string): Promise<void> {
//   await apiClient.delete(`/products/${productId}`);
// }

// React Query hooks


// export const useGetProductById = () => {
//   return useMutation(getProductById);
// };

// export const useGetAllProducts = () => {
//   return useMutation(getAllProducts);
// };

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation(deleteProduct, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('products');
//     },
//   });
// };
