import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import playlistReducer from './reducers/playlistReducer';
import gradesReducer from './reducers/gradesReducer';
import videosReducer from './reducers/videosReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import commentsReducer from './reducers/commentsReducer';
import favReducer from './reducers/favReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['notification'],
};

const rootReducer = combineReducers({
  playlists: playlistReducer,
  grades: gradesReducer,
  videos: videosReducer,
  user: userReducer,
  notification: notificationReducer,
  comments: commentsReducer,
  favs: favReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
