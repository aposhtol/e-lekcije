const express = require('express');
const router = express.Router();
const playlists = require('../controllers/playlists');

router.use('/api/playlists', playlists);

module.exports = router;
