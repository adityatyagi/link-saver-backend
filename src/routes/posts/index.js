const Router = require('express-promise-router');
const router = new Router();
const posts = require('../../controllers').postsController;

const getAllPosts = router.get('/getAllPosts', posts.getAllPosts);
const getAllPostsOfUser = router.get('/getAllPostsOfUser/:user_id', posts.getAllPostsOfUser);
const createNewPost = router.post('/createNewPost', posts.createNewPost);
const updatePost = router.put('/updatePost', posts.updatePost);
const deletePost = router.delete('/deletePost', posts.deletePost);




module.exports = [
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getAllPostsOfUser
];