var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
