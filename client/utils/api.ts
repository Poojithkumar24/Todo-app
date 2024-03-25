import axios from 'axios';

const baseURL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: baseURL,
});

export const login = async (userData: { username: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

export const register = async (userData: { username: string; password: string }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await api.post('/auth/verifyToken', { token });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      throw new Error('Invalid token');
    }
    throw error.response ? error.response.data : error.message;
  }
};
