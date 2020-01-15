const db = require('../../db');

// get all users
const getAllUsers = async (req, res, next) => {
    try {
        const query = 'SELECT user_id, name, email FROM users';
        const {
            rows
        } = await db.query(query);
        return res.send(rows);
    } catch (error) {
        return next(error);
    }
}

module.exports = getAllUsers;