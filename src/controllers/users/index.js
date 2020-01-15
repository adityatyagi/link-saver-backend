const getAllUsers = require('./getAllUsers');
const createNewUser = require('./createNewUser');
const updateUser = require('./updateUser');
const getUserByUserId = require('./getUserDetails');
const deleteUserByUserId = require('./deleteUserByUserId');

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    getUserByUserId,
    deleteUserByUserId
}