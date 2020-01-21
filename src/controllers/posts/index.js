const createNewPost = require('./createNewPost');
const getAllPosts = require('./getAllPosts');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}