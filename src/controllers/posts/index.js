const createNewPost = require('./createNewPost');
const getAllPosts = require('./getAllPosts');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');
const getAllPostsOfUser = require('./getAllPostsOfUser');

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getAllPostsOfUser
}