const db = require('../../db');

const getLinkDetails = async (req, res, next) => {
    try {
        const query = 'SELECT link_id, title, link_url, description, user_id FROM links WHERE link_id = $1';
        const {
            linkId
        } = req.params;
        const {
            rows
        } = await db.query(query, [linkId]);
        return res.send(rows[0]);
    } catch (error) {
        return next(error);
    }
}

module.exports = getLinkDetails;