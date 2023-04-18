const express = require('express');
const comments = express();
const Comment = require('../models/comment');
const User = require('../models/user');
const { userExtractor } = require('../middleware');

comments.get('/', async (request, response) => {
  const { video } = request.query;

  const comments = await Comment.find({ video: video })
    .populate('author', { username: 1 })
    .populate('replies', { content: 1 });
  response.json(comments);
});

comments.post('/', userExtractor, async (request, response) => {
  const { body, user } = request;

  const comment = new Comment({
    video: body.video,
    content: body.content,
    author: user.id,
  });

  const savedComment = await comment.save();

  response.status(201).json(savedComment);
});

comments.put('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const comment = await Comment.findById(request.params.id);
  if (comment.likedBy.includes(user.id)) {
    return response
      .status(400)
      .json({ message: 'You have already liked this comment.' });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 }, $addToSet: { likedBy: user.id } },
    { new: true }
  );
  response.json(updatedComment);
});

comments.delete('/:id', userExtractor, async (request, response) => {
  const comment = await Comment.findById(request.params.id);

  if (comment.author.toString() === request.user.id.toString()) {
    await Comment.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).send({
      error: 'Unauthorized',
    });
  }
});

module.exports = comments;
