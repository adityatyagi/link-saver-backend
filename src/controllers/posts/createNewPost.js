const db = require('../../db');
const utility = require('../../global_functions');

const createNewPost = async (req, res, next) => {
  try {
    const postData = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      link_urls: req.body.link_urls
    }

    if (!await db.checkIfUserExists(postData.user_id)) {
      return utility.badRequestError(
        res,
        'User does not exists with the given user id'
      );
    }

    const insertIntoPostsTable = 'INSERT INTO posts(title, description, user_id) VALUES($1, $2, $3) RETURNING post_id, title, description, user_id';
    const postTableRes = await db.query(insertIntoPostsTable, [postData.title, postData.description, postData.user_id]);

    const insertIntoLinksTable = "INSERT into links(post_id, link_url) values($1, unnest(array[$2::text[]]))";
    await db.query(insertIntoLinksTable, [postTableRes.rows[0].post_id, [postData.link_urls]]);

    // get complete object - users, posts and links associated with these posts
    const postDetails = await db.postDetails(postTableRes.rows[0].post_id);

    return utility.successResponse(res, postDetails, "Post successfully created!");
  } catch (error) {
    console.log(error);
    return utility.badRequestError(error, "Failed! Could not create new post");
  }
};

module.exports = createNewPost;
