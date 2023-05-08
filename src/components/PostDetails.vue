<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="post-actions">
      <button @click="toggleLike" class="like-button">
        {{ isLiked ? '取消点赞' : '点赞' }}
      </button>
      <span>{{ likeCount }} 赞</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
