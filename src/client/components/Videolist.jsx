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
      <Div>
        {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
        {' - '}
        {grade && grade.grade}. razred{' '}
        {!grade
          ? null
          : grade.type == 'elem'
          ? 'osnovne škole'
          : 'srednje škole'}
      </Div>
      <Grid>
        {videos.map((v) => (
          <GridItem
            key={v.id}
            to={v.id}
            animated={animated ? 1 : 0}
            onMouseOver={() => setAnimated(false)}
          >
            <GridImg src={v.snippet.thumbnails.high.url} />
            <GridP>{v.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}</GridP>
          </GridItem>
        ))}
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
  width: 139.6rem;
  height: 100%;
  position: relative;
  margin: 0 auto;
  margin-top: 11rem;
  overflow-x: visible;

  @media only screen and (max-width: 1440px) {
    width: 92.4rem;
  }
  @media only screen and (max-width: 960px) {
    width: 68.8rem;
  }
  @media only screen and (max-width: 720px) {
    width: 45.2rem;
  }
  @media only screen and (max-width: 480px) {
    width: 21.6rem;
  }
`;

const Div = styled.div`
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);
  font-size: 2.8rem;
  margin: 3rem auto;
  text-align: center;
  padding: 2rem;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  animation: ${slideDiv} 1.1s both;

  @media only screen and (max-width: 1440px) {
    font-size: 2.8rem;
    padding: 1.8rem;
  }
  @media only screen and (max-width: 960px) {
    font-size: 2.6rem;
    padding: 1.6rem;
  }
  @media only screen and (max-width: 720px) {
    font-size: 2.4rem;
    padding: 1.4rem;
  }
  @media only screen and (max-width: 480px) {
    font-size: 2.2rem;
    padding: 1.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 21.6rem);
  grid-gap: 2rem;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem;

  /*@media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(4, 21.6rem);
  }
  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(3, 21.6rem);
  }
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 21.6rem);
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 21.6rem);
  }*/
`;

const GridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;

  text-decoration: none;
  //padding: 2rem;
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

  //justify-self: center;
  //align-self: center;
`;

const GridImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  //display: block;
  //contain: paint;
  object-fit: cover;
  //object-position: center;
  //width: 100%;
  height: 11.4rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const GridP = styled.p`
  flex: 1;

  //margin: 0 auto;

  color: #1443d5;
  //height: 9rem;

  font-size: 1.6rem;
  padding: 1rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  text-align: center;

  /*background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);*/
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: none;
  border-top-right-radius: none;

  /*&:hover {
    color: #107fa6;
  }*/
`;

//{videos[0].snippet.title.match(/^[^\d]*/g)}
