const db = require('../../db');
const bcrypt = require('bcrypt');
const config = require('./../../../config/defaultConfig');
const utility = require('../../global_functions');

// get all users
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    // hashing the password - encrypting the password
    // higher the number, more time it will take to hash the password but more secure it will be
    const hash = await generatePassword(password, config.saltRounds);
    createUserQuery = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING user_id, name, email';

    const userRes = await db.query(createUserQuery, [name, email, hash]);
    return utility.successResponse(res, userRes.rows[0], "User registered successfully");

  } catch (error) {
    return utility.badRequestError(error, "Registeration failed");
  }
}

async function generatePassword(password, saltRounds) {
  return await bcrypt.hash(password, saltRounds);
}

module.exports = register;
