const db = require('../../db');

const updateLink = async (req, res, next) => {
    try {
        const query = 'UPDATE links SET title = $1, link_url = $2, description = $3, updated_at = $4 WHERE link_id = $5 AND user_id = $6 RETURNING link_id, title, link_url, description, user_id';

        const {
            title,
            link_url,
            description,
            user_id,
            link_id
        } = req.body;

        // update the updated_at timestamp
        const updated_at = new Date();

        const {
            rows
        } = await db.query(query, [title, link_url, description, updated_at, link_id, user_id]);
        return res.send({
            message: "Link successfully updated!",
            data: rows[0]
        });
    } catch (error) {
        return next(error);
    }
}


module.exports = updateLink;