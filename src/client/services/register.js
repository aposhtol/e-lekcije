import axios from 'axios';
const baseUrl = '/api/register';

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const registerService = { register };

export default registerService;
