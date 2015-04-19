var User = require('../models/User');

/**
 * GET /roomie
 * Roomie form page.
 */
exports.getRoomie = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.render('roomie', {
      title: 'Roommate Finder',
      users: users.map(function(user) {
        if (!user.profile.picture) {
          user.profile.picture = user.gravatar(60);
        }

        return user;
      })
    });
  });
};
