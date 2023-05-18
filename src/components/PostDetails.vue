<template>
  <div class="dark-souls-container">
    <el-card shadow="always">
      <div slot="header" class="clearfix">
         <span class="dark-souls-title">{{ post.title }}</span>
      </div>
      <h3></h3>
      <div class="text item">
        {{ post.content }}
      </div>
    </el-card>

    <div class="post-actions">
      <el-button type="primary" @click="toggleLike" class="dark-souls-like-button">
        {{ isLiked ? '取消点赞' : '点赞' }}
      </el-button>
      <span class="dark-souls-like-count">{{ likeCount }} 赞</span>
    </div>

    <comment-section :postId="post.postId" :showForm="true" />
  </div>
</template>

<script>
import axios from "axios";
import CommentSection from "@/components/CommentSection.vue";

export default {
  components: {
    CommentSection,
  },
  data() {
    return {
      post: {},
      isLiked: false,
      likeCount: 0,
    };
  },
  methods: {
    async toggleLike() {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }
        const config = {
          params: { userId },
        };
        if (this.isLiked) {
          await this.$http.delete(`/api/posts/${this.post.postId}/like`, config);
          this.isLiked = false;
          this.likeCount--;
        } else {
          await this.$http.post(`/api/posts/${this.post.postId}/like`, { userId }, config);
          this.isLiked = true;
          this.likeCount++;
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    async fetchLikeStatusAndCount() {
      try {
        const userId = localStorage.getItem("userId");
        const { data } = await this.$http.get(
          `/api/posts/${this.post.postId}/like-status`,
          { params: { userId } }
        );
        this.isLiked = data.isLiked;
        this.likeCount = data.likeCount;
      } catch (error) {
        console.error("Error fetching like status and count:", error);
      }
    },
  },
  async created() {
    try {
      const { data } = await this.$http.get(
        `/api/posts/${this.$route.params.id}`
      );
      this.post = data;
      await this.fetchLikeStatusAndCount();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.dark-souls-container {
  background-color: #635d5d;
  color: #fff;
  padding: 20px;
}

.dark-souls-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.dark-souls-like-button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.dark-souls-like-count {
  color: #aaa;
  margin-left: 10px;
}
.dark-souls-title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
