const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db');
const config = require('../../config/defaultConfig');
const utility = require('../global_functions');

const checkAuth = (req, res, next) => {


  let token = req.headers['authorization'];

  // if token is not present
  if (!token) {
    return utility.badRequestError(res, 'No token provided.');
  }

  token = req.headers['authorization'].slice(7);

  // if token is present, verify the token
  jwt.verify(token, config.jwt.appSecret, (err, decoded) => {
    // if token is invalid
    if (err) {
      return utility.badRequestError(err, 'Failed to authenticate token.');
    }

    // if token is verified successfully
    next();
  });
}

module.exports = {
  checkAuth
}
