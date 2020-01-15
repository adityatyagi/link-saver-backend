const db = require('../../db');

// delete user by user id
const deleteLink = async (req, res, next) => {
    try {
        const query = 'DELETE FROM links WHERE user_id = $1 AND link_id = $2';
        const {
            user_id,
            link_id
        } = req.params;
        const {
            rows
        } = await db.query(query, [user_id, link_id]);
        return res.send({
            status: 200,
            message: 'Link deleted successfully!'
        });
    } catch (error) {
        return next(error);
    }
}


module.exports = deleteLink;