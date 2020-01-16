const Router = require('express-promise-router');
const router = new Router();
const posts = require('../../controllers').postsController;

const getAllPosts = router.get('/getAllPosts', posts.getAllPosts);
const createNewPost = router.post('/createNewPost', posts.createNewPost);
const updatePost = router.put('/updatePost', posts.updatePost);


module.exports = [
    getAllPosts,
    createNewPost,
    updatePost
];