import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import registerService from '../services/register';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const register = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await registerService.register(userObj);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      commentService.setToken(user.token);

      dispatch(setUser(user));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
      console.log(err.response.data.error);
    }
  };
};

export const setLogin = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObj);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      commentService.setToken(user.token);

      dispatch(setUser(user));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
      console.log(err.response.data.error);
    }
  };
};

export const isUserLoggedIn = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      commentService.setToken(user.token);
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(setUser(null));
    commentService.setToken(null);
  };
};

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
