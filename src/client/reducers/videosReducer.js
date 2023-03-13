import { createSlice } from '@reduxjs/toolkit';

const videosReducer = createSlice({
  name: 'videos',
  initialState: [],
  reducers: {
    setVideos(_, action) {
      return action.payload;
    },
  },
});

export const getVideos = (videos) => {
  return (dispatch) => {
    dispatch(setVideos(videos));
  };
};

export const { setVideos } = videosReducer.actions;
export default videosReducer.reducer;
