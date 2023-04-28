<template>
  <div class="container">
    <div v-if="successful" class="alert alert-danger" role="alert">
      Email already exists!
    </div>
    <form @submit.prevent="register">
      <h2 class="mb-3">Register</h2>
      <div class="input">
        <label for="email">Name</label>
        <input
          class="form-control"
          type="text"
          required
          name="name"
          v-model="name"
          placeholder="Your Name"
        />
      </div>
      <div class="input">
        <label for="email">Email address</label>
        <input
          class="form-control"
          required
          type="text"
          name="email"
          v-model="email"
          placeholder="email@adress.com"
        />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input
          class="form-control"
          type="password"
          required
          name="password"
          v-model="password"
          placeholder="password123"
        />
      </div>

      <div class="alternative-option mt-4">
        Already have an account? <span @click="moveToLogin">Login</span>
      </div>

      <button type="submit" id="register_button" class="mt-4 btn-pers">
        Register
      </button>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_2"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      successful: false,
    };
  },
  methods: {
    register() {
      this.successful = false;
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.successful = true;
          console.log(error);
        });
    },
    moveToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid lightgray;
  padding: 4rem 4rem;
  border-radius: 5px;
  background: #fefefe;
}
</style>
