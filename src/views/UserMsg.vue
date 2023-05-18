<template>
  <el-container class="dark-souls-container" direction="vertical">
    <el-header class="dark-souls-header">
      <h2 class="dark-souls-card-title">个人信息</h2>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="头像URL">
          <el-input v-model="form.avatar" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveChanges">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        avatar: '',
        password: '',
      },
    };
  },
  methods: {
    saveChanges() {
      // 保存用户信息更改的逻辑
    },
  },
  async created() {
    // 加载用户信息的逻辑
  },
};
</script>

<style scoped>
.dark-souls-container {
  background-color: #e0d3d3;
  color: #ff0000;
}

.dark-souls-header {
  background-color: #222;
  padding: 10px;
}

.dark-souls-card-title {
  color: #ffffff;
}
</style>
