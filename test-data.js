/**
 * Module dependencies.
 */
var async = require('async');
var mongoose = require('mongoose');
var fs = require('fs');

/**
 * API keys.
 */
var secrets = require('./config/secrets');

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Populate
 */
async.each(['Faculty'], function(modelName, next) {
  var Model = require('./models/' + modelName);
  var data = JSON.parse(fs.readFileSync('./test-data/' + modelName.toLowerCase() + '.json', 'utf-8'));

  Model.remove({}, function(err) {
    if (err) {
      console.error(err);
      return next();
    }

    console.log('Cleaned ' + modelName);

    async.each(data, function(jsonDoc, callback) {
      var doc = new Model(jsonDoc);
      doc.save(callback);
    }, function(err) {
      if (err) console.error(err);
      else console.log('Loaded ' + modelName);
      next();
    });
  });
}, function(err) {
  if (err) console.error(err);
  else console.log('All models loaded.');
  process.exit();
});
