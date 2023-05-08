import { createSlice } from '@reduxjs/toolkit';
import playlistService from '../services/playlists';
import { setNotification } from './notificationReducer';

const favReducer = createSlice({
  name: 'favs',
  initialState: [{}],
  reducers: {
    setFavs(_, action) {
      return action.payload;
    },
  },
});

export const getFavorites = (videolist) => {
  return async (dispatch, getState) => {
    try {
      const favs = await playlistService.fetchFavorites(videolist);
      dispatch(setFavs(favs));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const { setFavs } = favReducer.actions;
export default favReducer.reducer;
