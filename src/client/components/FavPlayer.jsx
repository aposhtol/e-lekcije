import ReactPlayer from 'react-player/youtube';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import Cogs from '../assets/images/player-cogs.svg';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import {
  createComment,
  getComments,
  likeComment,
} from '../reducers/commentsReducer';
import { setFavorite } from '../reducers/userReducer';

const FavPlayer = ({ grade }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const videos = useSelector((state) => state.videos);
  const comments = useSelector((state) => state.comments);
  const id = useParams().id;
  const video = videos.find((v) => v.id === id);
  const [content, setContent] = useState('');

  console.log(videos);
  //console.log(user);

  let urls = null;
  urls = video.snippet.description.match(
    /https:\/\/bit\.ly\/[\w-žćčđšŽĆČĐŠ]+/g
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getComments(video.id));
  }, []);

  const scrollRef = useHorizontalScroll();

  const handleReplace = (newId) => {
    navigate(`/profile/${newId}`, {
      replace: true,
    });
    dispatch(getComments(newId));
  };

  const timeSince = (date) => {
    const seconds = Math.floor(
      (new Date(Date.now() - 2 * 60 * 60 * 1000) - date) / 1000
    );
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `prije ${interval} godin${interval > 4 ? 'a' : 'e'}`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `prije ${interval} mjesec${
        interval > 1 ? 'a' : interval > 4 ? 'i' : ''
      }`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `prije ${interval} dan${interval > 1 ? 'a' : ''}`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `prije ${interval} sat${
        interval > 4 ? 'i' : interval > 1 ? 'a' : ''
      }`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `prije ${interval} minut${interval > 4 ? 'a' : 'e'}`;
    }
    return `prije ${Math.floor(seconds)} sekund${seconds > 4 ? 'i' : 'e'}`;
  };

  const refreshComments = () => {
    setTimeout(() => {
      dispatch(getComments(video.id));
    }, 100);
  };

  const addComment = (event) => {
    event.preventDefault();
    const comment = {
      video: video.id,
      content: content,
    };
    dispatch(createComment(comment));
    refreshComments();

    setContent('');
  };

  const handleLike = (id) => {
    dispatch(likeComment(id));
    refreshComments();
  };

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
          url={`https://www.youtube.com/watch?v=${video.id}?rel=0`}
          width='100%'
          height='100%'
        />
        <PlayerTextContainer>
          <Back as='a' href='/profile'>
            <ArrBack />
            <BackText>Natrag na favorite</BackText>
          </Back>
          <div>
            <Heading>
              {video.snippet.title.match(/(?<=- ).+|(?<=-).+/g)}
            </Heading>
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
            <Author>
              Autor:
              {video.snippet.description.match(
                /(?<=Autor:|Autori:).*?(?=\r\n|\n|\r)/g
              )}
            </Author>
          </div>
          {user && user.favorites && user.favorites.includes(video.id) ? (
            <AddFav>
              <Favorited />
              <BackText>Moj favorit</BackText>
            </AddFav>
          ) : (
            <AddFav
              onClick={() =>
                dispatch(setFavorite(user.id, video.snippet.resourceId.videoId))
              }
            >
              <FavIcon />
              <BackText>Dodaj u favorite</BackText>
            </AddFav>
          )}
        </PlayerTextContainer>
        {urls ? (
          <LinksContainer>
            <LinksHeader>Dodatni sadržaji</LinksHeader>
            <Wrapper>
              {urls &&
                urls.map((url) => (
                  <Urls key={crypto.randomUUID()} href={url} target='_blank'>
                    <Button>{url}</Button>
                  </Urls>
                ))}
            </Wrapper>
          </LinksContainer>
        ) : null}
        <CommentsContainer>
          <CommentsHeader>Rasprava o nastavnoj jedinici</CommentsHeader>
          <CommentsSub>
            Raspravljati mogu samo prijavljeni korisnici
          </CommentsSub>
          <CommentForm onSubmit={addComment}>
            {!user ? (
              <CommentEntry
                onClick={() => navigate('/login')}
                autoFocus
                placeholder='Započnite raspravu...'
              ></CommentEntry>
            ) : (
              <CommentEntry
                value={content}
                onChange={({ target }) => setContent(target.value)}
                minLength={3}
                maxLength={1500}
                autoFocus
                placeholder='Započnite raspravu...'
              ></CommentEntry>
            )}

            <CommentSubmit>
              {user ? (
                <SubmitButton type='submit'>Objavi</SubmitButton>
              ) : (
                <Link to={'/login'} style={{ textDecoration: 'none' }}>
                  <SubmitButton>Prijavi se</SubmitButton>
                </Link>
              )}
            </CommentSubmit>
          </CommentForm>
          {comments.map((com) => (
            <CommentItem key={com.id}>
              <CommentItemDiv>
                <CommentAuthor>{com.author.username}</CommentAuthor>
                <TimeSince>
                  {timeSince(
                    new Date(com.date.substring(0, com.date.length - 1))
                  )}
                </TimeSince>
              </CommentItemDiv>
              <CommentText>{com.content}</CommentText>
              <LikeReplyWrapper>
                {!user ? (
                  <LikeWrapper onClick={() => navigate('/login')}>
                    <Like /> <LikeText>{com.likes}</LikeText>
                  </LikeWrapper>
                ) : (
                  <LikeWrapper onClick={() => handleLike(com.id)}>
                    {com.likedBy.includes(user.id) ? <Liked /> : <Like />}
                    <LikeText>{com.likes}</LikeText>
                  </LikeWrapper>
                )}

                {!user ? (
                  <ReplyButton onClick={() => navigate('/login')}>
                    Odgovori
                  </ReplyButton>
                ) : (
                  <ReplyButton>Odgovori</ReplyButton>
                )}
              </LikeReplyWrapper>
            </CommentItem>
          ))}
        </CommentsContainer>
      </PlayerSection>
    </Container>
  );
};

