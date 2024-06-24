import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto a la URL de tu backend
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
