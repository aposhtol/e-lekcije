import axios from 'axios';
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

const baseUrl = '/api/playlists';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const fetchVideos = async (playlistId) => {
  let videos = [];
  let nextPageToken = '';

  do {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
    );

    const data = response.data;
    videos = videos.concat(data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videos;
};

const fetchFavorites = async (videolist) => {
  let videos = [];
  let nextPageToken = '';

  do {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videolist.join(
        '%2C'
      )}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
    );

    const data = response.data;
    videos = videos.concat(data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videos;
};

const playlistService = { getAll, fetchVideos, fetchFavorites };

export default playlistService;
