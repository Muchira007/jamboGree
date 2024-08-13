// src/services/apiClient.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual API URL
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiClient };


export const getToken = (): string | undefined => {
  return Cookies.get('authToken')
}