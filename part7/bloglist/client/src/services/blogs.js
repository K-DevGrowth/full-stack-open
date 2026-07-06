import axios from "axios";
const baseUrl = "/api/blogs";

let token;

export const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

export const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to load blogs");
  }

  return res.json();
};

export const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

export const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig());
  return id;
};

export const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  return response.data;
};
