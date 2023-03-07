import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './reducers/playlistReducer';

const store = configureStore({
  reducer: {
    playlists: playlistReducer,
  },
});

export default store;
