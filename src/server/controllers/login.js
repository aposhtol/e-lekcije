const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = express();
const { userExtractor } = require('../middleware');
const User = require('../models/user');

login.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

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
    id: user.id,
    favorites: user.favorites,
  });
});

login.put('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const comment = await Comment.findById(request.params.id);
  if (comment.likedBy.includes(user.id)) {
    return response
      .status(400)
      .json({ message: 'Već ste označili da vam se sviđa' });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 }, $addToSet: { likedBy: user.id } },
    { new: true }
  );
  response.json(updatedComment);
});

module.exports = login;
