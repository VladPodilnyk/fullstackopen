import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl);
}

const create = (userData) => {
    return axios.post(baseUrl, userData);
}

const update = (id, userData) => {
    return axios.put(`${baseUrl}/${id}`, userData);
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, deleteItem };