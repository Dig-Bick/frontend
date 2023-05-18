<template>
  <div class="dark-theme">
    <h2>我的发布</h2>
    <div v-for="post in posts" :key="post.postId" class="post-item">
      <h3>{{ post.title }}</h3>
      <comment-section :postId="post.postId" :showForm="false" />
      <el-button class="dark-theme-button">查看帖子详情</el-button>
      <el-button class="dark-theme-button" @click="deletePost(post.postId)">删除帖子</el-button>
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
<style scoped>
.dark-theme {
  background-color: #524d4d;
  color: #fff;
}

.post-item {
  border-bottom: 1px solid #666;
  padding: 1rem 0;
}

.dark-theme-button {
  background-color: #555;
  border-color: #666;
  color: #fff;
}
</style>