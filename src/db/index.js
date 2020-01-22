const {
    Pool
} = require('pg');

const pool = new Pool({
    user: 'aditya',
    host: 'localhost',
    database: 'linksaver',
    password: 'toor',
    port: 5432,
});


module.exports = {
    // a generic query, that executes all queries you send to it
    query: (text, params) => {
        return pool.query(text, params)
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
        }
    },
    postDetails: async (postId) => {
        const postDetails = "select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.post_id = $1 group by p.post_id";

        const postDetailsRes = await pool.query(postDetails, [postId]);
        console.log(postDetailsRes.rows);
        return postDetailsRes.rows[0];
    }
}