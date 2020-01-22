const db = require('../../db');
const bcrypt = require('bcrypt');

// get all users
const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            pwd
        } = req.body;

        // hashing the password - encrypting the password
        // higher the number, more time it will take to hash the password but more secure it will be
        const saltRounds = 10;
        bcrypt.hash(pwd, saltRounds, function (err, hash) {
            createUserQuery = 'INSERT INTO users(name, email, pwd) VALUES($1, $2, $3) RETURNING user_id, name, email';
            db.query(createUserQuery, [name, email, hash]).then(userRes => {
                const user = userRes.rows[0];
                res.status(200).send({
                    data: user,
                    message: 'User registered successfully!'
                });
            }).catch((error) => {
                return next(error);
            })
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = register;