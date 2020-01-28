const config = require('../../config/defaultConfig');
const {
  Pool
} = require('pg');

// development db
const pool = new Pool({
  user: config.db_dev.user,
  host: config.db_dev.host,
  database: config.db_dev.database,
  password: config.db_dev.password,
  port: config.db_dev.port,
});

// prod db
// const pool = new Pool({
//   user: config.db_prod.user,
//   host: config.db_prod.host,
//   database: config.db_prod.database,
//   password: config.db_prod.password,
//   port: config.db_prod.port
// });

module.exports = {
  // a generic query, that executes all queries you send to it
  query: (text, params) => {
    return pool.query(text, params);
  },
  postDetailsWithUserInfo: async (postId, userId) => {
    const getPostDetails =
      "select u.user_id, u.email, u.name, p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from users u inner join posts p on u.user_id = p.user_id inner join links l on p.post_id = l.post_id where p.post_id = $1 and p.user_id = $2 group by p.post_id, u.user_id, u.name, u.email;";

    const postDetails = await pool.query(getPostDetails, [postId, userId]);

    return {
      user: {
        user_id: postDetails.rows[0].user_id,
        email: postDetails.rows[0].email,
        name: postDetails.rows[0].name
      },
      post: {
        post_id: postDetails.rows[0].post_id,
        title: postDetails.rows[0].title,
        description: postDetails.rows[0].description,
        link_urls: postDetails.rows[0].link_urls
      }
    };
  },
  postDetails: async postId => {
    const postDetails =
      "select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.post_id = $1 group by p.post_id";

    const postDetailsRes = await pool.query(postDetails, [postId]);
    return postDetailsRes.rows[0];
  }
};
