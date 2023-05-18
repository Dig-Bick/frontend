<template>
  <div class="dark-souls-container">
    <h2 class="dark-souls-header">{{ category.name }} 帖子列表</h2>

    <el-table :data="posts" style="width: 100%" @row-click="postClicked" class="dark-souls-table">
      <el-table-column prop="title" label="标题" />
    </el-table>

    <div class="dark-souls-card">
      <h3>发表新帖子</h3>
      <el-form @submit.native.prevent="createPost">
        <el-form-item label="标题">
          <el-input v-model="newPost.title" placeholder="请输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="newPost.content" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="createPost">发表</el-button>
      </el-form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      posts: [],
      category: {},
      newPost: {
        title: "",
        content: "",
      },
    };
  },
  async created() {
    console.log("Category ID:", this.categoryId);
    try {
      const [postsResponse, categoryResponse] = await Promise.all([
        this.$http.get(`/categories/${this.categoryId}/posts`),
        this.$http.get(`/categories/${this.categoryId}`),
      ]);

      this.posts = postsResponse.data;
      this.category = categoryResponse.data;
    } catch (error) {
      console.error(error);
    }
      if (this.posts.length > 0) {
      console.log("First post data:", this.posts[0]);
    }
  },
  methods: {
    postClicked(post) {
      this.$router.push(`/posts/${post.postId}`);
    },
    async createPost() {
      const userId = localStorage.getItem("userId");
      console.log(localStorage.getItem("token"), localStorage.getItem("userId"))
      try {
        const response = await this.$http.post("/api/posts", {
          ...this.newPost,
          userId: userId,
          categoryId: this.categoryId,
        });
        this.posts.unshift(response.data);
        this.newPost.title = "";
        this.newPost.content = "";
        alert("发帖成功");
      } catch (error) {
        console.error(error);
        alert("发帖失败");
      }
    },
  },
};
</script>


<style scoped>
.dark-souls-container {
  background-color: #7b7676;
  color: #ff0000;
  padding: 20px;
}

.dark-souls-header {
  background-color: #222;
  padding: 10px;
  text-align: center;
  color: #ffffff;
}

.dark-souls-card {
  background-color: #333;
  color: #fca6a6;
  border-color: #666;
  margin-top: 20px;
  padding: 20px;
}

.dark-souls-table {
  background-color: #444;
  color: #000000;
  margin-top: 20px;
}

.dark-souls-table th, .dark-souls-table td {
  color: #fff;
  border-color: #555;
}

.el-form-item__label {
  color: #fff;
}

.el-input__inner, .el-button {
  background-color: #555;
  color: #fff;
}
</style>
