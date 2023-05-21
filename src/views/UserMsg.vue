<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" style="width: 200px;"></el-input>
    </el-form-item>
        <el-form-item label="邮箱">
      <el-input v-model="form.email" type="email" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email:''
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
    const userId = localStorage.getItem("userId");
      // replace with your actual API
      this.$http.get('/user/' +  userId)
        .then(response => {
          this.form.username = response.data.username;
          this.form.password = response.data.password;
          this.form.email = response.data.email;
        });
    },
    submitForm(formName) {
    const userId = localStorage.getItem("userId");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // replace with your actual API
          this.$http.put('/user/update/' + userId, this.form)
            .then(response => {
              this.$message.success('保存成功');
            })
            .catch(error => {
              this.$message.error('保存失败');
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
