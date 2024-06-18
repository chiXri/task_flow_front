<template>
  <div class="login-container">
    <div class="card-3d-wrapper" :class="{ flipped: isRegisterMode }">
      <div class="login-box card">
        <h2>TaSk</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username</label>
            <input v-model="username" type="text" id="username" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" />
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <div class="toggle-switch-container">
        <label for="toggle-switch-login">Don't have an account?</label>
          <div class="toggle-switch">
            <input type="checkbox" id="toggle-switch-login" @change="toggleRegisterMode" :checked="isRegisterMode">
            <span class="slider"></span>
          </div>
        </div>
      </div>
      <RegisterModalComponent @close="toggleRegisterMode" v-if="isRegisterMode" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import RegisterModalComponent from './RegisterModalComponent.vue';

export default defineComponent({
  components: {
    RegisterModalComponent,
  },
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const isRegisterMode = ref(false);

    const handleLogin = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push('/home');
      } catch (error) {
        console.error('Login failed');
      }
    };

    const toggleRegisterMode = () => {
      isRegisterMode.value = !isRegisterMode.value;
    };

    return {
      username,
      password,
      handleLogin,
      isRegisterMode,
      toggleRegisterMode,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  background: url('../assets/img/primary_img.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  perspective: 1000px;
}

.card-3d-wrapper {
  width: 350px;
  height: 450px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card-3d-wrapper.flipped {
  transform: rotateY(180deg);
}

.card {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

.login-box {
  z-index: 2;
}

.register-box {
  transform: rotateY(180deg);
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button, .register-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

.login-button:hover, .register-button:hover {
  background-color: #0056b3;
}

.toggle-switch-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}.toggle-switch-container label {
  color: black;
}

.toggle-switch {
  position: relative;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
