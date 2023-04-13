const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = express();
const User = require('../models/user');

login.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({
      error: 'Neispravno korisničko ime ili lozinka',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: user.username,
  });
});

module.exports = login;
