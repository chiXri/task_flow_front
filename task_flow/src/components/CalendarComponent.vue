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
import { ref, onMounted } from 'vue';
import 'vue-cal/dist/vuecal.css';
import VueCal from 'vue-cal';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSpacer, VSelect, VSnackbar } from 'vuetify/components';
import { useTaskStore } from '@/stores/task';
import { useAuthStore } from '@/stores/auth';
import axios  from 'axios';

const events = ref<CalendarEvent[]>([]);
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

const taskStore = useTaskStore();
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.user && authStore.user.id) {
    try {
      await taskStore.fetchTasks(authStore.user.id);
      events.value = taskStore.tasks.map(task => ({
        start: new Date(task.startTime),
        end: new Date(task.endTime),
        title: `<b>${task.category}</b><br>${task.title}`,
        category: task.category,
        class: `vuecal__event-category-${task.category}`
      }));
    } catch (error) {
      console.error('Error fetching tasks on mount:', error);
    }
  }
});

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
const saveEvent = async () => {
  try {
    if (selectedCellDate.value && selectedTask.value && selectedSubTask.value) {
      console.log('Saving event with:', { selectedCellDate, selectedTask, selectedSubTask });
      
      const start = new Date(selectedCellDate.value);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      const newTask: Task = {
        id: 0, // O lo que sea apropiado para una nueva tarea
        title: selectedSubTask.value!,
        description: '', // Puedes agregar más detalles aquí
        category: selectedTask.value!,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        user: { id: authStore.user!.id } // Asignar el usuario autenticado
      };

      console.log('New task to save:', newTask);

      const savedTask: Task = await taskStore.saveTask(newTask);
      console.log('Saved task:', savedTask);

      events.value.push({
        start: new Date(savedTask.startTime),
        end: new Date(savedTask.endTime),
        title: `<b>${savedTask.category}</b><br>${savedTask.title}`,
        category: savedTask.category,
        class: `vuecal__event-category-${savedTask.category}`
      });

      selectedTask.value = null;
      selectedSubTask.value = null;
      subTaskDialog.value = false;
    } else {
      console.error('Missing data for saving event:', { selectedCellDate, selectedTask, selectedSubTask });
      errorMessage.value = 'Datos incompletos para guardar el evento.';
      showErrorSnackbar.value = true;
    }
  } catch (error) {
    // Verifica si el error es de tipo AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Error saving event:', error.response?.data || error.message);
      errorMessage.value = `Error guardando el evento: ${error.response?.data?.message || error.message}`;
    } else {
      // Si el error no es de Axios, maneja otro tipo de error
      console.error('Error saving event:', (error as Error).message);
      errorMessage.value = `Error guardando el evento: ${(error as Error).message}`;
      console.error(`Error guardando el evento: ${(error as Error).message}`);
    }
    showErrorSnackbar.value = true;
  }
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
.vuecal__event {
  font-size: 0.75rem;
}

/* Estilos globales que afectan a vue-cal */
.vuecal__flex.vuecal__menu {
  background: linear-gradient(135deg, #c4f9e2, #d4f1f9);
  color: black; /* Cambia #textColor por el color del texto que deseas usar */
}
.vuecal__title-bar {
  background-color: rgb(192, 238, 247); /* Cambia #color por el color que deseas usar */
}

/* Ajustar la altura de las filas */

/* Asignar colores pasteles a los eventos según la categoría */
.vuecal__event-category-Bienestar {
  background-color: #FFD1DC; /* Rosa pastel */
  color: black;
}
.vuecal__event-category-Ocio {
  background-color: #FFECB3; /* Amarillo pastel */
  color: black;
}
.vuecal__event-category-Productividad {
  background-color: #BBDEFB; /* Azul pastel */
  color: black;
}
.vuecal__event-category-Tareas {
  background-color: #C8E6C9; /* Verde pastel */
  color: black;
}
</style>
