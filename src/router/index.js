import { createRouter, createWebHistory } from 'vue-router';
import ListaDeCompras from '../components/ListaDeCompras.vue';
import EdicaoLista from '../components/EdicaoLista.vue';

const routes = [
  {
    path: '/',
    name: 'ListaDeCompras',
    component: ListaDeCompras,
  },
  {
    path: '/edicao/:id',
    name: 'EdicaoLista',
    component: EdicaoLista,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
