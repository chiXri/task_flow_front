<template>
  <div class="home-view">
    <div class="header">
      <h1>FRASES</h1>
    </div>
    <div class="main-content">
      <div class="sidebar-left">
        <ClockWidgetComponent />
        <StatsWidgetComponent title="BIENESTAR" content="0" />
   
      </div>
      <div class="calendar-container">
        <CalendarComponent />
      </div>
      <div class="sidebar-right">
        <WeatherWidgetComponent />
        <StatsWidgetComponent title="PRODUCTIVIDAD" content="0" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClockWidgetComponent from '@/components/ClockWidgetComponent.vue';
import StatsWidgetComponent from '@/components/StatsWidgetComponent.vue';
import WeatherWidgetComponent from '@/components/WeatherWidgetComponent.vue';
import CalendarComponent from '@/components/CalendarComponent.vue';
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;

}

.header {
  height: 80px;
  display: flex; /* Utilizar flexbox */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  text-align: center;
  margin-top: 5px;
  color: white;
  font-size: 1.4rem;
}
.main-content {
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100vh - 60px); /* Ajusta la altura restante */
  margin-top: 20px;
}

.sidebar-left,
.sidebar-right {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  color: white;

}

.calendar-container {
  width: 80%;
  height: 90%;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco semi-transparente */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>
