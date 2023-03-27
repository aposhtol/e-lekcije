import { createSlice } from '@reduxjs/toolkit';
import playlistService from '../services/playlists';

const videosReducer = createSlice({
  name: 'videos',
  initialState: /*[
      {
        kind: 'youtube#playlistItem',
        etag: 'E9Fmm-sDN81cTab0V07e5_OYY6w',
        id: 'UExoc3hrZTRMMzlMa1NHclZqdENvUEhQazljdGxqU2V1Ui4yODlGNEE0NkRGMEEzMEQy',
        snippet: {
          publishedAt: '2021-10-18T11:10:06Z',
          channelId: 'UC7-CBGIJkbV7ms2C6grCtkA',
          title: 'Filozofija 4.r SŠ - Metafizika uvod i postavljanje problema',
          description:
            'Filozofija 4.r SŠ - Metafizika uvod i postavljanje problema\nAutori: Tomislav Reškovac / Nikolina Mišić\n\n\nPoveznice na dodatne sadržaje:\nhttps://bit.ly/3igS8qZ\nhttps://bit.ly/2ZlQkFK\n\n\nGodišnji izvedbeni kurikulum:\nhttps://mzo.gov.hr/vijesti/okvirni-godisnji-izvedbeni-kurikulumi-za-nastavnu-godinu-2020-2021/3929',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/n_N8vw_SwzU/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/n_N8vw_SwzU/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/n_N8vw_SwzU/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/n_N8vw_SwzU/sddefault.jpg',
              width: 640,
              height: 480,
            },
          },
          channelTitle: 'i-nastava',
          playlistId: 'PLhsxke4L39LkSGrVjtCoPHPk9ctljSeuR',
          position: 0,
          resourceId: {
            kind: 'youtube#video',
            videoId: 'n_N8vw_SwzU',
          },
          videoOwnerChannelTitle: 'i-nastava',
          videoOwnerChannelId: 'UC7-CBGIJkbV7ms2C6grCtkA',
        },
      },
    ]*/ [],
  reducers: {
    setVideos(_, action) {
      return action.payload;
    },
  },
});

export const getVideos = (playlistId) => {
  return async (dispatch, getState) => {
    try {
      //const state = getState();
      //const playlist = state.playlists.find((pl) => pl.playlistId === id);
      //const playlistId = playlist.playlistId;
      const videos = await playlistService.fetchVideos(playlistId);
      dispatch(setVideos(videos));
    } catch (err) {
      console.log(err.response.data.error);
    }
  };
};

export const { setVideos } = videosReducer.actions;
export default videosReducer.reducer;
