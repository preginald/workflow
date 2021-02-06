import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/new",
    name: "CreateDoc",
    component: () => import(/* webpackChunkName: "new" */ "../views/Doc.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/commands/:commandSlug",
    name: "ReadCommand",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/Command.vue"),
  },
  {
    path: "/test/:userName/:docSlug",
    name: "TestDoc",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/TestDoc.vue"),
  },
  {
    path: "/:userName",
    name: "UserHome",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
  },
  {
    path: "/:userName/:docSlug",
    name: "ReadDoc",
    component: () => import(/* webpackChunkName: "test" */ "../views/Doc.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
