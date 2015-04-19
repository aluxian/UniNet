/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    res.redirect('/feed');
  } else {
    res.redirect('/login')
  }
};
