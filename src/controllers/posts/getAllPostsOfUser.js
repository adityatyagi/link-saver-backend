const db = require('../../db');
const utility = require('../../global_functions');

const getAllPostsOfUser = async (req, res, next) => {
  try {
    const {
      user_id
    } = req.params;

    // check if user exists
    if (!(await db.checkIfUserExists(user_id))) {
      return utility.badRequestError(
        res,
        'User does not exists with the given user id'
      );
    }

    const getAllPostsOfUserQuery = "select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.user_id = $1 group by p.post_id";
    const queryRes = await db.query(getAllPostsOfUserQuery, [user_id]);

    return utility.successResponse(res, queryRes.rows, 'All posts for users fetched successfully');
  } catch (error) {
    return utility.badRequestError(error, "Failed! Could not get all posts of user");
  }
}

module.exports = getAllPostsOfUser;
