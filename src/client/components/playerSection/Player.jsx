import { setFavorite } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerWindow,
  PlayerTextContainer,
  Back,
  ArrBack,
  BackText,
  VideoHeading,
  VideoTitle,
  Author,
  AddFav,
  FavIcon,
  Favorited,
} from '../StyledComponents';

const Player = ({ grade, video, forceLogin, videoId }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const user = useSelector((state) => state.user);

  return (
    <>
      <PlayerWindow
        playing={true}
        controls={true}
        url={`https://www.youtube.com/watch?v=${videoId}?rel=0`}
        width='100%'
        height='100%'
      />
      <PlayerTextContainer>
        <Back as='a' href='/playlists'>
          <ArrBack />
          <BackText>Natrag na predmete</BackText>
        </Back>
        <div>
          <VideoHeading>
            {video.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
          </VideoHeading>
          <VideoTitle>
            {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
            {' - '}
            {grade && grade.grade}. razred{' '}
            {!grade
              ? null
              : grade.type == 'elem'
              ? 'osnovne škole'
              : 'srednje škole'}
          </VideoTitle>
          <Author>
            Autor:
            {video.snippet.description.match(
              /(?<=Autor:|Autori:).*?(?=\r\n|\n|\r)/g
            )}
          </Author>
        </div>
        {!user ? (
          <AddFav onClick={() => forceLogin()}>
            <FavIcon />
            <BackText>Dodaj u favorite</BackText>
          </AddFav>
        ) : user.favorites && user.favorites.includes(videoId) ? (
          <AddFav
            onClick={() =>
              dispatch(setNotification('Video je već u favoritima', 5000))
            }
          >
            <Favorited />
            <BackText>Moj favorit</BackText>
          </AddFav>
        ) : (
          <AddFav onClick={() => dispatch(setFavorite(user.id, videoId))}>
            <FavIcon />
            <BackText>Dodaj u favorite</BackText>
          </AddFav>
        )}
      </PlayerTextContainer>
    </>
  );
};

export default Player;
