const express = require('express');
const replies = express();
const Reply = require('../models/reply');
const User = require('../models/user');
const { userExtractor } = require('../middleware');

replies.get('/', async (request, response) => {
  const { video } = request.query;

  const comments = await Comment.find({ video: video })
    .populate('author', { username: 1 })
    .populate('replies', { content: 1 });
  response.json(comments);
});

module.exports = replies;
