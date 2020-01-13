const db = require('../../db');

const getAllUsers = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM users';
        const {
            rows
        } = await db.query(query);
        return res.send(rows);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAllUsers
}