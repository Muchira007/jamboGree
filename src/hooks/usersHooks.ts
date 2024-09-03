import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchAllUsers, forgotPassword, loginUser, signUp } from '../services/usersapi';
import { User } from '../types';
import { apiClient } from '../services/apiClient';
import Cookies from 'js-cookie'; // Import the 'Cookies' module

// Define the React Query hooks
export function useLoginUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const response = await apiClient.post('/login', loginData);
      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set('authToken', data.token, { expires: 1 });
      console.log('User data being set in cache:', data.user);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error) => {
      console.error('Error during login:', error);
    },
  });
}

export const useSignUp = () => {
  return useMutation<{ token: string; user: User }, Error, {
    national_id: number;
    email: string;
    first_name: string;
    second_name: string;
    sur_name: string;
    phone_num: string;
    password: string;
  }>({
    mutationFn: async (signUpData) => {
      const response = await apiClient.post('/signup', signUpData);
      return response.data;
    },
  });
};  

  export const useForgotPassword = () => {
  return useMutation<{ message: string }, Error, { email: string }>({
    mutationFn: forgotPassword,
  });
};

export function useCreateUser() {
  return useMutation<User, Error, {
    national_id: number;
    email: string;
    first_name: string;
    second_name: string;
    sur_name: string;
    phone_num: string;
    password: string;
  }>({
    mutationFn: createUser,
    onSuccess: (data) => {
      // Handle success, e.g., show a success message
      console.log('User created successfully:', data);
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error('Error creating user:', error);
    },
  });
}

export function useFetchAllUsers() {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
}
  // export const useFetchUserDetails = (userId: string) => {
  //   return useQuery<User, Error>(['userDetails', userId], () => fetchUserDetails(userId));
  // };
  
  // export const useFetchAllUsers = () => {
  //   return useQuery<User[], Error>(['allUsers'], fetchAllUsers);
  // };
  