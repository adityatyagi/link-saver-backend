const Router = require('express-promise-router');
const router = new Router();
var passport = require('passport');
const authMiddleware = require('../../passport/auth');
const users = require('../../controllers').userController;

const register = router.post('/register', users.register);
const login = router.post('/login', passport.authenticate('local'), users.login);
const getAllUsers = router.get('/getAllUsers', authMiddleware.checkAuth, users.getAllUsers);
const updateUser = router.put('/updateUser', authMiddleware.checkAuth, users.updateUser);
const getUserByUserId = router.get('/getUserByUserId/:user_id', authMiddleware.checkAuth, users.getUserByUserId);
const deleteUserByUserId = router.delete('/deleteUserByUserId/:user_id', authMiddleware.checkAuth, users.deleteUserByUserId);


module.exports = [
  register,
  login,
  getAllUsers,
  updateUser,
  getUserByUserId,
  deleteUserByUserId
];
