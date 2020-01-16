const db = require('../../db');

const getAllPosts = async (req, res, next) => {
    try {
        const query = 'SELECT link_id, title, link_url, description, user_id FROM links';
        const {
            rows
        } = await db.query(query);
        return res.send(rows);
    } catch (error) {
        return next(error);
    }
};

module.exports = getAllPosts;