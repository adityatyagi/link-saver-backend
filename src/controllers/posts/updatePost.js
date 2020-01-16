const db = require('../../db');

const updatePost = async (req, res, next) => {
    try {
        const postData = {
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
            link_urls: req.body.link_urls
        }

        const insertIntoPostsTable = 'INSERT INTO posts(title, description, user_id) VALUES($1, $2, $3) RETURNING post_id, title, description, user_id';
        const postTableRes = await db.query(insertIntoPostsTable, [postData.title, postData.description, postData.user_id]);

        const insertIntoLinksTable = "INSERT into links(post_id, link_url) values($1, unnest(array[$2::text[]]))";
        const linksTableRes = await db.query(insertIntoLinksTable, [postTableRes.rows[0].post_id, [postData.link_urls]]);

        // get complete object - users, posts and links associated with these posts
        const getPostDetails = "select u.user_id, u.email, u.name, p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from users u inner join posts p on u.user_id = p.user_id inner join links l on p.post_id = l.post_id where p.post_id = $1 group by p.post_id, u.user_id, u.name, u.email;";

        const postDetails = await db.query(getPostDetails, [postTableRes.rows[0].post_id]);

        return res
            .status(200)
            .send({
                message: "Post successfully created!",
                data: {
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
            });
    } catch (error) {
        return next(error);
    }
};

module.exports = updatePost;