var mongoose = require('mongoose');

var facultySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Faculty', facultySchema);
