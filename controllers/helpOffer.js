var async = require('async');
var HelpOffer = require('../models/HelpOffer');
var User = require('../models/User');

exports.index = function(req, res, next) {
  async.parallel({
    offers: function(callback) {
      HelpOffer.find({}).sort({ createdAt: 'desc' }).populate('author faculty').limit(50).exec(function(err, offers) {
        callback(err, offers);
      });
    },
    friends: function(callback) {
      User.find({}, function(err, users) {
        callback(err, users);
      });
    }
  }, function(err, result) {
    if (err) return next(err);

    res.render('help', {
      title: 'Help',
      offers: result.offers,
      friends: result.friends
    });
  });
};

exports.create = function(req, res, next) {
  req.assert('expertise', 'Expertise is required.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/helpOffers');
  }

  var helpOffer = new HelpOffer({
    expertise: req.body.expertise,
    author: req.user._id,
    faculty: req.user.faculty
  });

  helpOffer.save(function(err) {
    if (err) return next(err);
    res.redirect('/help');
  });
};
