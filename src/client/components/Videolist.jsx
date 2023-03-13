import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { setVideos } from '../reducers/videosReducer';
import { Link } from 'react-router-dom';

const Videolist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);
  const videos = useSelector((state) => state.videos);
  const id = useParams().id;
  const playlist = playlists.find((pl) => pl.id === id);
  const playlistId = playlist.playlistId;
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const getVideos = async () => {
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

      dispatch(setVideos(videos));
    };

    getVideos();
  }, []);

  return (
    <>
      <div>
        {videos.map((v) => (
          <div key={v.id}>
            <Link to={v.id}>{v.snippet.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Videolist;
