const db = require('../../db');
const utility = require('../../global_functions');

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const {
      page,
      limit
    } = req.query;

    let currentPage = page ? page : 1;
    let itemsPerPage = limit ? limit : 10;

    currentPage = (currentPage - 1) * itemsPerPage;

    let totalCount = await db.rowCountInTable('users');
    let lastPage = Math.ceil(totalCount / itemsPerPage);

    const query = 'SELECT user_id, name, email FROM users limit $1 offset $2';

    const {
      rows
    } = await db.query(query, [itemsPerPage, currentPage]);

    const resData = {
      usersList: rows,
      lastPage: lastPage,
      totalCount: +totalCount
    }

    return utility.successResponse(res, resData, 'All users fetched successfully');
  } catch (error) {
    return utility.badRequestError(error, "Failed to get users list");
  }
}

module.exports = getAllUsers;
