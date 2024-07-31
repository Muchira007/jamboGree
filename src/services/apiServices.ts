import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// Define the User type
interface User {
  name: string;
  email: string;
  password: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // your backend server URL
});

async function addUser(newUser: User): Promise<User> {
  const formData = new FormData();
  formData.append('name', newUser.name);
  formData.append('email', newUser.email);
  formData.append('password', newUser.password);

  // Debug log to verify the FormData contents
  for (let pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]); 
  }

  const response = await apiClient.post('/users', {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  });
  console.log(response);

  // Return the user object
  return response.data;
}

// Login user
async function loginUser(loginData: { email: string; password: string }): Promise<User> {
  const response = await apiClient.post('/users/login', loginData);
  return response.data;
}

// Fetch user details by ID
async function fetchUserDetails(userId: string): Promise<User> {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
}

// Fetch all users
async function fetchAllUsers(): Promise<User[]> {
  const response = await apiClient.get('/users');
  return response.data;
}

export const useAddUser = () => {
  return useMutation<User, Error, User>({
    mutationFn: addUser,
  });
};

export const useLoginUser = () => {
  return useMutation<User, Error, { email: string; password: string }>({
    mutationFn: loginUser,
  });
};

export const useFetchUserDetails = () => {
  return useMutation<User, Error, string>({
    mutationFn: fetchUserDetails,
  });
};

export const useFetchAllUsers = () => {
  return useMutation<User[], Error, void>({
    mutationFn: fetchAllUsers,
  });
};
