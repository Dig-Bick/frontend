import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    userId: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
  },
  getters: {
    token: (state) => state.token,
    userId: (state) => state.userId,
  },
});
