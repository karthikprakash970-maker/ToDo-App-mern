import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

// Register User
const registerUser = (data) => {
  return API.post("/user/register", data);
};

// Login User
const loginUser = (data) => {
  return API.post("/user/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;