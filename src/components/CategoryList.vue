<template>
  <div>
    <h2>板块列表</h2>
    <ul>
      <li v-for="category in categories" :key="String(category.id)">
        <router-link :to="{ name: 'category-details', params: { id: String(category.id) } }">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    try {
      const response = await this.$http.get("/categories/all");
      this.categories = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
