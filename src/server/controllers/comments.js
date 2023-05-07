const express = require('express');
const comments = express();
const Comment = require('../models/comment');
const User = require('../models/user');
const { userExtractor } = require('../middleware');

comments.get('/', async (request, response) => {
  const { video } = request.query;

  const comments = await Comment.find({ video: video })
    .populate('author', { username: 1 })
    .populate('replies', { content: 1, author: 1 });
  response.json(comments);
});

comments.post('/', userExtractor, async (request, response) => {
  const { body, user } = request;

  if (body.content.length < 3) {
    return response.status(400).json({
      error: 'Komentar prekratak',
    });
  }

  const comment = new Comment({
    video: body.video,
    content: body.content,
    author: user.id,
    date: new Date(),
  });

  const savedComment = await comment.save();

  response.status(201).json(savedComment);
});

comments.put('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const comment = await Comment.findById(request.params.id);
  if (comment.likedBy.includes(user.id)) {
    const updatedComment = await Comment.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: -1 }, $pull: { likedBy: user.id } },
      { new: true }
    );
    return response.json(updatedComment);
    /*return response
      .status(400)
      .json({ error: 'Već ste označili da vam se sviđa' });*/
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
