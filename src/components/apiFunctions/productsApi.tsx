import axios from 'axios';
import { apiClient, getToken } from '../../services/apiClient';
import { useQuery } from '@tanstack/react-query';

// Base URL for your API
const BASE_URL = 'http://localhost:3000'; // Update this to your actual API base URL

// Function to fetch total products
const fetchTotalProducts = async (): Promise<number> => {
    const token = await getToken(); // Get the token
    const response = await apiClient.post('/products/total-products', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.total_products;
};

// Custom hook to use the fetchTotalProducts function
export const useTotalProducts = () => {
    return useQuery<number, Error>({
        queryKey: ['totalProducts'],
        queryFn: fetchTotalProducts,
    });
};
// Get all unique product types
// export const getAllProductTypes = async (): Promise<string[]> => {
//     try {
//         const response = await axios.post(`${BASE_URL}/products/types`);
//         return response.data.product_types.map((type: { type: string }) => type.type);
//     } catch (error) {
//         console.error('Error fetching product types:', error);
//         throw error;
//     }
// };

// Example of how to use these functions in a component
// const fetchProductData = async () => {
//     try {
//         const totalProducts = await fetchTotalProducts();
//         console.log('Total Products:', totalProducts);

//         const productTypes = await getAllProductTypes();
//         console.log('Product Types:', productTypes);
//     } catch (error) {
//         console.error('Error fetching product data:', error);
//     }
// };

// // Call fetchProductData to test
// fetchProductData();
