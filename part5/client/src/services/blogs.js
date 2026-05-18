import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig());
  return id;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  return response.data;
};

export default { getAll, create, setToken, update, remove };
