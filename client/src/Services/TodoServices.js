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

// Create Todo
const createTodo = (data) => API.post("/todo/create", data);

// Get All Todos
const getAllTodo = (id, data) => API.post(`/todo/getAll/${id}`, data);

// Update Todo
const updateTodo = (id, data) => API.patch(`/todo/update/${id}`, data);

// Delete Todo
const deleteTodo = (id) => API.delete(`/todo/delete/${id}`);

export default {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};