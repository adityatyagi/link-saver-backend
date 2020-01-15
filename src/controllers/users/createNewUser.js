const db = require('../../db');

const createNewUser = async (req, res, next) => {
    try {
        const query = 'INSERT INTO users(name, email, pwd) VALUES($1, $2, $3) RETURNING user_id, name, email';
        const {
            name,
            email,
            pwd
        } = req.body;
        const {
            rows
        } = await db.query(query, [name, email, pwd]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}


module.exports = createNewUser;