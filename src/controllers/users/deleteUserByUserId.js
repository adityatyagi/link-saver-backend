const db = require('../../db');

// delete user by user id
const deleteUserByUserId = async (req, res, next) => {
    try {
        const query = 'DELETE FROM users WHERE user_id = $1';
        const {
            user_id
        } = req.params;
        const {
            rows
        } = await db.query(query, [user_id]);
        return res.send({
            status: 200,
            message: 'User deleted successfully!'
        });
    } catch (error) {
        return next(error);
    }
}


module.exports = deleteUserByUserId;