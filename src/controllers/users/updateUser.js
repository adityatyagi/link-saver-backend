const db = require('../../db');

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
    return res.status(200).send({
      message: 'User updated successfully',
      data: rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = updateUser;