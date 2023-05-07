const express = require('express');
const replies = express();
const Reply = require('../models/reply');
const User = require('../models/user');
const { userExtractor } = require('../middleware');

/*replies.get('/', async (request, response) => {
  const { comment } = request.query;

  const replies = await Reply.find({ comment: comment })
    .populate('author', { username: 1 })
  response.json(replies);
});*/

replies.post('/', userExtractor, async (request, response) => {
  const { body, user } = request;

  if (body.content.length < 3) {
    return response.status(400).json({
      error: 'Komentar prekratak',
    });
  }

  const reply = new Reply({
    comment: body.comment,
    content: body.content,
    author: user.id,
    date: new Date(),
  });

  const savedReply = await reply.save();

  response.status(201).json(savedReply);
});

replies.put('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const reply = await Reply.findById(request.params.id);
  if (reply.likedBy.includes(user.id)) {
    return response
      .status(400)
      .json({ error: 'Već ste označili da vam se sviđa' });
  }

  const updatedReply = await Reply.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 }, $addToSet: { likedBy: user.id } },
    { new: true }
  );
  response.json(updatedReply);
});

module.exports = replies;
