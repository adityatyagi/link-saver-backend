const db = require('../../db');

const updatePost = async (req, res, next) => {
    try {
        const postData = {
            post_id: req.body.post_id,
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
            link_urls: req.body.link_urls
        };

        // updating posts table
        const updatePost =
            'UPDATE posts set title = $1, description = $2, updated_at = $3 where post_id = $4 AND user_id = $5 RETURNING post_id, title, description, user_id';

        const updated_at = new Date();

        const updateTableRes = await db.query(updatePost, [
            postData.title,
            postData.description,
            updated_at,
            postData.post_id,
            postData.user_id
        ]);

        // updating links table
        const getAllLinksForPostId = 'select link_id from links where post_id = $1';
        const linkIds = await db.query(getAllLinksForPostId, [postData.post_id]);

        // check if any link is deleted for the post
        const allLinkIds = linkIds.rows.map(item => item.link_id);

        linksToDelete = allLinkIds.filter(item => {
            return postData.link_urls.every(
                currentLinks => currentLinks.link_id !== item
            );
        });

        linksToUpdate = allLinkIds.filter(item => {
            return postData.link_urls.some(
                currentLinks => currentLinks.link_id === item
            );
        });

        linksOfLinksToUpdate = postData.link_urls.map(item => item.link_url);


        // if there are items to delete
        if (linksToDelete.length > 0) {
            const deleteLinks =
                'DELETE from links where link_id = ANY(array[$1::int[]]) AND post_id = $2';
            const deleteRes = await db.query(deleteLinks, [
                [linksToDelete],
                postData.post_id
            ]);
        }

        if (linksToUpdate.length > 0) {
            // update the remaining links
            const updateLinks =
                'UPDATE links set link_url = new.link_url, updated_at = now() from (select unnest(array[$1::int[]]) as link_id, unnest(array[$2::text[]]) as link_url) as new where links.link_id = new.link_id';
            const updateLinksRes = await db.query(updateLinks, [
                [linksToUpdate],
                [linksOfLinksToUpdate]
            ]);
        }

        // const postDetails = await db.postDetails(postData.post_id);
        const postDetails = await db.postDetails(postData.post_id);

        return res.status(200).send({
            message: 'Post updated!',
            data: postDetails
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = updatePost;