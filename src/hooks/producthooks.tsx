import { useMutation, useQuery } from '@tanstack/react-query';
import { Product, ProductResponse } from '../types';
import { addProduct, getAllProducts } from '../services/apiProducts';

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