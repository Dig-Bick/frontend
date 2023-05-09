<template>
  <div>
    <h2>Recommended Posts</h2>
    <ul>
      <li v-for="post in recommendedPosts" :key="post.post_id">
        <router-link :to="{ name: 'post-details', params: { id: post.postId } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <h2>Categories</h2>
    <category-list></category-list>
    <button v-if="userId" @click="goToUserPosts">View Your Posts</button>
  </div>


</template>

<script>
import axios from "axios";
import CategoryList from "@/components/CategoryList.vue";


export default {
  components: {
    CategoryList,
  },
  data() {
    return {
      recommendedPosts: [],
      userId: this.$store.state.userId,
    };
  },
  async mounted() {
    if (this.$store.state.userId && this.$store.state.token) {

      console.log('Fetching recommended posts...'); // 添加调试输出
      await this.fetchRecommendedPosts();
    } else {
      console.log('User not logged in, not fetching recommended posts.'); // 添加调试输出
    }
  }
,
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
    goToUserPosts() {
      this.$router.push(`/user/${this.userId}/posts`);
    },
  },
};
</script>
