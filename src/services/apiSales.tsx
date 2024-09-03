import { Customer } from '../types';
import { apiClient, getToken } from './apiClient';
import { Sales } from '../types'; // Import the Sale type

// Function to post a new sale
export const postSale = async (newSale: Sales): Promise<Sales> => {
    const token = getToken();

    try {
        const response = await apiClient.post('/sales', newSale, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in postSale:', error);
        throw error;
    }
};
// Function to fetch all sales
export const getAllSales = async (): Promise<Sales[]> => {
    const token = getToken();

    try {
        const response = await apiClient.post('/all-sales', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Response:', response.data);
        return response.data.sales; // Return the sales array
    } catch (error) {
        console.error('Error in getAllSales:', error);
        throw error;
    }
};

export const getAllCustomers = async (): Promise<Customer[]> => {
    const token = getToken();
    
    try {
        const response = await apiClient.post('/all-customers', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        console.log('Customers data received:', response.data);
        return response.data.customers;
    } catch (error) {
        console.error('Error in getAllCustomers:', error);
        throw error;
    }
}