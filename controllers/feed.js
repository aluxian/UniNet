var async = require('async');
var Post = require('../models/Post');
var User = require('../models/User');

/**
 * GET /feed
 * Feed page.
 */
exports.index = function(req, res, next) {
  async.parallel({
    posts: function(callback) {
      Post.find({}).sort({ createdAt: 'desc' }).populate('author faculty').limit(50).exec(function(err, posts) {
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

    console.log(result);

    res.render('feed', {
      title: 'Feed',
      posts: result.posts,
      friends: result.friends
    });
  });
};

/**
 * POST /feed
 * Create a new post.
 */
exports.createPost = function(req, res, next) {
  req.assert('body', 'Post body is required.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/feed');
  }

  var post = new Post({
    body: req.body.body,
    author: req.user._id,
    faculty: req.user.faculty
  });

  post.save(function(err, post) {
    if (err) return next(err);
    res.redirect('/feed');
  });
};
