<template>
  <el-container class="dark-souls-container" direction="vertical">
    <el-header class="dark-souls-header">
      <h2 class="dark-souls-card-title">登录</h2>
    </el-header>
    <el-main>
      <el-form :model="loginForm" label-width="120px" @submit.native.prevent="submitForm">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
      <p class="register-link">
        没有账号? <a @click="goToRegister">注册</a>
      </p>
    </el-main>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router';
import jwt_decode from "jwt-decode";

export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$http
        .post("/api/login", this.loginForm)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            const decoded = jwt_decode(token);
            const userId = decoded.userId;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            this.$store.dispatch("setToken", token);
            this.$store.dispatch("setUserId", userId);

            this.router.push({ name: "home" });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$message.error(error.response.data.error);
          }
        });
    },
    goToRegister() {
      this.router.push("/register");
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

.register-link {
  color: rgba(75, 70, 70, 0.99);
  text-align: center;
  margin-top: 20px;
}
</style>
