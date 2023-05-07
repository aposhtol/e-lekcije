import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos } from '../reducers/videosReducer';
import {
  CardsContainer,
  CardsTitle,
  Grid,
  CardItem,
  CardImg,
  CardTextArea,
  CardText,
  VLBack,
  ArrBack,
  BackText,
} from './StyledComponents';

const Videolist = ({ grade }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const id = useParams().id;
  const [animated, setAnimated] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getVideos(id));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 500);
  }, []);

  const cardTitle = (
    <>
      {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
      {' - '}
      {grade && grade.grade}. razred{' '}
      {!grade ? null : grade.type == 'elem' ? 'osnovne škole' : 'srednje škole'}
    </>
  );

  if (hidden) return null;

  return (
    <CardsContainer>
      <VLBack as='a' href='/playlists'>
        <ArrBack />
        <BackText>Natrag na predmete</BackText>
      </VLBack>
      <Grid>
        <CardsTitle>{cardTitle}</CardsTitle>

        {videos.map((v) => (
          <CardItem
            key={v.id}
            to={v.snippet.resourceId.videoId}
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

        <CardsTitle>{cardTitle}</CardsTitle>
      </Grid>
    </CardsContainer>
  );
};

export default Videolist;
