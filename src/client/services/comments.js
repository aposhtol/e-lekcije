import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const get = async (video) => {
  const response = await axios.get(`${baseUrl}?video=${video}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

/*const comment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject);
  return response.data;
};*/

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const commentService = { get, create, setToken, update, remove };

export default commentService;
