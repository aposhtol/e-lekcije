const express = require('express');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const { userExtractor } = require('../middleware');
const user = express();
const User = require('../models/user');

user.put('/:id', userExtractor, async (request, response) => {
  const { favorite } = request.body;

  const user = await User.findById(request.params.id);
  if (user.favorites.includes(favorite)) {
    return response
      .status(400)
      .json({ error: 'Već ste označili da vam se sviđa' });
  }

  const updatedFavorite = await User.findByIdAndUpdate(
    request.params.id,
    { $addToSet: { favorites: favorite } },
    { new: true }
  );
  response.json(updatedFavorite);
});

module.exports = user;
