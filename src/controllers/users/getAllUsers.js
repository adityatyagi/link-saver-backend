const db = require('../../db');
const utility = require('../../global_functions');

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const query = 'SELECT user_id, name, email FROM users';
    const {
      rows
    } = await db.query(query);

    return utility.successResponse(res, rows, 'All users fetched successfully');
  } catch (error) {
    return utility.badRequestError(error, "Failed to get users list");
  }
}

module.exports = getAllUsers;
