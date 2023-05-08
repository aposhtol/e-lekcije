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
  const favs = useSelector((state) => state.favs);
  const message = useSelector((state) => state.notification);
  const id = useParams().id;
  const fav = favs.find((v) => v.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleReplace = (newId) => {
    navigate(`/profile/${newId}`, {
      replace: true,
    });
  };

  return (
    <PlayerContainer>
      <PlaylistsSlide
        video={fav}
        videos={favs}
        videoId='v.id'
        onReplace={handleReplace}
      />

      <PlayerSection>
        <Player
          forceLogin={handleLogin}
          grade={grade}
          video={fav}
          videos={favs}
          videoId={fav.id}
        />
        <CommentsLinks forceLogin={handleLogin} video={fav} videoId={fav.id} />
      </PlayerSection>
      {message && <NoticeWrapper>{message}</NoticeWrapper>}
    </PlayerContainer>
  );
};

export default PlayerView;
