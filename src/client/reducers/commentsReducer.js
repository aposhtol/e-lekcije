import { createSlice } from '@reduxjs/toolkit';
import commentsService from '../services/comments';
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
    likeComment(state, action) {
      const id = action.payload.id;

      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
  },
});

export const getComments = (video) => {
  return async (dispatch) => {
    try {
      const comments = await commentsService.get(video);
      dispatch(setComments(comments));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const cmt = await commentsService.create(comment);
      dispatch(appendComment(cmt));
      dispatch(
        setNotification(`A new blog ${cmt.title} by ${cmt.author} added`, 5000)
      );
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();

      const [blog] = state.blogs.filter((blog) => blog.id === id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const response = await blogService.update(id, updatedBlog);
      dispatch(like(response));
      dispatch(setNotification(`You liked ${updatedBlog.title}!`, 5000));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const deleteComment = (id, name) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Delete ${name}?`)) {
        await commentsService.remove(id);
        const comments = await commentsService.get();
        dispatch(setComments(comments));
      }
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const selectBlogs = (state) => [...state.comments];
export const { setComments, appendComment, likeComment } =
  commentReducer.actions;
export default commentReducer.reducer;
