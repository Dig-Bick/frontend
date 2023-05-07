<template>
  <div>
    <h2>帖子列表</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post-details', params: { id: post.postId } }">
          {{ post.title }}
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
