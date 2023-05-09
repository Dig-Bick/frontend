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
  methods: {
    showReplyForm(commentId) {
      this.replyFormCommentId = commentId;
    },
    onReplyCreated(reply) {
      this.$emit('reply-created', reply);
      this.replyFormCommentId = null;
    },
  },
};
</script>
