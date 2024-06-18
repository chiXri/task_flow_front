<template>
  <div class="register-box card">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="input-group">
        <label for="register-username">Username</label>
        <input v-model="registerUsername" type="text" id="register-username" />
      </div>
      <div class="input-group">
        <label for="register-password">Password</label>
        <input v-model="registerPassword" type="password" id="register-password" />
      </div>
      <button type="submit" class="register-button">Register</button>
    </form>
    <div class="toggle-switch-container">
      <label for="toggle-switch-register">Already have an account?</label>
      <div class="toggle-switch">
        <input type="checkbox" id="toggle-switch-register" @change="$emit('close')">
        <span class="slider"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  setup(_, { emit }) {
    const authStore = useAuthStore();
    const registerUsername = ref('');
    const registerPassword = ref('');
    const router = useRouter();

    const handleRegister = async () => {
      try {
        await authStore.register(registerUsername.value, registerPassword.value);
        router.push('/login');
        emit('close');
      } catch (error) {
        console.error('Registration failed');
      }
    };

    return {
      registerUsername,
      registerPassword,
      handleRegister,
    };
  },
});
</script>

<style scoped>
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

.register-button {
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

.register-button:hover {
  background-color: #0056b3;
}

.toggle-switch-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.toggle-switch-container label {
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
