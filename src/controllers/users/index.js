const getAllUsers = require('./getAllUsers');
const updateUser = require('./updateUser');
const getUserByUserId = require('./getUserDetails');
const deleteUserByUserId = require('./deleteUserByUserId');
const login = require('./login');
const register = require('./register');

module.exports = {
    getAllUsers,
    updateUser,
    getUserByUserId,
    deleteUserByUserId,
    login,
    register
}