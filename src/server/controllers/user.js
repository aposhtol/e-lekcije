const express = require('express');
const { userExtractor } = require('../middleware');
const user = express();
const User = require('../models/user');

user.put('/:id', userExtractor, async (request, response) => {
  const { favorite, action } = request.body;

  let updateQuery;
  if (action === 'add') {
    updateQuery = { $addToSet: { favorites: favorite } };
  } else if (action === 'remove') {
    updateQuery = { $pull: { favorites: favorite } };
  } else {
    return res.status(400).json({ error: 'Invalid action specified.' });
  }

  const updatedFavorite = await User.findByIdAndUpdate(
    request.params.id,
    updateQuery,
    { new: true }
  );
  response.json(updatedFavorite);
});

module.exports = user;
