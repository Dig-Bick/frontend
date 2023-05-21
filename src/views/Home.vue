<template>
  <el-container class="dark-souls-container" direction="vertical">
    <!-- Search Box -->
    <el-header class="dark-souls-header">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button type="primary" @click="goToUserMsg" size="small" class="dark-souls-button">个人信息</el-button>
        </el-col>
        <el-col :span="20">
          <el-form @submit.native.prevent="searchPosts" inline>
            <el-row :gutter="10">
              <el-col :span="22">
                <el-input v-model="searchQuery" placeholder="Search for posts..." size="small" class="dark-souls-input" />
              </el-col>
              <el-col :span="2" class="search-button-col">
                <el-button type="primary" @click="searchPosts" size="small" class="dark-souls-button">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <!-- Categories -->
    <el-main>
      <category-list></category-list>
    </el-main>
    <!-- Main Content -->
    <el-main>
      <el-row :gutter="20">
        <!-- Recommended Posts -->
        <el-col :span="16">
          <el-card class="dark-souls-card">
            <div slot="header" class="dark-souls-card-header">
              <span class="dark-souls-card-title">推荐帖子</span>
            </div>
            <el-table
              :data="displayedRecommendedPosts"
              style="width: 100%"
              @row-click="postClicked"
              class="dark-souls-table"
            >
              <el-table-column prop="title" label="Title" />
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="recommendedPosts.length"
              class="dark-souls-pagination"
            ></el-pagination>
          </el-card>
        </el-col>
        <!-- Search Results and Notifications -->
         <el-col :span="8">

    <el-table
      :data="displayedPosts"
      style="width: 100%"
      border
      @row-click="postClicked"
      class="dark-souls-table"
    >
      <el-table-column prop="title" label="搜索结果" />
    </el-table>
    <el-pagination
      @size-change="handleSearchSizeChange"
      @current-change="handleSearchCurrentChange"
      :current-page="searchCurrentPage"
      :page-size="searchPageSize"
      layout="total, prev, pager, next"
      :total="posts.length"
      class="dark-souls-pagination"
    ></el-pagination>
    <notification-list v-if="userId"></notification-list>
          <el-button v-if="userId" @click="goToUserPosts" type="success" class="user-posts-button dark-souls-button"
            >我的发布</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.dark-souls-container {
  background-color: #7b7676;
  color: #ff0000;
}

.dark-souls-header {
  background-color: #222;
  padding: 10px;
}

.dark-souls-input {
  width: 200px;
}

.search-button-col {
  text-align: right;
}

.dark-souls-button {
  width: 60px;
}

.dark-souls-card {
  background-color: #333;
  color: #fca6a6;
  border-color: #666;
}

.dark-souls-card-header {
  background-color: #555;
  padding: 10px;
}

.dark-souls-card-title {
  color: #ffffff;
}

.dark-souls-table {
  background-color: #444;
  color: #000000;
}

.dark-souls-pagination {
  margin-top: 20px;
}

.dark-souls-search-results {
  color: #ffffff;
  margin-bottom: 10px;
}

.user-posts-button {
  margin-top: 20px;
}
</style>



<script>
import axios from "axios";
import CategoryList from "@/components/CategoryList.vue";
import NotificationList from "@/components/NotificationList.vue";
import { ElPagination } from 'element-plus';

export default {
  components: {
    CategoryList,
    NotificationList,
    ElPagination
  },
  data() {
    return {
      recommendedPosts: [],
      userId: this.$store.state.userId,
      searchQuery: "",
      posts: [],
      categories: [],
      currentPage: 1,
      pageSize: 8,
      searchCurrentPage: 1,
      searchPageSize: 3,
    };
  },
  computed: {
    displayedRecommendedPosts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.recommendedPosts.slice(start, end);
    },
    displayedPosts() {
      const start = (this.searchCurrentPage - 1) * this.searchPageSize;
      const end = start + this.searchPageSize;
      return this.posts.slice(start, end);
    },
  },
  async mounted() {
    if (this.$store.state.userId && this.$store.state.token) {
      console.log('Fetching recommended posts...');
      await this.fetchRecommendedPosts();
      await this.fetchCategories();
    } else {
      console.log('User not logged in, not fetching recommended posts.');
    }
  },
  methods: {
    async fetchRecommendedPosts() {
      try {
        const response = await this.$http.get("/api/posts/recommended", {
          params: { userId: this.$store.state.userId },
          headers: { Authorization: "Bearer " + this.$store.state.token },
        });
        this.recommendedPosts = response.data;
      } catch (error) {
        console.error("Error fetching recommended posts: ", error);

      }
    },
    async fetchCategories() {
      try {
        //const response = await this.$http.get("/api/categories");
        //this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    },
    goToUserPosts() {
         this.$router.push(`/user/${this.userId}/posts`);
    },
    searchPosts() {
        axios
            .get("http://localhost:8080/api/posts/search", {
                params: { query: this.searchQuery },
            })
            .then((response) => {
                this.posts = response.data;
            })
            .catch((error) => {
                console.error("Error searching posts:", error);
            });
    },
    categoryClicked(category) {
        // 根据你的路由配置，这里可能需要进行修改
        this.$router.push(`/categories/${category.id}`);
    },
    postClicked(post) {
        // 根据你的路由配置，这里可能需要进行修改
        this.$router.push(`/posts/${post.postId}`);
    },
    handleSizeChange(val) {
        this.pageSize = val;
    },
    handleCurrentChange(val) {
        this.currentPage = val;
    },
    handleSearchSizeChange(val) {
      this.searchPageSize = val;
    },
    handleSearchCurrentChange(val) {
      this.searchCurrentPage = val;
    },
      goToUserMsg() {
    this.$router.push('/usermsg');
  },
  },
};
</script>


