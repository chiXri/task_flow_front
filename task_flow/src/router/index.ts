import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterModalComponent.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' }  // Redirige cualquier ruta no definida a /login
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
