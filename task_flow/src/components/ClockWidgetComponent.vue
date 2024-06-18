<template>
  <div class="clock-widget">
    <p class="date">{{ currentDate }}</p>
    <p class="time">{{ currentTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentTime = ref(new Date().toLocaleTimeString());
const currentDate = ref(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

const updateClock = () => {
  currentTime.value = new Date().toLocaleTimeString();
  currentDate.value = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(() => {
  setInterval(updateClock, 1000);
});
</script>

<style scoped>
.clock-widget {
  width: 90%;
  align-self: center;
  height: 110px;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  background: url('../assets/img/clock.jpg');
  background-size:cover; 
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial, sans-serif';
  color: #ffffff;
}  

.clock-widget h3, 
.clock-widget .date, 
.clock-widget .time {
  text-shadow: 2px 2px 4px #77b5f6;
}

.clock-widget h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #007BFF;
}

.clock-widget .date {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #000000;
  font-weight: bold;
  text-transform: uppercase; /* Transformar a mayúsculas */
}

.clock-widget .time {
  font-size: 1.3rem;
  font-weight: bold;
  color: #484848;
}
</style>
