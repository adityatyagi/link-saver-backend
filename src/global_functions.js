// pe = require('parse-error'); //parses error so you can read error message and handle them accordingly
'use strict';

// const to = (promise) => {
//   //global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
//   return promise
//     .then(data => {
//       return [null, data];
//     })
//     .catch(err => [pe(err)]);
// };

// Response handlers
const successResponse = (res, data, message, code) => {
  return res.status(code || 200).json({
    data,
    message,
    code
  });
};

const badRequestError = (res, message) => {
  res.statusCode = 406;
  return res.json({
    code: 406,
    message: message
  });
};

const createdResponse = (res, data, message) => {
  return successResponse(res, data, message, 201);
};

const noContentResponse = (res, message) => {
  return successResponse(res, {}, message, 204);
};

const notFoundError = (res, message) => {
  return successResponse(res, {}, message, 404);
};

const forbiddenError = (res, msg) => {
  return successResponse(res, {}, msg, 403);
};

const unverifiedError = (res, message) => {
  res.statusCode = 412;
  return res.json({
    success: false,
    code: 412,
    message: message
  });
};

// Error handler for unverified Email with dedicated response code.
// Code 432 - Unverified Email
const unverifiedEmailError = (res, data, message) => {
  res.statusCode = 432;
  return res.json({
    success: false,
    code: 432,
    data,
    message: message
  });
};

// Error handler for unverified mobile number with dedicated response code.
// Code 433 - Unverified Mobile Number
const unverifiedMobileError = (res, data, message) => {
  res.statusCode = 433;
  return res.json({
    success: false,
    code: 433,
    data,
    message: message
  });
};

module.exports = {
  successResponse,
  badRequestError,
  createdResponse,
  unverifiedMobileError,
  unverifiedEmailError,
  unverifiedError,
  forbiddenError,
  notFoundError,
  noContentResponse
};
