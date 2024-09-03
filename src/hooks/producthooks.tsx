import { useMutation, useQuery } from '@tanstack/react-query';
import { Product, ProductResponse } from '../types';
import { addProduct, getAllProducts, updateProduct } from '../services/apiProducts';

export const useAddProduct = () => {
  return useMutation<Product, Error, { product: Product; imageFile: File | undefined }>({
    mutationFn: ({ product, imageFile }) => addProduct(product, imageFile),
  });
};

export const useGetAllProducts = () => {
  return useQuery<ProductResponse, Error>({
    queryKey: ['products'],
    queryFn: getAllProducts
  });
};

// Custom hook to update a product
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (params: { id: string, product: Product }) => updateProduct(params.id, params.product),
    onSuccess: () => {
      // Optionally refetch products or do other side effects
    },
    onError: (error) => {
      // Optionally handle error
      console.error('Error in mutation:', error);
    },
  });
};