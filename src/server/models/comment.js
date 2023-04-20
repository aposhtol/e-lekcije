const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  video: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.ObjectId, ref: 'User' }],
  replies: [{ type: mongoose.ObjectId, ref: 'Reply' }],
  date: Date,
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
