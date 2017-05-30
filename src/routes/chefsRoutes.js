var express = require('express');
var passport = require('passport');
var router = express.Router();

// /api/chefs/signup
// Signup for chefs
router.post('/signup', function(req, res, next) {
  return passport.authenticate('local-signup-chef', function(err) {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    return res.status(200).json({
      success: true
    });
  })(req, res, next);
});

module.exports = router;