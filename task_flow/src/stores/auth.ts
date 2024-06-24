import { defineStore } from 'pinia';
import { isAxiosError } from 'axios'; 
import axios from '../config/axiosConfig'; 
import { ref } from 'vue';

interface User {
  id: number;
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || '');
  const user = ref<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token: jwt, id, username: returnedUsername } = response.data;

      token.value = jwt;
      sessionStorage.setItem('token', token.value);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      
      user.value = { id, username: returnedUsername, password };
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
      } else {
        console.error('Login failed:', String(error));
      }
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data || error.message);
      } else {
        console.error('Registration failed:', String(error));
      }
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    token.value = '';
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    user.value = null;
  };

  return {
    token,
    user,
    login,
    register,
    logout,
  };
});
