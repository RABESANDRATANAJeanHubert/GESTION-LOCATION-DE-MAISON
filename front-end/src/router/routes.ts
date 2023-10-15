import { RouteRecordRaw } from 'vue-router';
import LoginLayout from '../layouts/LoginLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LoginLayout,
    children: [
      {
        path: '/',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '/appartement',
        name: 'appartement',
        component: PageLayout,
        children: [
          {
            path: '/appartement',
            name: 'appartement',
            component: () => import('src/pages/AppartementPage.vue'),
          },
          {
            path: '/user-rent',
            name: 'user-rent',
            component: () => import('src/pages/UserRentPagePage.vue'),
          },
          {
            path: '/document',
            component: () => import('pages/DocumentPage.vue'),
          },
          {
            path: '/contact',
            name: 'document',
            component: () => import('pages/ContactPage.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