export default FavPlayer;

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

const slideInTop = keyframes`
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
  margin-bottom: 8rem;

  /*@media only screen and (max-width: 528px) {
    margin-top: 5.5rem;
    margin-bottom: 10rem;
  }*/
`;

const PlaylistsSlide = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: start;
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

  animation: ${slideInTop} 1.1s both;
`;

const PlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
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

  @media only screen and (max-width: 1016px) {
    width: 14rem;
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

const PlayerSection = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 2rem;
  width: 95%;
  max-width: 1920px;

  @media only screen and (max-width: 1016px) {
    grid-template-columns: 1fr;
  }
`;

const Player = styled(ReactPlayer)`
  grid-area: 1 / 1 / 2 / 2;

  aspect-ratio: 16/9;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInLeft} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const PlayerTextContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #1443d5;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);

  text-align: center;
  padding: 2rem;
  background-image: url(${Cogs});
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const ArrBack = styled(TiArrowBackOutline)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  word-wrap: break-word;
  font-size: 1.4rem;
  //font-family: inherit;
  margin: 0 auto;
  width: 20rem;
  min-height: 6rem;
  color: #fff;
  border-radius: 10px;
  padding: 1rem;
  //background: transparent;
  cursor: pointer;
  //transition: all 0.3s ease;
  //display: block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  //outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, #060e83 0%, #0c1ab4 100%);
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, #0004ff 0%, #027efb 100%);
  }

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
    width: 18rem;
    min-height: 5.5rem;
    padding: 0.5rem;
  }
`;

const Back = styled(Button)`
  text-decoration: none;
  min-height: 0;
  border-radius: 30px;
  margin-bottom: 2rem;
  font-variant: small-caps;

  @media only screen and (max-width: 1016px) {
    width: 18rem;
    min-height: 0;
  }
`;

const BackText = styled.p`
  font-size: 1.4rem;
  display: inline;
  vertical-align: middle;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

const Heading = styled.h1`
  font-size: 2.6rem;
  padding-bottom: 0.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2.2rem;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 500;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }
`;
const Author = styled.div`
  padding-top: 2rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 900;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }
