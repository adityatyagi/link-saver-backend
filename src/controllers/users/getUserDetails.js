const db = require('../../db');
const utility = require('../../global_functions');

const getUserByUserId = async (req, res, next) => {
  try {
    const query = 'SELECT user_id, name, email FROM users WHERE user_id = $1';
    const {
      user_id
    } = req.params;
    const {
      rows
    } = await db.query(query, [user_id]);

    if (rows.length) {
      return utility.successResponse(res, rows[0], 'Users details fetched successfully');
    } else {
      return utility.badRequestError(res, "Invalid user id");
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = getUserByUserId;
