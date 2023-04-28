import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ItemsView from "../views/ItemsView.vue";
import ItemView from "../views/ItemView";
import NewItem from "../views/NewItem";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
    meta: {
      requiresVisitor: true,
    },
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashboardView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/items",
    name: "items",
    component: ItemsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/items/:id",
    name: "item",
    component: ItemView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/new_item",
    name: "new item",
    component: NewItem,
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
