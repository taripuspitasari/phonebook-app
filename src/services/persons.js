import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: {Authorization: token},
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, changedObject) => {
  const config = {
    headers: {Authorization: token},
  };

  const response = await axios.put(`${baseUrl}/${id}`, changedObject, config);
  return response.data;
};

const deletePerson = async id => {
  const config = {
    headers: {Authorization: token},
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  deletePerson,
  setToken,
};
