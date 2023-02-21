import axios from "axios";
// const baseUrl = "http://localhost:3001/persons";
// relative path due to serving from same instance and using same domain
const baseUrl = "/api/persons";

/**
 * Get all persons data
 * @returns
 */
const getAll = () => {
  return axios.get(baseUrl);
};

/**
 * Save person data
 * @param {*} newObject
 * @returns
 */
const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

/**
 * Update person data
 * @param {number} id
 * @param {*} newObject
 * @returns
 */
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

/**
 * Delete person
 * @param {number} id
 * @returns
 */
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const exportObj = {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};

export default exportObj;
