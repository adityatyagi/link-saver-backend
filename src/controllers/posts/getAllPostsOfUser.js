const db = require('../../db');

const getAllPostsOfUser = async (req, res, next) => {

    const {
        user_id
    } = req.params;

    const getAllPostsOfUserQuery = "select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.user_id = $1 group by p.post_id";
    const queryRes = await db.query(getAllPostsOfUserQuery, [user_id]);

    res.status(200).send({
        message: 'All posts for users fetched successfully',
        data: queryRes.rows
    })
}

module.exports = getAllPostsOfUser;