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

  useEffect(() => {
    window.scrollTo(0, 0);
    screen.orientation.lock('portrait-primary');
  }, []);

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
          <PlaylistItem
            key={v.id}
            onClick={() => handleReplace(v.id)}
            tabIndex='1'
          >
            <PlaylistImg
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
            <PlaylistTextArea>
              <PlaylistText>
                {v.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
              </PlaylistText>
            </PlaylistTextArea>
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
                    <Button>{url}</Button>
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
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 7rem;

  @media only screen and (max-width: 380px) {
    margin-top: 5.5rem;
  }
`;

const PlayerSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  max-width: 1920px;
  gap: 2rem;

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
`;

const PlayerTextContainer = styled.div`
  color: #1443d5;
  width: 70%;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  letter-spacing: 0.01rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.6rem;
  }
`;

const PlayerText = styled.div`
  font-size: 1.6rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  font-size: 1.6rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;

const Urls = styled.a`
  text-decoration: none;
`;

const Button = styled.button`
  font-size: 1.4rem;
  font-family: inherit;
  margin: 1rem auto;
  width: auto;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgba(0, 3, 255, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

const PlaylistsSlide = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  width: 100%;
  padding: 2rem;
  overflow-x: scroll;

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

  &:focus {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const PlaylistImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  object-fit: cover;
  height: 9rem;
  width: 16rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media only screen and (max-width: 1016px) {
    height: 7.875rem;
    width: 14rem;
  }

  /*@media only screen and (max-width: 380px) {
    height: 7.875rem;
    width: 14rem;
  }*/
`;

const PlaylistTextArea = styled.div`
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
`;

const PlaylistText = styled.p`
  color: #1443d5;
  font-size: 1.2rem;
  text-align: center;
`;
//{videos[0].snippet.title.match(/^[^\d]*/g)}
