const db = require('../../db');

const deletePost = async (req, res, next) => {
    try {

        // delete post by post_id and user_id
        const {
            post_id,
            user_id
        } = req.body;

        const deletePost = 'delete from posts where post_id = $1 and user_id = $2;'

        await db.query(deletePost, [post_id, user_id]);
        res.status(200).send({
            message: 'Post deleted successfully'
        });

    } catch (error) {
        return next(error);
    }
}

module.exports = deletePost;