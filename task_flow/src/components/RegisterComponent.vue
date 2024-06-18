<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const router = useRouter(); // Define el router

    const handleRegister = async () => {
      try {
        const response = await authStore.register(username.value, password.value);
        console.log('Registration successful:', response); // Log de éxito
        router.push('/login'); // Redirigir al inicio de sesión
      } catch (error) {
        console.error('Registration failed');
      }
    };
    

    return {
      username,
      password,
      handleRegister,
    };
  },
});
</script>

<style scoped>
/* Añade tus estilos aquí */
</style>
