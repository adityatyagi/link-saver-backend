const db = require('../../db');
const utility = require('../../global_functions');

const updateUser = async (req, res, next) => {
  try {
    const query =
      'UPDATE users SET name = $1, email = $2, updated_on = now() WHERE user_id = $3 RETURNING user_id, name, email';
    const {
      user_id,
      name,
      email
    } = req.body;

    const {
      rows
    } = await db.query(query, [name, email, user_id]);

    return utility.successResponse(res, rows[0], 'User updated successfully');
  } catch (error) {
    return utility.badRequestError(error, "Update of user failed");
  }
};

module.exports = updateUser;
