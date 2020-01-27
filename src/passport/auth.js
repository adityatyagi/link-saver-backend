const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db');
const config = require('../../config/defaultConfig');

const checkAuth = (req, res, next) => {
    var token = req.headers['authorization'].slice(7);
    // if token is not present
    if (!token)
        return res.status(403).send({
            authentication: false,
            message: 'No token provided.'
        });

    // if token is present, verify the token
    jwt.verify(token, config.jwt.appSecret, (err, decoded) => {
        // if token is invalid
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

        // if token is verified successfully
        next();
    });
}

module.exports = {
    checkAuth
}