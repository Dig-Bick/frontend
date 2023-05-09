<template>
  <div>
    <h2>Your Posts</h2>
    <div v-for="post in posts" :key="post.postId">
      <h3>{{ post.title }}</h3>
      <comment-section :postId="post.postId" />
      <button @click="deletePost(post.postId)">Delete</button>
    </div>

  </div>
</template>

<script>
import CommentSection from "@/components/CommentSection.vue";

export default {
  components: {
    CommentSection,
  },
  data() {
    return {
      posts: [],
      userId: null,
    };
  },
  methods: {
    async fetchUserPosts() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.$router.push("/");
      } else {
        try {
          const response = await this.$http.get(
            `/api/posts/user/${userId}/posts`
          );
          this.posts = response.data;
        } catch (error) {
          console.error("Error fetching user posts:", error);
          this.$message.error("Error fetching user posts.");
        }
      }
    },
    async deletePost(postId) {
      try {
        await this.$http.delete(`/api/posts/${postId}`);
        await this.fetchUserPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
        this.$message.error("Error deleting post.");
      }
    },
  },
async created() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  if (!userId) {
    this.$router.push("/");
  } else {
    this.userId = userId;
    await this.fetchUserPosts();
  }
},
};
</script>