import { createSlice } from '@reduxjs/toolkit';
import playlistService from '../services/playlists';

const playlistReducer = createSlice({
  name: 'playlists',
  initialState: [],
  reducers: {
    setPlaylists(_, action) {
      return action.payload;
    },
  },
});

export const initializePlaylists = () => {
  return async (dispatch) => {
    try {
      const playlists = await playlistService.getAll();
      dispatch(setPlaylists(playlists));
    } catch (err) {
      console.error(err);
    }
  };
};

export const { setPlaylists } = playlistReducer.actions;
export default playlistReducer.reducer;
