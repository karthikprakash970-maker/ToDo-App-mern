import axios from 'axios'

//get user token
const user = JSON.parse(localStorage.getItem('todoapp'))

//default auth header
if (user?.token) {
  axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
}
//Create todo
const createTodo = (data) =>{
    return axios.post('/todo/create',data)
};

//GET ALL todo
const getAllTodo = (id, data) => {
    return axios.post(`/todo/getAll/${id}`, data);
};

//UPDATE TODO
const updateTodo = (id,data)=>{
    return axios.patch("/todo/update/" + id, data)
}

//DELETE TODO
const deleteTodo = (id) =>{
    return axios.delete("/todo/delete/" +id)
}

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo}
export default TodoServices