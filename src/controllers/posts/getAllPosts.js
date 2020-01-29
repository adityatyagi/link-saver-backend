const db = require('../../db');
const utility = require('../../global_functions');

const getAllPosts = async (req, res, next) => {
  try {

    const {
      page,
      limit
    } = req.query;

    let currentPage = page ? page : '1';
    let itemsPerPage = limit ? limit : 10;
    currentPage = (currentPage - 1) * itemsPerPage;

    let totalCount = await db.rowCountInTable('posts');
    let lastPage = Math.ceil(totalCount / itemsPerPage);

    const getPostDetails = "select u.user_id, u.email, u.name, p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from users u inner join posts p on u.user_id = p.user_id inner join links l on p.post_id = l.post_id group by p.post_id, u.user_id, u.name, u.email limit $1 offset $2";

    const postDetails = await db.query(getPostDetails, [itemsPerPage, currentPage]);

    responseData = postDetails.rows.map(post => {
      const data = {
        user: {
          user_id: post.user_id,
          email: post.email,
          name: post.name
        },
        post: {
          post_id: post.post_id,
          title: post.title,
          description: post.description,
          link_urls: post.link_urls
        }
      }
      return data;
    })

    const resData = {
      postsList: responseData,
      lastPage: lastPage,
      totalCount: +totalCount
    }


    return utility.successResponse(res, resData, "All posts successfully fetched");
  } catch (error) {
    return utility.badRequestError(error, "Could not get posts.");
  }
};

module.exports = getAllPosts;
