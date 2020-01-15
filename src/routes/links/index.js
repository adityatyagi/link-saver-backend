const Router = require('express-promise-router');
const router = new Router();
const links = require('../../controllers').linksController;

const getAllLinks = router.get('/getAllLinks', links.getAllLinks);
const addLink = router.post('/addLink', links.addLink);
const updateLink = router.put('/updateLink', links.updateLink);
const getLinkDetails = router.get('/getLinkDetails/:link_id', links.getLinkDetails);
const deleteLink = router.delete('/deleteLink/:user_id/:link_id', links.deleteLink);


module.exports = [
    getAllLinks,
    addLink,
    updateLink,
    getLinkDetails,
    deleteLink
];