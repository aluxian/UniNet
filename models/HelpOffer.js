var mongoose = require('mongoose');

var helpOfferSchema = new mongoose.Schema({
  expertise: { type: String, enum: ['Student Orientation Guide', 'City Guide', 'Homework Helper', 'Paid Assistant'] },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HelpOffer', helpOfferSchema);
