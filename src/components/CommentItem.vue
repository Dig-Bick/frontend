<!-- CommentItem.vue -->
<template>
  <li>
    <div :style="{ marginLeft: depth * 20 + 'px' }">
      <strong>{{ comment.username }}</strong>: {{ comment.content }}
      <button @click="showReplyForm(comment.commentId)">Reply</button>
      <reply-form
        v-if="comment.commentId === replyFormCommentId"
        :postId="postId"
        :commentId="comment.commentId"
        @reply-created="onReplyCreated"
      ></reply-form>
      <!-- CommentItem.vue -->
      <button v-if="isOwnComment" @click="deleteComment(comment.commentId)">Delete</button>


    </div>
    <ul v-if="comment.replies && comment.replies.length">
      <li v-for="reply in comment.replies" :key="reply.commentId">
        <strong>{{ reply.username }}</strong>: {{ reply.content }}
      </li>
    </ul>
  </li>
</template>

<script>
import ReplyForm from './ReplyForm.vue';

export default {
  props: {
    comment: Object,
    postId: Number,
    userId: [Number, String],
    depth: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ReplyForm,
  },
  data() {
    return {
      replyFormCommentId: null,
    };
  },
  computed: {
  isOwnComment() {
  const userIdd = localStorage.getItem("userId");
  console.log(this.userId,this.comment.userId,userIdd)
    return String(userIdd) === String(this.comment.userId);
  },
},
  methods: {
    showReplyForm(commentId) {
      this.replyFormCommentId = commentId;
    },
    onReplyCreated(reply) {
      this.$emit('reply-created', reply);
      this.replyFormCommentId = null;
    },
    async deleteComment(commentId) {
      try {
        await this.$http.delete(`/api/comments/${commentId}`);
        this.$emit("comment-deleted");
      } catch (error) {
        console.error("Error deleting comment:", error);
        this.$message.error("Error deleting comment.");
      }
    },


  },
};
</script>
