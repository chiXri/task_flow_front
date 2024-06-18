import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto a la URL de tu backend
});

export default instance;
