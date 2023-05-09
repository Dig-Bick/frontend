<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <comment-item
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        :postId="postId"
        @reply-created="onReplyCreated"
      ></comment-item>
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
import CommentItem from "./CommentItem.vue";

export default {
  components: {
    ReplyForm,
    CommentItem,
  },
  props: ["postId"],
  data() {
    return {
      comments: [],
      newComment: "",
      replyFormCommentId: null,
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
        await this.fetchComments();
      } catch (error) {
        console.error("Error submitting comment:", error);
        this.$message.error("Error submitting comment.");
      }
    },
    showReplyForm(commentId) {
      this.replyFormCommentId = commentId;
    },
    onReplyCreated() {
      this.replyFormCommentId = null;
      this.fetchComments();
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
  .reply {
    margin-left: 2rem;
  }
</style>
