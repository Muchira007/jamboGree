// apiProducts.ts
import { apiClient, getToken } from './apiClient';
import { Product } from '../types'; // Import the 'Product' type from the appropriate module

// Function to handle product creation including image upload
export async function addProduct(newProduct: Product, imageFile?: File): Promise<Product> {
  const formData = new FormData();
  const token = getToken();

  console.log('Retrieved Token:', token); // Log the token

  // Append product details
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

  console.log('Retrieved Token for getAllProducts:', token); // Log the token

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


// Get product by ID
// async function getProductById(productId: string): Promise<Product> {
//   const response = await apiClient.get(`/products/${productId}`);
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
