<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    try {
      const response = await this.$http.get(`/api/posts/${this.$route.params.id}`);
      this.post = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
