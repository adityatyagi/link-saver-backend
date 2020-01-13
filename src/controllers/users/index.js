const db = require('../../db');

// get all users
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

// create new user
const createNewUser = async (req, res, next) => {
    try {
        const query = 'INSERT INTO users(name, password) VALUES($1, $2) RETURNING user_id, name';
        const {
            name,
            password
        } = req.body;
        const {
            rows
        } = await db.query(query, [name, password]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}

// update user - username and password
const updateUser = async (req, res, next) => {
    try {
        const query = 'UPDATE users SET name = $1, password = $2 WHERE user_id = $3';
        const {
            user_id,
            name,
            password
        } = req.body;
        const rows = await db.query(query, [name, password, user_id]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}

// get a particular user by user id
const getUserByUserId = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const {
            user_id
        } = req.params;
        const {
            rows
        } = await db.query(query, [user_id]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}

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

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    getUserByUserId,
    deleteUserByUserId
}