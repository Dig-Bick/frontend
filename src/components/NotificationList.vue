<template>

    <div slot="header" class="dark-souls-card-header">
      <span class="dark-souls-card-title"></span>
    </div>
    <el-table
      :data="displayedNotifications"
      style="width: 100%"
      class="dark-souls-table"
    >
      <el-table-column prop="message" label="我的消息" />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="notifications.length"
      class="dark-souls-pagination"
    ></el-pagination>

</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      notifications: [],
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    displayedNotifications() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.notifications.slice(start, end);
    },
  },
  async created() {
    const userId = localStorage.getItem("userId");
    try {
      const response = await this.$http.get(`/api/notifications/${userId}`);
      this.notifications = response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      this.$message.error("Error fetching notifications.");
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style scoped>
.dark-souls-card {
  background-color: #333;
  color: #fca6a6;
  border-color: #666;
}

.dark-souls-card-header {
  background-color: #555;
  padding: 10px;
}

.dark-souls-card-title {
  color: #ffffff;
}

.dark-souls-table {
  background-color: #444;
  color: #000000;
}

.dark-souls-pagination {
  margin-top: 20px;
}
</style>
