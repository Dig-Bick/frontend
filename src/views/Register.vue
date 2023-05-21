<template>
  <div class="dark-souls-container">
    <div class="logindata">
      <div class="logo-wrapper">
        <!-- Add your logo here -->
         <img src="../assets/login.png" alt="cartoon-factory" />
      </div>
      <div class="form-wrapper">
        <div class="logintext">
          <h2>注册</h2>
        </div>
        <el-form ref="registerForm" :model="registerForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password" clearable placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword" clearable placeholder="请确认密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" clearable placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-form>
        <div class="butt-wrapper">
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button @click="goToLogin">登录</el-button>
        </div>
      </div>
    </div>
    <div class="logo-background"></div>
  </div>
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
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: linear-gradient(135deg, #ffe7bf 0%, #4b3201 100%);
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logindata {
  width: 800px;
  height: 380px;
  background-color: rgba(144, 138, 86, 0.8);
  padding: 20px;
  border-radius: 10px;
  transform: translate(-50%);
  margin-left: 50%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
}

.logo-wrapper {
  width: 50%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrapper img {
  max-width: 100%;
  max-height: 100%;
}

.form-wrapper{
  width: 48%;
  margin-top: 0px;
  margin-left: 20px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

.butt-wrapper {
  margin-top: 10px;
}

.el-button {
  width: 100%;
  margin-bottom: 10px;
}
</style>

