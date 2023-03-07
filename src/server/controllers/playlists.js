const express = require('express');
const playlists = express();
const Playlist = require('../models/playlist');

playlists.get('/', async (_, res) => {
  const playlists = await Playlist.find({});
  res.send(playlists);
});

module.exports = playlists;
