const db = require('./../db');
var passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd'
    },
    (email, pwd, cb) => {
      console.log(email, pwd);

      db.query('SELECT * FROM users WHERE email=$1', [email])
        .then(userRes => {
          const user = userRes.rows[0];

          console.log(user);

          // if there is a user exists with these credentials
          if (user) {
            // check if the password is correct
            console.log(pwd, user.pwd);
            bcrypt.compare(pwd, user.pwd, function(err, res) {
              if (res) {
                console.log({
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email
                });
                cb(null, {
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email
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
