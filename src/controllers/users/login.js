const db = require('../../db');

// get all users
const login = async (req, res, next) => {
  try {
    const {
      user
    } = req;

    // update last login time and jwt token in the table for JWT STRATEGY

    res.status(200).send({
      message: 'Login Successfull',
      data: user
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = login;
