const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  playlistId: String,
  title: String,
  thumbnail: String,
  type: String,
  grade: Number,
});

playlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Playlist', playlistSchema);
