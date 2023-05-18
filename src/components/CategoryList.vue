<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="category in categories" :key="category.categoryId">
        <el-table
          :data="[category]"
          style="width: 100%"
          border
          @row-click="navigateToCategory"
        >
          <el-table-column prop="name" label="板块名称" />
        </el-table>
      </el-col>
    </el-row>
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
  methods: {
    navigateToCategory(row) {
      this.$router.push({
        name: 'category-details',
        params: { categoryId: Number(row.categoryId) }
      });
    }
  },
};
</script>
