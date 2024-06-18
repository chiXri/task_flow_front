<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter desde vue-router
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const router = useRouter(); // Define el router

    const handleLogin = async () => {
      try {
        await authStore.login(username.value, password.value);
        // Redirigir a la página principal después de iniciar sesión
        router.push('/');
      } catch (error) {
        console.error('Login failed');
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
/* Añade tus estilos aquí */
</style>
