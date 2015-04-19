var async = require('async');
var Event = require('../models/Event');
var User = require('../models/User');

/**
 * GET /feed
 * Feed page.
 */
exports.index = function(req, res, next) {
  async.parallel({
    events: function(callback) {
      Event.find({}).sort({ createdAt: 'desc' }).populate('author faculty').limit(50).exec(function(err, posts) {
        callback(err, posts);
      });
    },
    friends: function(callback) {
      User.find({}, function(err, users) {
        callback(err, users);
      });
    }
  }, function(err, result) {
    if (err) return next(err);

    res.render('events', {
      title: 'Social Events',
      events: result.events,
      friends: result.friends
    });
  });
};

/**
 * POST /feed
 * Create a new post.
 */
exports.createEvent = function(req, res, next) {
  req.assert('name', 'Event name is required.').notEmpty();
  req.assert('body', 'Event body is required.').notEmpty();
  req.assert('type', 'Event type is required.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/events');
  }

  var event = new Event({
    name: req.body.name,
    body: req.body.body,
    author: req.user._id,
    faculty: req.user.faculty,
    type: req.body.type
  });

  event.save(function(err, event) {
    if (err) return next(err);
    res.redirect('/events');
  });
};
