const db = require('../../db');

const updatePost = async (req, res, next) => {
    try {
        const postData = {
            post_id: req.body.post_id,
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
            link_urls: req.body.link_urls
        }

        // console.log(postData);

        // updating posts table
        const updatePost = 'UPDATE posts set title = $1, description = $2, updated_at = $3 where post_id = $4 AND user_id = $5 RETURNING post_id, title, description, user_id';

        const updated_at = new Date();

        const updateTableRes = await db.query(updatePost, [postData.title, postData.description, updated_at, postData.post_id, postData.user_id]);


        // updating links table
        const getAllLinksForPostId = 'select link_id from links where post_id = $1';
        const linkIds = await db.query(getAllLinksForPostId, [postData.post_id]);

        // check if any link is deleted for the post
        const allLinkIds = linkIds.rows.map(item => item.link_id);

        linksToDelete = allLinkIds.filter(item => {
            return postData.link_urls.every(currentLinks => currentLinks.link_id !== item);
        });

        linksToUpdate = allLinkIds.filter(item => {
            return postData.link_urls.every(currentLinks => currentLinks.link_id === item);
        });

        linksOfLinksToUpdate = postData.link_urls.map(item => item.link_url);

        console.log('linksToDelete', linksToDelete);
        console.log('linksToUpdate', linksToUpdate);
        console.log('linksOfLinksToUpdate', linksOfLinksToUpdate);

        // if there are items to delete
        // if (linksToDelete.length > 0) {
        //     const deleteLinks = 'DELETE from links where link_id = ANY(array[$1::int[]]) AND post_id = $2';
        //     const deleteRes = await db.query(deleteLinks, [
        //         [linksToDelete], postData.post_id
        //     ]);
        // };

        // if(linksToUpdate.length > 0){
        //     // update the remaining links
        //     const updateLinks = 'UPDATE links set link_url = new.link_url, updated_at = now() from (select unnest(array[$1::int[]]) as link_id, unnest(array[$2::text[]]) as link_url) as new where links.link_id = new.link_id';
        //     const updateLinksRes = await db.query(updateLinks, [
        //         [linksToUpdate, []]
        //     ]);
        //     console.log('updateLinksRes', updateLinksRes);
        // }




        // const insertIntoLinksTable = "INSERT into links(post_id, link_url) values($1, unnest(array[$2::text[]]))";
        // const linksTableRes = await db.query(insertIntoLinksTable, [postTableRes.rows[0].post_id, [postData.link_urls]]);

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