import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './reducers/playlistReducer';
import gradesReducer from './reducers/gradesReducer';

const store = configureStore({
  reducer: {
    playlists: playlistReducer,
    grades: gradesReducer,
  },
});

export default store;
