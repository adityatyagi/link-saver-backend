const Router = require('express-promise-router');
const router = new Router();
var passport = require('passport');

const users = require('../../controllers').userController;

const register = router.post('/register', users.register);
const login = router.get('/login', passport.authenticate('local'), users.login);
const getAllUsers = router.get('/getAllUsers', users.getAllUsers);
const updateUser = router.put('/updateUser', users.updateUser);
const getUserByUserId = router.get('/getUserByUserId/:user_id', users.getUserByUserId);
const deleteUserByUserId = router.delete('/deleteUserByUserId/:user_id', users.deleteUserByUserId);



module.exports = [
  register,
  login,
  getAllUsers,
  updateUser,
  getUserByUserId,
  deleteUserByUserId
];