`;

const AddFav = styled(Back)`
  //visibility: hidden;
  margin-bottom: 0;
  background: rgb(6, 14, 131);
  background: linear-gradient(to bottom, #8814a5 0%, #9817b8 100%);

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(to bottom, #a41cff 0%, #ea1ffd 100%);
  }
`;

const FavIcon = styled(MdOutlineFavoriteBorder)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

const Favorited = styled(MdOutlineFavorite)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

const CommentsContainer = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  grid-row: span 2;
  align-items: center;

  padding-top: 2rem;
  padding-bottom: 4rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #1443d5;
  background-image: url(${Cogs});
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInLeft} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 4 / 1 / 5 / 2;
  }
`;

const CommentsHeader = styled.h1`
  font-size: 2.4rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  text-align: center;
  margin-bottom: -1.5rem;
`;

const CommentsSub = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #14003a;
  margin-bottom: 2rem;
`;

const CommentForm = styled.form`
  width: 90%;
`;

const CommentEntry = styled.textarea`
  width: 100%;
  resize: vertical;
  background-color: #ffffffb2;
  font-family: inherit;
  font-size: 1.6rem;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-color: #ffffff;
  border-radius: 10px;
  min-height: 10rem;
  padding: 0.5rem;
  padding-left: 1rem;
  color: inherit;

  &:focus {
    outline-offset: 0px;
    outline: none;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d3fd47f;
  }
`;

const CommentSubmit = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-bottom: 3rem;
`;

const SubmitButton = styled(Button)`
  text-decoration: none;
  margin: 0;
  border-radius: 30px;
  width: 10rem;
  padding: 1rem;
  min-height: 0.5rem;
  font-variant: small-caps;
  //margin-bottom: 2rem;

  /*@media only screen and (max-width: 1016px) {
    width: 18rem;
    min-height: 0;
  }*/
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  padding-right: 2rem;
  width: 90%;
  //min-height: 10rem;

  background-color: #e2f2ffc0;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
`;

const CommentItemDiv = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const CommentAuthor = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  padding-right: 1rem;
`;

const TimeSince = styled.p`
  //color: rgba(53, 104, 255, 0.575);
  color: #684dffb7;
  font-family: 'Courgette', cursive;
  font-size: 1.2rem;
  padding-top: 0.3rem;
`;

const CommentText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  word-break: break-word;
  text-align: justify;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;

const LikeReplyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-left: -1rem;

  &:hover {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    background: rgba(21, 255, 0, 0.623);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Like = styled(AiOutlineLike)`
  font-size: 2rem;
`;

const Liked = styled(AiFillLike)`
  font-size: 2rem;
`;

const LikeText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  padding-left: 0.3rem;
`;

const ReplyButton = styled(Button)`
  font-size: 1.2rem;
  text-decoration: none;
  margin: 0;
  border-radius: 30px;
  width: 8rem;
  padding: 0.5rem;
  min-height: 0rem;
  height: 3rem;
  font-variant: small-caps;
`;

const LinksContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;

  height: 100%;
  padding: 2rem;
  font-family: 'Courgette', cursive;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  color: #1443d5;
  background-image: url(${Cogs});
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 3 / 1 / 4 / 2;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: grid;

  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-gap: 0.5rem;
`;

const Urls = styled.a`
  text-decoration: none;
`;

const LinksHeader = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

/*const Dummy = styled.div`
  height: 1rem;
`;
const Hr = styled.hr`
  margin: 1rem auto;
  overflow: visible;
  height: 30px;
  border-style: solid;
  border-color: rgba(2, 126, 251, 1);
  border-width: 1px 0 0 0;
  border-radius: 20px;

  &::before {
    display: block;
    content: '';
    height: 30px;
    margin-top: -31px;
    border-style: solid;
    border-color: black;
    border-width: 0 0 1px 0;
    border-radius: 20px;
  }
`;*/

/*const Ds = styled.p`
  padding-bottom: 0.3rem;
  font-size: 1.6rem;
  grid-column: 1/-1;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;*/

/*${({ urls }) =>
    urls.length === 1 &&
    css`
      grid-template-columns: 20rem;
    `};*/
