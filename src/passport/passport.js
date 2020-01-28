const db = require('./../db');
var passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../../config/defaultConfig.js');
require('../global_functions');

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done) {
      let user;
      // check if the user with this email exisits
      try {
        const userRes = await db.query('SELECT * FROM users WHERE email=$1', [email]);
        user = userRes.rows[0];
        if (!user) {
          return done(null, false);
        }

      } catch (e) {
        return done(e);
      }

      // check the password
      if (!await comparePassword(password, user.password)) {
        return done(null, false);
      }

      // if email and passwords are correct, generate jwt token
      const payload = {
        email: user.email,
        user_id: user.user_id,
        time: new Date()
      };

      // generate token
      const token = await getJWT(payload, config.jwt.appSecret);
      // console.log('user', user);
      return done(null, {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        token: token
      });
    }
  )
);


async function getJWT(payload, secret) {
  return await jwt.sign(payload, secret);
}

async function comparePassword(password, passwordToCompareWith) {
  if (!password)
    return false;

  let pass = await bcrypt.compare(password, passwordToCompareWith);
  return pass;
}

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, cb) => {
  db.query(
    'SELECT user_id, name, email FROM users WHERE user_id = $1',
    [parseInt(user_id, 10)],
    (err, results) => {
      if (err) {
        // winston.error('Error when selecting user on session deserialize', err);
        console.log('Error when selecting user on session deserialize');
        return cb(err);
      }
      cb(null, results.rows[0]);
    }
  );
});

module.exports = passport;
