import { createStore } from "vuex";
import axios from "axios";
import VueCookie from "vue-cookie";

export default createStore({
  state: {
    token: VueCookie.get("token") || null,
    items: [],
    singleItem: {},
    currentUser: {},
    stats: {},
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setSingleItems(state, payload) {
      state.singleItem = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setStats(state, payload) {
      state.stats = payload;
    },
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },
  actions: {
    //  Register user
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/users/", {
            name: data.name,
            email: data.email,
            password: data.password,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // login user
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/jwt/create/", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            const token = response.data.access;
            context.commit("retrieveToken", token);
            VueCookie.set("token", token, "1D");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // logout user
    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {
          context.commit("destroyToken");
          VueCookie.delete("token");
          resolve();
        });
      }
    },

    // get current user
    getCurrentUser(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/auth/users/me/")
          .then((response) => {
            context.commit("setCurrentUser", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // add item
    newItem(context, item) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("total_sales", item.total_sales);
      formData.append("description", item.description);
      formData.append("image", item.image);
      return new Promise((resolve, reject) => {
        axios
          .post("/api/item/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // update item
    updateItem(context, item) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("total_sales", item.total_sales);
      formData.append("description", item.description);
      formData.append("image", item.image);
      return new Promise((resolve, reject) => {
        axios
          .put("/api/item/" + this.state.singleItem.id + "/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // get items
    getItems(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/api/item/")
          .then((response) => {
            context.commit("setItems", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get basic stats
    getStats(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/api/item/stats/")
          .then((response) => {
            context.commit("setStats", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getSingleItem(context, id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/api/item/" + id + "/")
          .then((response) => {
            context.commit("setSingleItems", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // delete item
    deleteItem(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/item/" + this.state.singleItem.id + "/")
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
