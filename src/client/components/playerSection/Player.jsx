import { setFavorite } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, matchPath } from 'react-router-dom';
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
  FSPlayer,
} from '../StyledComponents';

const Player = ({ videos, video, forceLogin, videoId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isProfilePath = matchPath('/profile/*', pathname);

  const { description } = video.snippet;
  const favGrade = {};

  if (description.includes('SŠ')) {
    favGrade.type = 'high';
  } else if (description.includes('OŠ')) {
    favGrade.type = 'elem';
  } else {
    favGrade.type = '';
  }

  favGrade.grade = description.match(/\d+/).toString();

  return (
    <>
      <PlayerWindow
        playing
        controls
        url={`https://www.youtube.com/watch?v=${videoId}?rel=0`}
        width='100%'
        height='100%'
      />

      <PlayerTextContainer>
        {isProfilePath ? (
          <Back as='a' href='/profile'>
            <ArrBack />
            <BackText>Natrag na favorite</BackText>
          </Back>
        ) : (
          <Back as='a' href='/playlists'>
            <ArrBack />
            <BackText>Natrag na predmete</BackText>
          </Back>
        )}
        <div>
          <VideoHeading>
            {video.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
          </VideoHeading>
          <VideoTitle>
            {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
            {' - '}
            {favGrade && favGrade.grade}. razred{' '}
            {!favGrade
              ? null
              : favGrade.type == 'elem'
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
            onClick={
              () => dispatch(setFavorite(user.id, videoId, 'remove'))
              //dispatch(setNotification('Video je već u favoritima', 5000))
            }
          >
            <Favorited />
            <BackText>Moj favorit</BackText>
          </AddFav>
        ) : (
          <AddFav
            onClick={() => dispatch(setFavorite(user.id, videoId, 'add'))}
          >
            <FavIcon />
            <BackText>Dodaj u favorite</BackText>
          </AddFav>
        )}
      </PlayerTextContainer>
    </>
  );
};

export default Player;
