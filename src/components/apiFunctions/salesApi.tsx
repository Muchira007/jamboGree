import { apiClient, getToken } from "../../services/apiClient";


// Get sales by gender
export const fetchSalesByGender = async (): Promise<any> => {
    const token = getToken();
    try {
        const response = await apiClient.post('/sales-by-gender', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales by gender:', error);
        throw error;
    }
};

// Get sales count by national ID
export const getSalesByNationalID = async (nationalId: number): Promise<any> => {
    const token = getToken();
    try {
        const response = await apiClient.post(`/sales-by-national-id/${nationalId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales by national ID:', error);
        throw error;
    }
};

// Get sales by agent
export const getAgentSales = async (): Promise<any> => {
    const token = getToken();
    try {
        const response = await apiClient.post('/agent-sales', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching agent sales:', error);
        throw error;
    }
};
