const db = require('../../db');
const utility = require('../../global_functions');

const getAllPostsOfUser = async (req, res, next) => {
  try {
    const {
      user_id
    } = req.params;

    const {
      page,
      limit
    } = req.query;

    let currentPage = page ? page : 1;
    let itemsPerPage = limit ? limit : 10;

    currentPage = (currentPage - 1) * itemsPerPage;

    let totalCount = await db.rowCountInTable('posts', user_id);
    let lastPage = Math.ceil(totalCount / itemsPerPage);

    // check if user exists
    if (!(await db.checkIfUserExists(user_id))) {
      return utility.badRequestError(
        res,
        'User does not exists with the given user id'
      );
    }

    const getAllPostsOfUserQuery = "select p.post_id, p.title, p.description, p.created_on, p.updated_on, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.user_id = $1 group by p.post_id limit $2 offset $3";
    const queryRes = await db.query(getAllPostsOfUserQuery, [user_id, itemsPerPage, currentPage]);

    const resData = {
      postsList: queryRes.rows,
      lastPage: lastPage,
      totalCount: +totalCount
    }

    return utility.successResponse(res, resData, 'All posts for users fetched successfully');
  } catch (error) {
    return utility.badRequestError(error, "Failed! Could not get all posts of user");
  }
}

module.exports = getAllPostsOfUser;
