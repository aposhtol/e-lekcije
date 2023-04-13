const express = require('express');
const router = express.Router();
const playlists = require('../controllers/playlists');
const register = require('../controllers/register');
const login = require('../controllers/login');

router.use('/api/playlists', playlists);
router.use('/api/register', register);
router.use('/api/login', login);

module.exports = router;
