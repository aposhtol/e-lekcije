import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos } from '../reducers/videosReducer';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Videolist = ({ grade }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const id = useParams().id;
  const [animated, setAnimated] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getVideos(id));

    setTimeout(() => {
      setHidden(false);
    }, 500);
  }, [dispatch]);

  if (hidden) return null;

  return (
    <Container>
      <Grid>
        <Title>
          {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
          {' - '}
          {grade && grade.grade}. razred{' '}
          {!grade
            ? null
            : grade.type == 'elem'
            ? 'osnovne škole'
            : 'srednje škole'}
        </Title>

        {videos.map((v) => (
          <CardItem
            key={v.id}
            to={v.id}
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

        <Title>
          {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
          {' - '}
          {grade && grade.grade}. razred{' '}
          {!grade
            ? null
            : grade.type == 'elem'
            ? 'osnovne škole'
            : 'srednje škole'}
        </Title>
      </Grid>
    </Container>
  );
};

export default Videolist;

const hoverItem = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 20px 10px rgba(0, 140, 255, 0.507);
  }
`;

const appear = keyframes`
  0% {
    transform: translateZ(-800px) rotateX(90deg);
    opacity: 0;
  }
  54% {
    transform: translateZ(-160px) rotateX(87deg);
    opacity: 1;
  }
  100% {
    transform: translateZ(0) rotateX(0);
  }
`;

const slideDiv = keyframes`
  0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`;

const Container = styled.main`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 7rem;

  @media only screen and (max-width: 380px) {
    margin-top: 8.5rem;
    margin-bottom: 5.5rem;
  }
`;

const Title = styled.div`
  grid-column: 1/-1;
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);
  font-size: 2.2rem;
  //margin: 3rem auto;
  text-align: center;
  padding: 1.5rem;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  animation: ${slideDiv} 1.1s both;

  @media only screen and (max-width: 1016px) {
    font-size: 1.6rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 19.55rem);
  grid-gap: 2rem;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem;

  @media only screen and (max-width: 1016px) {
    grid-template-columns: repeat(auto-fit, 16rem);
    grid-gap: 1rem;
  }

  @media only screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fit, 14rem);
    grid-gap: 0.5rem;
  }
`;

const CardItem = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  animation: ${({ animated }) => animated && appear} 0.45s ease-out both;

  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const CardImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  object-fit: cover;
  height: 11rem;
  width: 19.55rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media only screen and (max-width: 1016px) {
    height: 9rem;
    width: 16rem;
  }

  @media only screen and (max-width: 380px) {
    height: 7.875rem;
    width: 14rem;
  }
`;

const CardTextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  padding: 0.5rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: none;
  border-top-right-radius: none;

  @media only screen and (max-width: 1016px) {
    height: 9rem;
    padding: 1rem;
  }
`;

const CardText = styled.p`
  color: #1443d5;
  font-size: 1.4rem;
  text-align: center;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;
