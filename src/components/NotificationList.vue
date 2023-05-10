<template>
  <div>
    <h2>Notifications</h2>
    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      notifications: [],
    };
  },
  async created() {
   const userId = localStorage.getItem("userId");
    // 请求后端 API 获取用户的通知列表
    try {
      const response = await this.$http.get(`/api/notifications/${userId}`);
      this.notifications = response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      this.$message.error("Error fetching notifications.");
    }
  },
};
</script>