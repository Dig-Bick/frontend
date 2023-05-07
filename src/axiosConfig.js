import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

instance.interceptors.response.use(
  response => response, // Replace 'response => response.data' with this line
  error => {
    return Promise.reject(error);
  }
);

export default instance;
