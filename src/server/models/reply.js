const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.ObjectId, ref: 'User' }],
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  date: Date,
});

replySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Reply', replySchema);
