<template>
  <div class="management">
    <div class="management-options">
      <router-link to="/management/user">User Management</router-link>
      <router-link to="/management/post">Post Management</router-link>
      <router-link to="/statistic">Statistic</router-link>
    </div>
    <h1>管理中心</h1>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" @click.native="$router.push('/user-management')">
          <div slot="header" class="clearfix">
            <span>用户管理</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" @click.native="$router.push('/management/post')">
          <div slot="header" class="clearfix">
            <span>贴子管理</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" @click.native="$router.push('/statistic')">
          <div slot="header" class="clearfix">
            <span>统计</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="back">
      <el-button @click="$router.go(-1)">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.management {
  max-width: 800px;
  margin: 0 auto;
}

.box-card {
  cursor: pointer;
}

.back {
  margin-top: 10px;
  text-align: center;
}
</style>
