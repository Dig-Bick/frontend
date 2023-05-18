<template>
  <div class="statistics-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>用户总数</span>
          </div>
          <el-statistic :value="totalUsers" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>帖子总数</span>
          </div>
          <el-statistic :value="totalPosts" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>活跃用户数</span>
          </div>
          <el-statistic :value="activeUsers" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>总浏览量</span>
          </div>
          <el-statistic :value="totalPageViews" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalUsers: 5,
      totalPosts: 14,
      activeUsers: 5,
      totalPageViews: 12,
    };
  },
};
</script>

<style scoped>
.statistics-container {
  margin: 20px;
}
.box-card {
  padding: 30px;
  text-align: center;
}
</style>