import ReactPlayer from 'react-player/youtube';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRef, useEffect } from 'react';

const PlayerView = ({ grade }) => {
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos);
  const id = useParams().id;
  const video = videos.find((v) => v.id === id);

  let urls = null;
  urls = video.snippet.description.match(
    /https:\/\/bit\.ly\/[\w-žćčđšŽĆČĐŠ]+/g
  );

  //console.log(video);
  //console.log(urls);

  /*const backToSubjects = () => {
    const backHandler = event => navigate('/playlists');

    window.addEventListener('popstate', backHandler);

    return () => window.removeEventListener('popstate', backHandler);
  };*/

  /*useEffect(() => {
    const backHandler = (event) => navigate('/playlists');

    window.addEventListener('popstate', backHandler);

    return () => window.removeEventListener('popstate', backHandler);
  }, []);*/

  const scrollRef = useHorizontalScroll();

  function handleReplace(newId) {
    navigate(`/playlists/${video.snippet.playlistId}/${newId}`, {
      replace: true,
    });
  }

  return (
    <Container>
      <PlaylistsSlide ref={scrollRef}>
        {videos.map((v) => (
          <PlaylistItem key={v.id} onClick={() => handleReplace(v.id)}>
            <PlaylistImg src={v.snippet.thumbnails.high.url} />
            <PlaylistText>
              {v.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
            </PlaylistText>
          </PlaylistItem>
        ))}
      </PlaylistsSlide>

      <PlayerSection>
        <Player
          playing={true}
          controls={true}
          config={{
            youtube: {
              playerVars: { hl: 'hr', loop: 1, rel: 0 },
            },
          }}
          url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}?rel=0`}
          width='100%'
          height='100%'
        />

        <PlayerTextContainer>
          <Heading>{video.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}</Heading>
          <PlayerText>
            {videos[0].snippet.title.match(/^.+?(?=, \d|\s\d)/g)}
            {' - '}
            {grade && grade.grade}. razred{' '}
            {!grade
              ? null
              : grade.type == 'elem'
              ? 'osnovne škole'
              : 'srednje škole'}
            <br />
            Autor:
            {video.snippet.description.match(
              /(?<=Autor:|Autori:).*?(?=\r\n|\n|\r)/g
            )}
            <Wrapper>
              {urls ? 'Dodatni sadržaji: ' : null}
              {urls &&
                urls.map((url) => (
                  <Urls key={crypto.randomUUID()} href={url} target='_blank'>
                    {url}
                  </Urls>
                ))}
            </Wrapper>
          </PlayerText>
        </PlayerTextContainer>
      </PlayerSection>
    </Container>
  );
};

export default PlayerView;

function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elRef;
}

const hoverItem = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(0, 140, 255, 0.507);
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

const slideInRight = keyframes`
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes` 
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
  `;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 7rem;

  /*
  padding: 0 4rem;
  overflow-x: visible;*/

  /*@media only screen and (max-width: 1440px) {
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
  }*/
`;

const PlayerSection = styled.div`
  display: flex;
  flex-direction: row;
  //height: 100%;
  width: 95%;
  max-width: 1920px;
  gap: 2rem;
  //justify-content: center;
  //align-items: center;

  @media only screen and (max-width: 1016px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Player = styled(ReactPlayer)`
  aspect-ratio: 16/9;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInLeft} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  //animation: 0.45s ease-out both;
`;

const PlayerTextContainer = styled.div`
  color: #1443d5;
  width: 70%;
  text-align: center;
  padding: 2rem;
  font-size: 1.4rem;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    width: 100%;
    font-size: 1.2rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  letter-spacing: 0.01rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;

const PlayerText = styled.div`
  font-size: 1.4rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  font-size: 1.4rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

const Urls = styled.a`
  display: block;
  font-size: 1.4rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

const PlaylistsSlide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: start;
  width: 100%;
  gap: 1rem;
  padding: 2rem;
  overflow-x: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d3fd47f;
  }

  animation: ${slideDiv} 1.1s both;
`;

const PlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 18.6rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const PlaylistImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  object-fit: cover;
  height: 10rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const PlaylistText = styled.p`
  color: #1443d5;
  font-size: 1.2rem;
  padding: 0.5rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  text-align: center;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: none;
  border-top-right-radius: none;
`;
//{videos[0].snippet.title.match(/^[^\d]*/g)}
