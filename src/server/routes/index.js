const express = require('express');
const router = express.Router();
const playlists = require('../controllers/playlists');
const register = require('../controllers/register');
const login = require('../controllers/login');
const comments = require('../controllers/comments');
const replies = require('../controllers/replies');

router.use('/api/playlists', playlists);
router.use('/api/register', register);
router.use('/api/login', login);
router.use('/api/comments', comments);
router.use('/api/replies', replies);

module.exports = router;
