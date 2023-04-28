<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-4">
      <h2>Items Records</h2>
      <button class="btn btn-primary" @click="moveToNewItem">
        Add New Item
      </button>
    </div>
    <div class="col-md-6">
      <div class="search-input">
        <i class="fa fa-search"></i>
        <input
          v-model="searchTerm"
          iconDir="left"
          icon="fa fa-search"
          type="text"
          placeholder="Filter With Item Name"
          size="md"
        />
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentData" :key="row.id">
            <td><img :src="row.image" :alt="row.name" width="80" /></td>
            <td>{{ row.name }}</td>
            <td>{{ row.price }}</td>
            <td>{{ row.total_sales }}</td>
            <td>{{ row.description }}</td>
            <td>
              <button
                class="btn btn-sm btn-info mb-2"
                @click="moveToEditItem(row.id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="isFilteredDataEmpty && searchTerm"
        class="d-flex justify-content-center text-secondary mt-4"
        id="loader"
      >
        No Matching Record!
      </div>
      <div
        v-if="isFilteredDataEmpty && !searchTerm"
        class="d-flex justify-content-center text-secondary"
        id="loader"
      >
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <label class="pt-2" style="font-size: 0.7em"
          >Showing {{ currentPage }} out of {{ totalPages }} Pages
          &nbsp;&nbsp;</label
        >
        <nav>
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                v-on:click.prevent="setCurrentPage(currentPage - 1)"
              >
                Previous
              </a>
            </li>
            <li
              class="page-item"
              :class="{ active: page === currentPage }"
              v-for="page in visiblePages"
              :key="page"
            >
              <a
                class="page-link"
                href="#"
                v-on:click.prevent="setCurrentPage(page)"
                >{{ page }}</a
              >
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a
                class="page-link"
                href="#"
                v-on:click.prevent="setCurrentPage(currentPage + 1)"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      currentPage: 1,
      itemsPerPage: 5,
      deleteConfirmation: false,
      deleteAlert: false,
    };
  },
  methods: {
    addNewItem() {
      // logic for adding new item
    },
    editItem() {
      // logic for editing item
    },
    moveToNewItem() {
      this.$router.push("/new_item");
    },
    moveToEditItem(id) {
      this.$router.push("/items/" + id);
    },
    setCurrentPage(page) {
      this.currentPage = page;
      console.log("currentPage: ", this.currentPage);
    },
    setNextPage(page) {
      if (page < this.totalPages) {
        this.currentPage = page + 1;
      }
    },
    setPrevPage(page) {
      if (page !== 1) {
        this.currentPage = page - 1;
      }
    },
  },
  created() {
    this.$store.dispatch("getItems");
  },
  computed: {
    filteredData() {
      return this.$store.state.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
    isFilteredDataEmpty() {
      return this.filteredData.length === 0;
    },
    currentData() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    visiblePages() {
      if (this.totalPages <= 4) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else {
        let start = this.currentPage - 1;
        let end = this.currentPage + 2;
        if (this.currentPage - 1 < 1) {
          start = 1;
          end = 4;
        } else if (this.currentPage + 2 > this.totalPages) {
          start = this.totalPages - 3;
          end = this.totalPages;
        }
        return Array.from({ length: end - start + 1 }, (_, i) => i + start);
      }
    },
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
.table td,
.table th {
  vertical-align: middle;
}

.table img {
  display: block;
  margin: 0 auto;
  max-height: 100px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #117a8b;
  border-color: #10707f;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input i {
  margin-right: 8px;
  color: #777;
}

.search-input input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  margin-right: 8px;
  font-size: 16px;
  color: #333;
  outline: none;
}

.search-input input::placeholder {
  color: #999;
}

.search-input button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-input button:hover {
  background-color: #0069d9;
}
</style>
