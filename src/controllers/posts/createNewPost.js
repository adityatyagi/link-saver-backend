const db = require('../../db');

const createNewPost = async (req, res, next) => {
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
        await db.query(insertIntoLinksTable, [postTableRes.rows[0].post_id, [postData.link_urls]]);

        // get complete object - users, posts and links associated with these posts
        const postDetails = await db.postDetails(postTableRes.rows[0].post_id);

        return res
            .status(200)
            .send({
                message: "Post successfully created!",
                data: postDetails
            });
    } catch (error) {
        return next(error);
    }
};

module.exports = createNewPost;