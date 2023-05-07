import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
    userId: null, // 添加 userId 属性
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) { // 添加 setUserId 方法
      state.userId = userId;
    },
    logout(state) {
      state.token = "";
      state.userId = null;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post("/api/login", { username, password });
        commit("setToken", response.data.token);
        commit("setUserId", response.data.userId);
        return true;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error(error.response.data.error);
        } else {
          throw new Error("登录失败，请稍后再试");
        }
      }
    },
  },
  modules: {},
});
