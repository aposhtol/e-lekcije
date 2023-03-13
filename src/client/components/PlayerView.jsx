import ReactPlayer from 'react-player/youtube';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PlayerView = () => {
  const videos = useSelector((state) => state.videos);
  const id = useParams().id;
  const video = videos.find((v) => v.id === id);
  console.log(video);

  return (
    <>
      <ReactPlayer
        playing={true}
        controls={true}
        url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
      />
    </>
  );
};

export default PlayerView;
