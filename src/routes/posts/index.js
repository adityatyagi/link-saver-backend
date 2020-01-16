const Router = require('express-promise-router');
const router = new Router();
const posts = require('../../controllers').postsController;

const getAllPosts = router.post('/getAllPosts', posts.getAllPosts);
const createNewPost = router.post('/createNewPost', posts.createNewPost);


module.exports = [
    getAllPosts,
    createNewPost
];