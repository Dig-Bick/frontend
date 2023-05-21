<template>
  <div class="dark-souls-container">
    <div class="logindata">
      <div class="logo-wrapper">
        <!-- Add your logo here -->
         <img src="../assets/login.png" alt="cartoon-factory" />

      </div>
      <div class="form-wrapper">
      <h2>登录</h2>
        <el-form :model="loginForm" label-width="120px" @submit.native.prevent="submitForm">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" clearable placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" clearable placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <div class="butt-wrapper">
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button  @click="goToRegister">注册</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
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
  background-color: rgba(212, 174, 120, 0.8);
  padding: 20px;
  border-radius: 10px;
  transform: translate(-50%);
  margin-left: 50%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
}

.logo-wrapper {
  width: 50%;
  background-color: rgba(28, 10, 10, 0.5);
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


