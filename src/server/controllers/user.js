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
    const updatedFavorite = await User.findByIdAndUpdate(
      request.params.id,
      { $pull: { favorites: favorite } },
      { new: true }
    );
    response.json(updatedFavorite);
  }

  const updatedFavorite = await User.findByIdAndUpdate(
    request.params.id,
    { $addToSet: { favorites: favorite } },
    { new: true }
  );
  response.json(updatedFavorite);
});

module.exports = user;
