const Router = require('express-promise-router');
const router = new Router();
const links = require('../../controllers').linksController;

const getAllLinks = router.get('/getAllLinks', links.getAllLinks);
const addLink = router.post('/addLink', links.addLink);


module.exports = [
    getAllLinks,
    addLink
];