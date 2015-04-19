var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  bookAuthor: { type: String, required: true },
  description: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now },
  price: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);
