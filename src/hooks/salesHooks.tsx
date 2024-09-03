import { useMutation, useQuery } from '@tanstack/react-query';
import { Customer, CustomerResponse } from '../types'; // Import the Customer type
import { getAllCustomers } from '../services/apiSales'; // API functions for customers
import { SalesResponse } from '../types'; // Import the SaleResponse type
import { getAllSales } from '../services/apiSales'; // Import the API function

// Function to add a customer
export const useGetAllCustomers = () => {
  return useQuery<CustomerResponse, Error>({
    queryKey: ['customers'],
    queryFn: async () => {
      const customers = await getAllCustomers();
      return { customers };
    },
  });
};



export const useGetAllSales = () => {
    return useQuery<SalesResponse, Error>({
        queryKey: ['sales'],
        queryFn: async () => {
            const sales = await getAllSales();
            return { sales };
        },
    });
};