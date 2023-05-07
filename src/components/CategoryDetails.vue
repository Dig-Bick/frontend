<template>
  <div>
    <h2>{{ category.name }} 帖子列表</h2>
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
};
</script>
