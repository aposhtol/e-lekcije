import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorites } from '../reducers/favReducer';
import { useEffect } from 'react';
import {
  CardsContainer,
  Grid,
  CardsTitle,
  CardItem,
  CardImg,
  CardTextArea,
  CardText,
  VLBack,
  ArrBack,
  BackText,
} from './StyledComponents';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favs = useSelector((state) => state.favs);
  const [animated, setAnimated] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    user && dispatch(getFavorites(user.favorites));

    setTimeout(() => {
      setHidden(false);
    }, 500);
  }, [dispatch]);

  if (hidden) return null;

  return (
    <CardsContainer>
      <VLBack onClick={() => navigate(-1)}>
        <ArrBack />
        <BackText>Natrag</BackText>
      </VLBack>
      <Grid>
        <CardsTitle>Moji favoriti</CardsTitle>
        {favs.map((v) => (
          <CardItem
            key={v.id}
            to={`/profile/${v.id}`}
            animated={animated ? 1 : 0}
            onMouseOver={() => setAnimated(false)}
          >
            <CardImg
              src={
                v.snippet.thumbnails.maxres
                  ? v.snippet.thumbnails.maxres.url
                  : v.snippet.thumbnails.standard
                  ? v.snippet.thumbnails.standard.url
                  : v.snippet.thumbnails.high
                  ? v.snippet.thumbnails.high.url
                  : v.snippet.thumbnails.medium
                  ? v.snippet.thumbnails.medium.url
                  : v.snippet.thumbnails.default
                  ? v.snippet.thumbnails.default.url
                  : null
              }
            />
            <CardTextArea>
              <CardText>
                {v.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
              </CardText>
            </CardTextArea>
          </CardItem>
        ))}
        {user && user.favorites.length === 0 ? (
          <CardsTitle>Nema favorita :(</CardsTitle>
        ) : (
          <CardsTitle>Moji favoriti</CardsTitle>
        )}
      </Grid>
    </CardsContainer>
  );
};

export default Profile;
