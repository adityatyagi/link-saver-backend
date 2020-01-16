const Router = require('express-promise-router');
const router = new Router();
const posts = require('../../controllers').postsController;

const createNewPost = router.post('/createNewPost', posts.createNewPost);


module.exports = [
    createNewPost
];