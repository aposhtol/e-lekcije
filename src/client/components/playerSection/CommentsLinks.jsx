import {
  createComment,
  getComments,
  likeComment,
} from '../../reducers/commentsReducer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import timeSince from '../../utils/timeSince';
import {
  LinksContainer,
  LinksHeader,
  Wrapper,
  Urls,
  LinksButton,
  CommentsContainer,
  CommentsHeader,
  CommentsSub,
  CommentForm,
  CommentEntry,
  CommentSubmit,
  SubmitButton,
  CommentItem,
  CommentItemDiv,
  CommentAuthor,
  TimeSince,
  CommentText,
  LikeReplyWrapper,
  LikeWrapper,
  Like,
  Liked,
  LikeText,
  ReplyButton,
} from '../StyledComponents';

const CommentsLinks = ({ video, forceLogin, videoId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(getComments(videoId));
  }, []);

  let urls = null;
  urls = video.snippet.description.match(
    /https:\/\/bit\.ly\/[\w-žćčđšŽĆČĐŠ]+/g
  );

  const refreshComments = () => {
    setTimeout(() => {
      dispatch(getComments(videoId));
    }, 100);
  };

  const addComment = (event) => {
    event.preventDefault();
    const comment = {
      video: videoId,
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
    <>
      {urls ? (
        <LinksContainer>
          <LinksHeader>Dodatni sadržaji</LinksHeader>
          <Wrapper>
            {urls &&
              urls.map((url) => (
                <Urls key={crypto.randomUUID()} href={url} target='_blank'>
                  <LinksButton>{url}</LinksButton>
                </Urls>
              ))}
          </Wrapper>
        </LinksContainer>
      ) : null}
      <CommentsContainer>
        <CommentsHeader>Rasprava o nastavnoj jedinici</CommentsHeader>
        <CommentsSub>Raspravljati mogu samo prijavljeni korisnici</CommentsSub>
        <CommentForm onSubmit={addComment}>
          {!user ? (
            <CommentEntry
              onClick={() => forceLogin()}
              placeholder='Započnite raspravu...'
            ></CommentEntry>
          ) : (
            <CommentEntry
              value={content}
              onChange={({ target }) => setContent(target.value)}
              minLength={3}
              maxLength={1500}
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
                <LikeWrapper onClick={() => forceLogin()}>
                  <Like /> <LikeText>{com.likes}</LikeText>
                </LikeWrapper>
              ) : (
                <LikeWrapper onClick={() => handleLike(com.id)}>
                  {com.likedBy.includes(user.id) ? <Liked /> : <Like />}
                  <LikeText>{com.likes}</LikeText>
                </LikeWrapper>
              )}

              {!user ? (
                <ReplyButton onClick={() => forceLogin()}>Odgovori</ReplyButton>
              ) : (
                <ReplyButton>Odgovori</ReplyButton>
              )}
            </LikeReplyWrapper>
          </CommentItem>
        ))}
      </CommentsContainer>
    </>
  );
};

export default CommentsLinks;
