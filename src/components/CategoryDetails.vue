<template>
  <div>
    <h2>{{ category.name }} 帖子列表</h2>
    <div>
      <h3>发表新帖子</h3>
      <form @submit.prevent="createPost">
        <label>
          标题:
          <input type="text" v-model="newPost.title" required />
        </label>
        <br />
        <label>
          内容:
          <textarea v-model="newPost.content" required></textarea>
        </label>
        <br />
        <button type="submit">发表</button>
      </form>
    </div>
    <ul>
      <li v-for="post in posts" :key="post.postId">
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

