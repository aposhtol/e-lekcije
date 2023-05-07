import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  PlayerContainer,
  PlayerSection,
  NoticeWrapper,
} from './StyledComponents';

const PlaylistsSlide = loadable(() => import('./playerSection/PlaylistsSlide'));
const Player = loadable(() => import('./playerSection/Player'));
const CommentsLinks = loadable(() => import('./playerSection/CommentsLinks'));

const PlayerView = ({ grade }) => {
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos);
  const message = useSelector((state) => state.notification);
  const id = useParams().id;
  const video = videos.find((v) => v.snippet.resourceId.videoId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleReplace = (newId) => {
    navigate(`/playlists/${video.snippet.playlistId}/${newId}`, {
      replace: true,
    });
  };

  return (
    <PlayerContainer>
      <PlaylistsSlide
        video={video}
        videos={videos}
        videoId='v.snippet.resourceId.videoId'
        onReplace={handleReplace}
      />

      <PlayerSection>
        <Player
          forceLogin={handleLogin}
          grade={grade}
          video={video}
          videoId={video.snippet.resourceId.videoId}
        />
        <CommentsLinks
          forceLogin={handleLogin}
          video={video}
          videoId={video.snippet.resourceId.videoId}
        />
      </PlayerSection>
      {message && <NoticeWrapper>{message}</NoticeWrapper>}
    </PlayerContainer>
  );
};

export default PlayerView;
