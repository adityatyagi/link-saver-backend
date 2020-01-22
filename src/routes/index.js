const authentication = require('./authentication');
const users = require('./users');
const posts = require('./posts');

module.exports = [
  users,
  posts,
  authentication
];