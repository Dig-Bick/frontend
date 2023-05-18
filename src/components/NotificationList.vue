<template>
  <div>
    <div slot="header" class="dark-souls-card-header">
      <span class="dark-souls-card-title"></span>
    </div>
    <el-table
      :data="displayedNotifications"
      style="width: 100%"
      class="dark-souls-table"
    >
      <el-table-column prop="message" label="我的消息" />
      <el-table-column
        width="80"
        label="操作"
        align="center">
<template #default="{row}">
  <el-popconfirm title="是否删除?" @confirm="deleteNotification(row.id)">
    <template #reference>
      <el-button type="danger" size="small" @click.prevent>
        <el-icon name="delete"></el-icon> 删除
      </el-button>
    </template>
  </el-popconfirm>
</template>
      </el-table-column>
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
  </div>
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
      console.log(response.data);
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
    async deleteNotification(id) {
      try {
        await this.$http.delete(`/api/notifications/delete/${id}`);
        this.notifications = this.notifications.filter(n => n.id !== id);
      } catch (error) {
        console.error("Error deleting notification:", error);
        this.$message.error("Error deleting notification.");
      }
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
  color: #ffffff
}
</style>
