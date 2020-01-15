const db = require('../../db');

const updateUser = async (req, res, next) => {
    try {
        const query = 'UPDATE users SET name = $1, email = $2, pwd = $3, updated_at = $4 WHERE user_id = $5 RETURNING user_id, name, email';
        const {
            user_id,
            name,
            email,
            pwd
        } = req.body;

        // update the updated_at timestamp
        const updated_at = new Date();

        const {
            rows
        } = await db.query(query, [name, email, pwd, updated_at, user_id]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}


module.exports = updateUser;