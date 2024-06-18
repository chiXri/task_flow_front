// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import HomeView from '../views/HomeView.vue'; // Asegúrate de importar HomeView correctamente

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
