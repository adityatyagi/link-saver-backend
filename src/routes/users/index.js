const Router = require('express-promise-router');
const router = new Router();

const users = require('../../controllers').userController;

const getAllUsers = router.get('/getAllUsers', users.getAllUsers);
const createNewUser = router.post('/createNewUser', users.createNewUser);
const updateUser = router.put('/updateUser', users.updateUser);
const getUserByUserId = router.get('/getUserByUserId/:user_id', users.getUserByUserId);
const deleteUserByUserId = router.delete('/deleteUserByUserId/:user_id', users.deleteUserByUserId);



module.exports = [
  getAllUsers,
  createNewUser,
  updateUser,
  getUserByUserId,
  deleteUserByUserId
];