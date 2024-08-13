import { Sale } from '../types';
import { apiClient, getToken } from './apiClient';

export const postSale = async (sale: Sale): Promise<Sale> =>  {
    const token = getToken();
    
    try {
        const response = await apiClient.post('/sales', sale, {
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
}