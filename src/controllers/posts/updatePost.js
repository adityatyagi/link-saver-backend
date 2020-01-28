const db = require('../../db');
const utility = require('../../global_functions');

const updatePost = async (req, res, next) => {
  try {
    const postData = {
      post_id: req.body.post_id,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      link_urls: req.body.link_urls
    };

    // check if user exists
    if (!(await db.checkIfUserExists(postData.user_id))) {
      return utility.badRequestError(
        res,
        'User does not exists with the given user id'
      );
    }

    // check if the post exist for the given user id
    if (!(await db.checkIfPostsExistsForUser(postData.post_id, postData.user_id))) {
      return utility.badRequestError(
        res,
        'Post does not exists with the given post id and user id'
      );
    }

    // check if the links being updated in the post belong to the post or not
    // updating links table
    const getAllLinksForPostId = 'select link_id from links where post_id = $1';
    const linkIds = await db.query(getAllLinksForPostId, [postData.post_id]);
    const allLinkIds = linkIds.rows.map(item => item.link_id);

    const linkUrlsOfLinksToUpdate = postData.link_urls.map(item => item.link_url);
    const linkIdsOfLinksToUpdate = postData.link_urls.map(item => item.link_id);

    if (!checkIfAllLinksAreValid(allLinkIds, linkIdsOfLinksToUpdate)) {
      return utility.badRequestError(res, "Links to update with this post are invalid");
    }

    // check if any link is deleted for the post

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


    // updating posts table
    const updatePost =
      'UPDATE posts set title = $1, description = $2, updated_on = now() where post_id = $3 AND user_id = $4 RETURNING post_id, title, description, user_id';

    await db.query(updatePost, [
      postData.title,
      postData.description,
      postData.post_id,
      postData.user_id
    ]);


    // if there are items to delete
    if (linksToDelete.length > 0) {
      const deleteLinks =
        'DELETE from links where link_id = ANY(array[$1::int[]]) AND post_id = $2';
      await db.query(deleteLinks, [
        [linksToDelete],
        postData.post_id
      ]);
    }

    if (linksToUpdate.length > 0) {
      // update the remaining links
      const updateLinks =
        'UPDATE links set link_url = new.link_url, updated_on = now() from (select unnest(array[$1::int[]]) as link_id, unnest(array[$2::text[]]) as link_url) as new where links.link_id = new.link_id';
      await db.query(updateLinks, [
        [linksToUpdate],
        [linkUrlsOfLinksToUpdate]
      ]);
    }

    // const postDetails = await db.postDetails(postData.post_id);
    const postDetails = await db.postDetails(postData.post_id);

    return utility.successResponse(res, postDetails, "Post updated successfully");
  } catch (error) {
    return utility.badRequestError(error, "Failed! Could not update post");
  }
};

const checkIfAllLinksAreValid = (allLinksInDB, linksToEdit) => {
  let areAllLinksValid = true;
  for (let i = 0; i < linksToEdit.length; i++) {
    if (allLinksInDB.indexOf(linksToEdit[i]) === -1) {
      areAllLinksValid = false;
    }
  }
  return areAllLinksValid;
}

module.exports = updatePost;
