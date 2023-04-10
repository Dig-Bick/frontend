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
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.content }}</td>
          <td>
            <button @click="editPost(post)">Edit</button>
            <button @click="deletePost(post.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const response = await axios.get("/api/postManagement/posts");
    this.posts = response.data.records;
  },
  methods: {
    async editPost(post) {
      this.$router.push(`/management/post/edit/${post.id}`); // TODO: Implement the edit functionality
    },
    async deletePost(postId) {
      await axios.delete(`/api/postManagement/posts/${postId}`);
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
  },
};
</script>
