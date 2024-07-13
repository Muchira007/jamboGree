import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Product } from '../../src/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5010', // your backend server URL
});

async function addProduct(newProduct: Product): Promise<Product> {
  const response = await apiClient.post('/products', newProduct);
  return response.data;
}

export const useAddProduct = () => {
  return useMutation<Product, Error, Product>({
    mutationFn: addProduct,
  });
};

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
