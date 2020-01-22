const Router = require('express-promise-router');
const router = new Router();
var passport = require('passport');

const login = router.get(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true
  })
);

module.exports = [login];
