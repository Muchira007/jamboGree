import { User } from '../types'; // Adjust import based on your types definition
import { apiClient, getToken } from './apiClient';

// Define the API functions
export async function loginUser(loginData: { email: string; password: string }): Promise<{ token: string; user: User }> {
  const response = await apiClient.post('/login', loginData);
  return response.data; 
}

export const signUp = async (signUpData: {
  national_id: number;
  email: string;
  first_name: string;
  second_name: string;
  sur_name: string;
  phone_num: string;
  password: string;
}): Promise<User> => {
  const response = await apiClient.post('/signup', signUpData);
  return response.data;
};

export async function forgotPassword(loginData: { email: string }): Promise<{ message: string }> {
  const response = await apiClient.post('/forgot-password', loginData);
  return response.data;
}

export async function fetchUserDetails(userId: string): Promise<User> {
  const response = await apiClient.post(`/get-users/${userId}`);
  return response.data;
}

export const fetchAllUsers = async (): Promise<User[]> => {
  const token = getToken();

  try {
      const response = await apiClient.post('/users', {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      // Access users from the response data
      return response.data.users;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

// API function to create a user
export async function createUser(userData: {
  national_id: number;
  email: string;
  first_name: string;
  second_name: string;
  sur_name: string;
  phone_num: string;
  password: string;
}): Promise<User> {
  const response = await apiClient.post('/create-users', userData);
  return response.data.user; // Adjust based on your response structure
}

// API function to update user information
export async function updateUser(userId: string, userData: {
  national_id?: number;
  email?: string;
  first_name?: string;
  second_name?: string;
  sur_name?: string;
  phone_num?: string;
}): Promise<User> {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data.user; // Adjust based on your response structure
}