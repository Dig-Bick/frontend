<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.commentId">
        <strong>{{ comment.username }}</strong>: {{ comment.content }}
        <reply-form :postId="postId" :commentId="comment.commentId"></reply-form>
      </li>
    </ul>
    <div class="comment-form">
      <h4>Add a comment</h4>
      <textarea v-model="newComment" rows="3"></textarea>
      <button @click="submitComment">Submit</button>
    </div>
  </div>
</template>

<script>
import ReplyForm from "./ReplyForm.vue";
export default {
  components: {
    ReplyForm,
  },
  props: ["postId"],
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  methods: {
    async fetchComments() {
        try {
            const response = await this.$http.get(`/api/comments/${this.postId}`);
            this.comments = response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            this.$message.error("Error fetching comments.");
        }
    },
    async submitComment() {
      if (!this.newComment) {
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.$message.error("Please log in to comment.");
        return;
      }

      try {
        await this.$http.post("/api/comments", {
          postId: this.postId,
          userId,
          content: this.newComment,
        });
        this.newComment = "";
        await this.fetchComments(); // 添加这一行
      } catch (error) {
        console.error("Error submitting comment:", error);
        this.$message.error("Error submitting comment.");
      }
    },
  },
  watch: {
    postId: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal && newVal !== undefined) {
          this.fetchComments();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.comment-form {
  margin-top: 1rem;
}
</style>
