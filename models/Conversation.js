var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  lastMessageAt: { type: Date, default: 0 }
});

conversationSchema.statics.getForUser = function(userId, cb) {
  return this
    .find({ users: { $in: [userId] } })
    .sort({ lastMessageAt: -1 })
    .populate('users messages.sender messages.receiver')
    .exec(cb);
};

conversationSchema.pre('save', function(next) {
  if (this.messages && this.messages.length) {
    this.lastMessageAt = this.messages[this.messages.length - 1].createdAt;
  }
  
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);
