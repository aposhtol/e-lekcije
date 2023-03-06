const fs = require('fs');
require('dotenv').config();

const channelId = 'UC7-CBGIJkbV7ms2C6grCtkA';
const apiKey = 'process.env.YOUTUBE_API_KEY';

// get all 400+ playlists from i-nastava youtube channel and store it to playlists.json
const getPlaylists = async () => {
  let playlists = [];
  let nextPageToken = '';

  do {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
    );
    const data = await response.json();

    playlists = playlists.concat(data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  fs.writeFileSync('playlists.json', JSON.stringify(playlists));
};

getPlaylists();
