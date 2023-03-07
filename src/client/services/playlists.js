import axios from 'axios';

const baseUrl = '/api/playlists';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const playlistService = { getAll };

export default playlistService;
