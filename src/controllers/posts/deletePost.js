const db = require('../../db');
const utility = require('../../global_functions');

const deletePost = async (req, res, next) => {
  try {
    // delete post by post_id and user_id
    const { post_id, user_id } = req.body;

    // check if user exists
    if (!(await db.checkIfUserExists(user_id))) {
      return utility.badRequestError(
        res,
        'User does not exists with the given user id'
      );
    }

    // check if the post exist for the given user id
    if (!(await db.checkIfPostsExistsForUser(post_id, user_id))) {
      return utility.badRequestError(
        res,
        'Post does not exists with the given post id and user id'
      );
    }

    await db.query('delete from posts where post_id = $1 and user_id = $2;', [
      post_id,
      user_id
    ]);

    return utility.noContentResponse(res, 'Post deleted successfully!');
  } catch (error) {
    return utility.badRequestError(error, 'Failed! Cannot delete post');
  }
};

module.exports = deletePost;
