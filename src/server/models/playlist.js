const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  playlistId: { type: String, unique: true },
  title: String,
  thumbnail: String,
  type: String,
  grade: Number,
});

// Compound index for filtering by type and grade
playlistSchema.index({ type: 1, grade: 1 });
playlistSchema.index({ playlistId: 1 }); // For lookups by YouTube playlist ID

playlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Playlist', playlistSchema);
