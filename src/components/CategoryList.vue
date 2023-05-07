<template>
  <div>
    <h2>板块列表</h2>
    <ul>
      <li v-for="category in categories" :key="String(category.categoryId)">
        <router-link :to="{ name: 'category-details', params: { categoryId: Number(category.categoryId) } }">
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
      console.log(response.data);
      // 检查数据
    response.data.forEach((category) => {
      if (typeof category.categoryId !== "number" || isNaN(category.categoryId)) {
        console.error("Invalid category ID:", category.categoryId);
      }
    });
      this.categories = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
