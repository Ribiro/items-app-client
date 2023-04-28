<template>
  <div class="container">
    <div v-if="successful" class="alert alert-success" role="alert">
      Item Updated Successfully!
    </div>
    <span style="display: inline-block">
      <a href="/items"><h2 class="mb-4">Items /</h2></a>
    </span>
    <span style="display: inline-block">
      <h2 class="mb-4">&nbsp;Edit Item</h2>
    </span>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
          placeholder="Enter name"
        />
      </div>
      <div class="form-group">
        <label for="name">Price</label>
        <input
          type="number"
          class="form-control"
          id="name"
          v-model="price"
          required
          placeholder="Enter price"
        />
      </div>
      <div class="form-group">
        <label for="name">Sales</label>
        <input
          type="number"
          class="form-control"
          id="name"
          v-model="sales"
          required
          placeholder="Enter number of sales"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="description"
          required
          placeholder="Enter description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input
          type="file"
          class="form-control-file"
          id="image"
          required
          @change="handleFileUpload"
        />
        <img :src="this.image" :alt="this.name" width="100" />
      </div>
      <div class="row" v-if="!confirmDelete">
        <div class="col">
          <button type="submit" class="btn btn-primary mt-4">
            Update Details
          </button>
        </div>
        <div class="col d-flex justify-content-end">
          <button
            @click="confirmDelete = !confirmDelete"
            type="button"
            class="btn btn-danger mt-4"
          >
            Delete Item
          </button>
        </div>
      </div>
      <div class="row" v-if="confirmDelete">
        <div class="col">
          <button
            @click="confirmDelete = !confirmDelete"
            type="button"
            class="btn btn-success mt-4"
          >
            Cancel Delete
          </button>
        </div>
        <div class="col d-flex justify-content-end">
          <button @click="deleteItem" type="button" class="btn btn-danger mt-4">
            Confirm Delete
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      sales: "",
      image: null,
      confirmDelete: false,
      successful: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    submitForm() {
      this.successful = false;
      this.$store
        .dispatch("updateItem", {
          name: this.name,
          price: this.price,
          total_sales: this.sales,
          description: this.description,
          image: this.image,
        })
        .then(() => {
          console.log("Item added successfully");
          this.successful = true;
          (this.name = ""), (this.description = ""), (this.image = "");
        })
        .catch(() => {
          console.log("Error adding item");
        });
    },
    deleteItem() {
      this.$store
        .dispatch("deleteItem")
        .then(() => {
          this.$router.push("/items/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$store
      .dispatch("getSingleItem", this.$route.params.id)
      .then((response) => {
        this.name = response.data.name;
        this.price = response.data.price;
        this.sales = response.data.total_sales;
        this.description = response.data.description;
        this.image = response.data.image;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  margin-top: -20px;
  left: 0;
  padding: 4rem 4rem;
}

.form-group {
  margin-bottom: 2rem;
}

form {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

input[type="file"] {
  border: none;
  padding: 0;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}
</style>
