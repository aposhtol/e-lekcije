const express = require('express');
const register = express();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

register.post('/', async (req, res) => {
  const { username, password, confirm } = req.body;

  if (password !== confirm) {
    return res.status(400).send({
      error: 'Lozinke se ne podudaraju. Molimo ponovite.',
    });
  }

  /*if (!username || !password || !confirm) {
    return res.status(400).send({
      error: 'Username and password required.',
    });
  }*/

  if (username.length < 4 || password.length < 8) {
    return res.status(400).json({
      error: 'Korisničko ime ili lozinka prekratki.',
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: 'Ovo ime se već koristi. Molimo izaberite drugo.',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  //response.status(201).send(savedUser);
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: savedUser.username,
  });
});

module.exports = register;
