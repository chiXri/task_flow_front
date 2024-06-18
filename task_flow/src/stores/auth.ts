// stores/auth.ts
import { defineStore } from 'pinia';
import { isAxiosError } from 'axios'; // Importa axios y isAxiosError directamente desde 'axios'
import axiosInstance from '../config/axiosConfig'; // Importa tu configuración de Axios
import { ref } from 'vue';

interface User {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { username, password });
      token.value = response.data;
      localStorage.setItem('token', token.value);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
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
      const response = await axiosInstance.post('/api/auth/register', { username, password });
      return response.data; // Devuelve la respuesta del backend
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
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return {
    token,
    user,
    login,
    register,
    logout,
  };
});
