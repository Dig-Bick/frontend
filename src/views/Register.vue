<template>
  <el-container class="dark-souls-container" direction="vertical">
    <el-header class="dark-souls-header">
      <h2 class="dark-souls-card-title">注册</h2>
    </el-header>
    <el-main>
      <el-form ref="registerForm" :model="registerForm" label-width="120px" @submit.native.prevent="submitForm">
        <el-form-item label="用户名">
          <el-input v-model="registerForm.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.password" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="registerForm.confirmPassword" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button @click="goToLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
   setup() {
      const router = useRouter();
      return {
        router,
      };
    },
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }
      this.$http
      .post("/api/register", this.registerForm)
        .then((response) => {
          if (response.status === 200) {
            this.$message.success(response.data);
            this.router.push("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$message.error(error.response.data);
          }
        });
    },
    goToLogin() {
      this.router.push("/login");
    },
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
