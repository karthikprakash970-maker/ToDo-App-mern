import axios from "axios";

const registerUser = (data) => {
    return axios.post(`/user/register`, data);
};

const loginUser = (data) => {
    return axios.post(`/user/login`, data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;