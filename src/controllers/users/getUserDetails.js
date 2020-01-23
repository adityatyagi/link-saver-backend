const db = require('../../db');

const getUserByUserId = async (req, res, next) => {
    try {
        const query = 'SELECT user_id, name, email FROM users WHERE user_id = $1';
        const {
            user_id
        } = req.params;
        const {
            rows
        } = await db.query(query, [user_id]);
        return res.status(200).send({
            message: 'Users details fetched successfully',
            data: rows[0]
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = getUserByUserId;