<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-4">
      <h2>Welcome, {{ this.$store.state.currentUser.name }}!</h2>
      <button class="btn btn-primary" @click="moveToNewItem">Add Items</button>
    </div>
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card bg-light shadow">
          <div class="card-body">
            <h5 class="card-title text-secondary">Total Products</h5>
            <p class="card-text display-4 text-primary">
              {{ this.$store.state.stats.total_products }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-light shadow">
          <div class="card-body">
            <h5 class="card-title text-secondary">Total Sales</h5>
            <p class="card-text display-4 text-primary">
              {{ this.$store.state.stats.total_sales }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-light shadow">
          <div class="card-body">
            <h5 class="card-title text-secondary">Most Sold Product</h5>
            <p class="card-text display-4 text-primary">
              {{ this.$store.state.stats.most_sold_product }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-light shadow">
          <div class="card-body">
            <h5 class="card-title text-secondary">Least Sold Product</h5>
            <p class="card-text display-4 text-primary">
              {{ this.$store.state.stats.least_sold_product }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    moveToNewItem() {
      this.$router.push("/new_item");
    },
  },
  created() {
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getStats");
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  margin-top: -20px;
  left: 10%;
  padding: 4rem 4rem;
}
h2 {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}
</style>
