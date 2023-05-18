import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import "element-plus/theme-chalk/index.css";
import http from "./http";
import axios from 'axios';
import * as echarts from 'echarts';  // 导入 echarts

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.config.globalProperties.$http = http;

// 通过全局变量使得 echarts 在全局都能访问
app.config.globalProperties.$echarts = echarts

app.mount('#app');

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
