const Router = require('express-promise-router');
const router = new Router();

const users = require('../../controllers').userController;

router.get('/getAllUsers', users.getAllUsers);

module.exports = router;