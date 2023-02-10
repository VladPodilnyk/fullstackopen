import axios from "axios";

const loginUrl = '/api/login';
const baseUrl = '/api/blogs';

// TODO: quite bad thing, but let it be
let token;

const setToken = (tokenValue) => {
  token = `Bearer ${tokenValue}`;
}

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (userData) => {
  return axios.post(baseUrl, userData);
}

const login = (loginData) => {
  return axios.post(loginUrl, loginData);
}

// const update = (id, userData) => {
//     return axios.put(`${baseUrl}/${id}`, userData);
// }

// const deleteItem = (id) => {
//     return axios.delete(`${baseUrl}/${id}`);
// }

export default { getAll, create, login, setToken };