import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '../src/assets/main.css'; // Importar el archivo CSS


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
