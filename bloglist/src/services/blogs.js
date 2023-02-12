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
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, userData, config);
}

const login = (loginData) => {
  return axios.post(loginUrl, loginData);
}


export default { getAll, create, login, setToken };