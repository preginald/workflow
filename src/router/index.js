import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Test from '../views/Test.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Test.vue'),
  },
  {
    path: '/:userName',
    component: User,
  },
  {
    path: '/:userName/:docSlug',
    component: Test,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
