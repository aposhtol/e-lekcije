import { createSlice } from '@reduxjs/toolkit';
import playlistService from '../services/playlists';
import { setNotification } from './notificationReducer';

const videosReducer = createSlice({
  name: 'videos',
  initialState: [],
  reducers: {
    setVideos(_, action) {
      return action.payload;
    },
  },
});

export const getVideos = (playlistId) => {
  return async (dispatch, getState) => {
    try {
      const videos = await playlistService.fetchVideos(playlistId);
      dispatch(setVideos(videos));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const { setVideos } = videosReducer.actions;
export default videosReducer.reducer;
