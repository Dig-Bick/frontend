<template>
  <div>
    <h1>Post Management</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.postId">
          <td>{{ post.postId }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.content }}</td>
          <td>
            <button @click="editPost(post)">Edit</button>
            <button @click="deletePost(post.postId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from "@/axiosConfig.js";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const response = await this.$http.get("/api/postManagement/posts");
    this.posts = response.data.records;
    console.log("First post data:", this.posts[0]);
  },
  methods: {
    async editPost(post) {
      this.$router.push(`/management/post/edit/${post.postId}`); // TODO: Implement the edit functionality
    },
    async deletePost(postId) {
      await this.$http.delete(`/api/postManagement/posts/${postId}`);
      this.posts = this.posts.filter((post) => post.postId !== postId);
    },
  },
};
</script>
