<template>
  <div class="calendar-wrapper">
    <vue-cal
      :time-from="6 * 60"
      :time-to="25 * 60"
      :time-step="60"
      @cell-click="onCellClick"
      v-model="events"
      :hide-weekends="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'vue-cal/dist/vuecal.css';
import VueCal from 'vue-cal';

interface Event {
  title: string;
  start: Date;
  end: Date;
  category: string;
}

const events = ref<Event[]>([]);

const onCellClick = (day: any) => {
  const category = prompt("Ingrese la categoría (Bienestar, Productividad):");
  const newEvent = {
    title: 'Nuevo Evento',
    start: day.date,
    end: day.date,
    category: category || 'Otros'
  };
  events.value.push(newEvent);
};
</script>

<style scoped>
.calendar-wrapper {
  height: 98%;
  width: 100%;
  margin-bottom: 20px;
  color: black;
  overflow-y: auto; /* Permite el scroll vertical en el contenedor del calendario */
}
</style>

<style>
/* Estilos globales que afectan a vue-cal */
.vuecal__flex.vuecal__menu {
  background: linear-gradient(135deg, #c4f9e2, #d4f1f9);
  color: black; /* Cambia #textColor por el color del texto que deseas usar */
}
.vuecal__title-bar{
  background-color: rgb(192, 238, 247); /* Cambia #color por el color que deseas usar */
}
</style>
