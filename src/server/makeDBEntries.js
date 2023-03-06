const playlists = require('./playlists.json');
const mongoose = require('mongoose');
require('dotenv').config();

// extract needed properties from playlists and assign them to a new array of playlist objects
let newObj = playlists.map((list) =>
  Object.assign(
    {},
    {
      playlistId: list.id,
      title: list.snippet.title,
      thumbnail: list.snippet.thumbnails.maxres
        ? list.snippet.thumbnails.maxres.url
        : list.snippet.thumbnails.standard
        ? list.snippet.thumbnails.standard.url
        : list.snippet.thumbnails.high.url,
    }
  )
);

// add type of education and subject grade to the array of playlist objects
newObj.map((obj) => {
  for (const prop in obj) {
    if (obj[prop].includes('SŠ')) {
      obj.type = 'high';
    }
    if (obj[prop].includes('OŠ')) {
      obj.type = 'elem';
    }
    if (prop === 'title') {
      obj.grade = Number(obj[prop].charAt(0));
    }
  }
});

// make schema of playlist and compile it to a model
const playlistSchema = mongoose.Schema({
  playlistId: String,
  title: String,
  thumbnail: String,
  type: String,
  grade: Number,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

mongoose
  .connect('process.env.MONGODB_URI')
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message);
  });

// iterate through array of playlist objects and save each to MongoDB according to a schema
newObj.forEach(async (obj) => {
  const playlist = new Playlist({
    playlistId: obj.playlistId,
    title: obj.title,
    thumbnail: obj.thumbnail,
    type: obj.type,
    grade: obj.grade,
  });

  await playlist.save();
});

mongoose.connection.close();
