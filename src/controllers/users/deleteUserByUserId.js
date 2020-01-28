const db = require('../../db');
const utility = require('../../global_functions');

// delete user by user id
const deleteUserByUserId = async (req, res, next) => {
  try {
    const {
      user_id
    } = req.params;

    // check if the user exists
    const userRes = await db.query('select * from users where user_id = $1', [user_id]);
    if (!userRes.rows.length) {
      return utility.badRequestError(res, "User with this user id does not exist");
    }

    await db.query('delete from users where user_id = $1', [user_id]);

    return utility.noContentResponse(res, 'User deleted successfully!');
  } catch (error) {
    return utility.badRequestError(error, "Failed! Cannot delete user");
  }
}


module.exports = deleteUserByUserId;
