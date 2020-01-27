const Router = require('express-promise-router');
const router = new Router();
const posts = require('../../controllers').postsController;
const authMiddleware = require('../../passport/auth');

const getAllPosts = router.get('/getAllPosts', authMiddleware.checkAuth, posts.getAllPosts);
const getAllPostsOfUser = router.get('/getAllPostsOfUser/:user_id', authMiddleware.checkAuth, posts.getAllPostsOfUser);
const createNewPost = router.post('/createNewPost', authMiddleware.checkAuth, posts.createNewPost);
const updatePost = router.put('/updatePost', authMiddleware.checkAuth, posts.updatePost);
const deletePost = router.delete('/deletePost', authMiddleware.checkAuth, posts.deletePost);




module.exports = [
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getAllPostsOfUser
];