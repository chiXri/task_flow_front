<template>
    <div class="weather-widget">
      <h3>{{ location }}</h3>
      <p class="temperature">{{ temperature }}°C</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // Configura tu ubicación y la URL de la API
  const latitude = '40.4168'; // Latitud de Madrid
  const longitude = '-3.7038'; // Longitud de Madrid
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  
  const location = ref('Madrid');
  const temperature = ref(0);
  const description = ref('Loading...');
  
  const fetchWeather = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Añadir esta línea para imprimir los datos de la respuesta
      if (data.current_weather) {
        temperature.value = data.current_weather.temperature;
        description.value = data.current_weather.weathercode;
      } else {
        throw new Error('No weather data found');
      }
    } catch (error) {
      location.value = 'Error loading weather';
      temperature.value = 0;
      description.value = 'Error loading weather';
    }
  };
  
  onMounted(() => {
    fetchWeather();
  });
  </script>
  
  <style scoped>
  .weather-widget {
    width: 90%;
    align-self: center;
    height: 110px;
    border: 1px solid #e0e0e0;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    background: url('../assets/img/sunny.jpg');
    background-size:cover; 
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial, sans-serif';
    color: #333;
  }
  
  .weather-widget h3 {
    font-size: 1.0rem;
    margin-bottom: 0.5rem;
    color: #000;
    font-weight: bold;
    text-transform: uppercase; /* Transformar a mayúsculas */
  }
  
  .weather-widget .temperature {
    font-size: 1.2rem; /* Ajusta el tamaño de la fuente para que coincida con el widget del reloj */
    font-weight: bold;
    color: #2c2c2c;
  }
  </style>
  