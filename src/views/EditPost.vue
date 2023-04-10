<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="post.title" />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="post.content"></textarea>
      </div>
      <button type="submit">Update Post</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: "",
      },
    };
  },
  async created() {
    const response = await axios.get(`/api/postManagement/posts/${this.$route.params.postId}`);
    this.post = response.data;
  },
  methods: {
    async updatePost() {
      await axios.put(`/api/postManagement/posts/${this.post.id}`, this.post);
      this.$router.push("/management/post");
    },
  },
};
</script>
