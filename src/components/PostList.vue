<template>
  <div class="dark-souls-container">
    <h2>帖子列表</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post-details', params: { id: post.postId } }" class="dark-souls-link">
          {{ post.title }}
        </router-link>
        <span class="dark-souls-like">点赞数量: {{ post.likeCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    try {
      const response = await this.$http.get("/api/posts");
      this.posts = response.data;
    } catch (error) {
      console.error(error);
    }
    if (this.posts.length > 0) {
      console.log("First post data:", this.posts[0]);
    }
  },
};
</script>

<style scoped>
.dark-souls-container {
  background-color: #111;
  color: #fff;
  padding: 20px;
}

.dark-souls-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.dark-souls-link {
  color: #fff;
  text-decoration: none;
}

.dark-souls-link:hover {
  color: #aaa;
}

.dark-souls-like {
  color: #aaa;
}
</style>
