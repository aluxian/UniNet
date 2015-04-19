var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: {type: String, required: true},
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now },
  type: {type: String, required: true, enum: ['Party', 'Other']}
});

module.exports = mongoose.model('Event', eventSchema);
