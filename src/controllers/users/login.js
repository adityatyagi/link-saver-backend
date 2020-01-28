const db = require('../../db');
const utility = require('../../global_functions');

// get all users
const login = async (req, res, next) => {
  try {
    const {
      user
    } = req;

    // update last login time and jwt token in the table for JWT STRATEGY
    await db.query('update users set last_login = now() where user_id=$1', [user.user_id]);

    res.setHeader('Authorization', user.token);
    res.setHeader('access-control-expose-headers', 'authorization');

    delete user.token;

    return utility.successResponse(res, user, "Login Successfull");
  } catch (error) {
    // return next(error);
    return utility.badRequestError(error, "Login Failed");
  }
}

module.exports = login;
