<template>
  <div>
    <h2>Recommended Posts</h2>
    <ul>
      <li v-for="post in recommendedPosts" :key="post.post_id">
        {{ post.title }}
      </li>
    </ul>
    <h2>Categories</h2>
    <category-list></category-list>
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
    };
  },
  async mounted() {
    if (this.$store.state.user && this.$store.state.user.id) {
      this.fetchRecommendedPosts();
    }
  },
  methods: {
    async fetchRecommendedPosts() {
      try {
        const response = await axios.get("/api/posts/recommended", {
          params: { userId: this.$store.state.user.id },
          headers: { Authorization: "Bearer " + this.$store.state.user.token },
        });
        this.recommendedPosts = response.data;
      } catch (error) {
        console.error("Error fetching recommended posts: ", error);
      }
    },
  },
};
</script>
