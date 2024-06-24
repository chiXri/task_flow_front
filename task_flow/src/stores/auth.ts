import { defineStore } from 'pinia';
import { isAxiosError } from 'axios';
import axios from '../config/axiosConfig';
import { ref } from 'vue';



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
        throw new Error(error.response?.data || error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data || error.message);
      } else {
        throw new Error(String(error));
      }
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
