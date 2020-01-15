const getAllUsers = require('./getAllUsers');
const createNewUser = require('./createNewUser');
const updateUser = require('./updateUser');
const getUserByUserId = require('./getUserByUserId');
const deleteUserByUserId = require('./deleteUserByUserId');

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    getUserByUserId,
    deleteUserByUserId
}