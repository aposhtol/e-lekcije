import { useRef } from 'react';
import {
  Slide,
  PlaylistItem,
  PlaylistImg,
  PlaylistTextArea,
  PlaylistText,
} from '../StyledComponents';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../reducers/commentsReducer';

const PlaylistsSlide = ({ videoId, onReplace }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const scrollRef = useHorizontalScroll();

  const handleReplace = (newId) => {
    onReplace(newId);
    dispatch(getComments(newId));
  };

  return (
    <Slide ref={scrollRef}>
      {videos.map((v) => (
        <PlaylistItem
          key={v.id}
          onClick={() => handleReplace(eval(videoId))}
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
    </Slide>
  );
};

export default PlaylistsSlide;

const useHorizontalScroll = () => {
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
};
