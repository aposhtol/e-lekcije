import axios from 'axios';
const baseUrl = '/api/user';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const update = async (id, favorite, action) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { favorite, action },
    config
  );
  return response.data;
};

const userService = { setToken, update };

export default userService;
