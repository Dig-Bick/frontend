<template>
  <div>
    <textarea v-model="content" placeholder="请输入回复内容"></textarea>
    <el-button @click="submitReply">提交回复</el-button>
  </div>
</template>

<script>
export default {
  props: {
    postId: Number,
    commentId: Number,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async submitReply() {
      if (!this.content) return;
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const response = await this.$http.post(
          `/api/comments/posts/${this.postId}/comments/${this.commentId}/replies`,
          { content: this.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        this.$emit("reply-created", response.data);
        this.content = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
