import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000"; // Development

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.config.globalProperties.$http = axios;
appInstance.mount("#app");
