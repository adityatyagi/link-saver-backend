const db = require('./../db');
var passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../../config/defaultConfig.js');

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {

      db.query('SELECT * FROM users WHERE email=$1', [email])
        .then(userRes => {
          const user = userRes.rows[0];

          // if there is a user exists with these credentials
          if (user) {

            try {
              // check if the password is correct
              bcrypt.compare(password, user.password, function (err, res) {
                if (res) {
                  console.log({
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                  });

                  const payload = {
                    email: user.email,
                    id: user.user_id,
                    time: new Date()
                  };

                  // generate token
                  const token = jwt.sign(payload, config.jwt.appSecret);

                  cb(null, {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    token: token
                  });
                } else {
                  // if the email and password (credentials) by the user do not match with the database
                  console.log('Password is incorrect');
                  cb(null, false);
                }
              });
            } catch (error) {
              cb(null, false);
            }
            // check if the password is correct
            bcrypt.compare(password, user.password, function (err, res) {
              if (res) {
                console.log({
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email
                });

                const payload = {
                  email: user.email,
                  id: user.user_id,
                  time: new Date()
                };

                // generate token
                const token = jwt.sign(payload, config.jwt.appSecret);

                cb(null, {
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email,
                  token: token
                });
              } else {
                // if the email and password (credentials) by the user do not match with the database
                console.log('Password is incorrect');
                cb(null, false);
              }
            });
          } else {
            console.log('Email Id does not exists');
            cb(null, false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, cb) => {
  db.query(
    'SELECT user_id, name, email FROM users WHERE id = $1',
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
