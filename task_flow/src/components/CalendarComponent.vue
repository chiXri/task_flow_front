<template>
  <div class="calendar-wrapper">
    <vue-cal
      :time-from="6 * 60"
      :time-to="25 * 60"
      :time-step="60"
      @cell-click="onCellClick"
      v-model:events="events"
      :hide-weekends="true"
      :time="true"
      :title-html="true"
    />
  </div>

  <!-- Dialogo para seleccionar Task -->
  <v-dialog v-model="taskDialog" max-width="500px">
    <v-card>
      <v-card-title>
        Selecciona una Tarea
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedTask"
          :items="tasks"
          label="Tarea"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="closeTaskDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="openSubTaskDialog">Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialogo para seleccionar SubTask -->
  <v-dialog v-model="subTaskDialog" max-width="500px">
    <v-card>
      <v-card-title>
        Selecciona una actividad
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedSubTask"
          :items="subTasks"
          label="actividad"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="closeSubTaskDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="saveEvent">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar para mensajes de error -->
  <v-snackbar v-model="showErrorSnackbar" color="red" :timeout="3000">
    {{ errorMessage }}
    <v-btn color="white" @click="showErrorSnackbar = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'vue-cal/dist/vuecal.css';
import VueCal from 'vue-cal';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSpacer, VSelect, VSnackbar } from 'vuetify/components';

interface Event {
  title: string;
  start: Date;
  end: Date;
  category: string;
}

const events = ref<Event[]>([]);
const tasks = ref(['Bienestar', 'Ocio', 'Productividad', 'Tareas']);
const subTasksMapping = {
  'Bienestar': ['Ejercicio', 'Meditación'],
  'Ocio': ['Película', 'Juego'],
  'Productividad': ['Trabajo', 'Trabajo Remoto'],
  'Tareas': ['Compras', 'Limpieza']
};

const selectedTask = ref<string | null>(null);
const selectedSubTask = ref<string | null>(null);
const subTasks = ref<string[]>([]);

const taskDialog = ref(false);
const subTaskDialog = ref(false);
const selectedCellDate = ref<Date | null>(null);

const showErrorSnackbar = ref(false);
const errorMessage = ref('');

const onCellClick = (day: any) => {
  const now = new Date();
  const clickedDate = new Date(day);

  if (isNaN(clickedDate.getTime())) {
    errorMessage.value = 'Fecha seleccionada no es válida.';
    showErrorSnackbar.value = true;
    console.error('Invalid clicked date:', day);
    return;
  }
  if (clickedDate < now) {
    errorMessage.value = 'Lo sentimos, no puede modificar fechas anteriores.';
    showErrorSnackbar.value = true;
    return;
  }

  // Redondear la fecha hacia abajo a la hora más cercana
  clickedDate.setMinutes(0, 0, 0);
  selectedCellDate.value = clickedDate;

  selectedTask.value = null;
  selectedSubTask.value = null;
  subTasks.value = [];
  taskDialog.value = true;
};

const closeTaskDialog = () => {
  taskDialog.value = false;
};

const openSubTaskDialog = () => {
  if (selectedTask.value) {
    subTasks.value = subTasksMapping[selectedTask.value];
    taskDialog.value = false;
    subTaskDialog.value = true;
  }
};

const closeSubTaskDialog = () => {
  subTaskDialog.value = false;
};

const saveEvent = () => {
  if (selectedCellDate.value && selectedTask.value && selectedSubTask.value) {
    const start = new Date(selectedCellDate.value);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const newEvent = {
      title: `<b>${selectedTask.value}</b><br>${selectedSubTask.value}`,
      start,
      end,
      category: selectedTask.value
    };
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errorMessage.value = 'Las fechas del evento no son válidas.';
      showErrorSnackbar.value = true;
      console.error('Invalid event dates:', { start, end });
      return;
    }
    events.value.push(newEvent);
    selectedTask.value = null;
    selectedSubTask.value = null;
  }
  subTaskDialog.value = false;
};
</script>

<style scoped>
.calendar-wrapper {
  height: 94%;
  width: 100%;
  margin-bottom: 20px;
  color: black;
  overflow-y: auto; /* Permite el scroll vertical en el contenedor del calendario */
}
</style>

<style>

.vuecal__event{
  font-size: 0.75rem;}

/* Asegurarse de que los eventos ocupen solo la celda correspondiente */

/* Estilos globales que afectan a vue-cal */
.vuecal__flex.vuecal__menu {
  background: linear-gradient(135deg, #c4f9e2, #d4f1f9);
  color: black; /* Cambia #textColor por el color del texto que deseas usar */
}
.vuecal__title-bar {
  background-color: rgb(192, 238, 247); /* Cambia #color por el color que deseas usar */
}

/* Ajustar la altura de las filas */



</style>
