const db = require('../../db');

const addLink = async (req, res, next) => {
    try {
        const {
            title,
            link_url,
            description,
            user_id
        } = req.body;

        const query = 'INSERT INTO links(title, link_url, description, user_id) VALUES($1, $2, $3, $4) RETURNING link_id, title, link_url, description, user_id';

        const {
            rows
        } = await db.query(query, [title, link_url, description, user_id]);
        console.log(rows[0]);
        return res.send({
            message: "Link successfully posted!",
            data: rows[0]
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = addLink;