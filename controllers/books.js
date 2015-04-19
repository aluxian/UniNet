var async = require('async');
var Book = require('../models/Book');
var User = require('../models/User');

exports.index = function(req, res, next) {
  async.parallel({
    books: function(callback) {
      Book.find({}).sort({ createdAt: 'desc' }).populate('author faculty').limit(50).exec(function(err, books) {
        callback(err, books);
      });
    },
    friends: function(callback) {
      User.find({}, function(err, users) {
        callback(err, users);
      });
    }
  }, function(err, result) {
    if (err) return next(err);

    res.render('books', {
      title: 'Book Bazaar',
      books: result.books,
      friends: result.friends
    });
  });
};

exports.create = function(req, res, next) {
  req.assert('title', 'Book title is required.').notEmpty();
  req.assert('bookAuthor', 'Book author is required.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/books');
  }

  var event = new Book({
    title: req.body.title,
    bookAuthor: req.body.bookAuthor,
    author: req.user._id,
    faculty: req.user.faculty,
    price: req.user.price
  });

  event.save(function(err, event) {
    if (err) return next(err);
    res.redirect('/books');
  });
};
