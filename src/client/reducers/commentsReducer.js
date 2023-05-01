import { createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

const commentReducer = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const id = action.payload.id;

      return state.map((comment) =>
        comment.id !== id ? comment : action.payload
      );
    },
  },
});

export const getComments = (video) => {
  return async (dispatch) => {
    try {
      const comments = await commentService.get(video);
      dispatch(setComments(comments));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const cmt = await commentService.create(comment);

      dispatch(setNotification(`Komentar dodan`, 5000));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const likeComment = (id) => {
  return async (dispatch) => {
    try {
      const res = await commentService.update(id);
      dispatch(like(res));
      //dispatch(setNotification(`You liked ${updatedBlog.title}!`, 5000));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const deleteComment = (id, name) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Delete ${name}?`)) {
        await commentService.remove(id);
        const comments = await commentService.get();
        dispatch(setComments(comments));
      }
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const { setComments, appendComment, like } = commentReducer.actions;
export default commentReducer.reducer;
