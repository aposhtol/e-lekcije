import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import registerService from '../services/register';
import commentService from '../services/comments';
import userService from '../services/user';
import { setNotification } from './notificationReducer';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    /*setFav(state, action) {
      //const newFav = action.payload.favorite;

      return state.map((user) => (user.favorites = action.payload.favorites));
    },*/
  },
});

export const register = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await registerService.register(userObj);

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      commentService.setToken(user.token);
      userService.setToken(user.token);

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

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      commentService.setToken(user.token);
      userService.setToken(user.token);

      dispatch(setUser(user));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
      console.log(err.response.data.error);
    }
  };
};

export const isUserLoggedIn = () => {
  return () => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      commentService.setToken(user.token);
      userService.setToken(user.token);
    }
  };
};

export const setFavorite = (id, favorite) => {
  return async (dispatch) => {
    try {
      const response = await userService.update(id, favorite);
      dispatch(setUser(response));
      //window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      //dispatch(setNotification(`You liked ${updatedBlog.title}!`, 5000));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedAppUser');
    dispatch(setUser(null));
    commentService.setToken(null);
    userService.setToken(null);
  };
};

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
