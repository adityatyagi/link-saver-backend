const db = require('../../db');

const getAllPosts = async (req, res, next) => {
    try {
        const getPostDetails = "select u.user_id, u.email, u.name, p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from users u inner join posts p on u.user_id = p.user_id inner join links l on p.post_id = l.post_id group by p.post_id, u.user_id, u.name, u.email;";

        const postDetails = await db.query(getPostDetails);

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

        return res.status(200).send(responseData);
    } catch (error) {
        return next(error);
    }
};

module.exports = getAllPosts;