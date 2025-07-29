const bcrypt = require('bcrypt');
const DB = require('../utils/db.v2.utils');

const signupUser = async (fname, lname, email, password) => {
  // Check if user already exists
  const existingUser = await _getUserByEmail(email);
  
  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const db = DB.getInstance();

  const hashpassword = await bcrypt.hash(
    password,
    parseInt(`${process.env.BCYRPT_SALT_ROUNDS}`)
  );

  // Query the changes in the table
  const results = await db.query(
    `INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [fname, lname, email, hashpassword]
  );

  // Return the first (and only) result from the INSERT
  return results.rows[0];
};

const loginUser = async ({ email, password }) => {
  const user = await _getUserByEmail(email);

  if (!(user.length > 0)) {
    throw new Error("Invalid email");
  }

  const passwordValid = await bcrypt.compare(password, user[0].password);

  if (!passwordValid) {
    throw new Error("Invalid password");
  }

  return user[0];
};

/**
 * This just checks if the user exists in the db
 * @param email 
 * @returns the user or empty as array
 */
const _getUserByEmail = async (email) => {
  const db = DB.getInstance();
  const results = await db.query("SELECT * FROM users WHERE email ILIKE $1;", [email]);
  return results.rows;
};

module.exports = {
  signupUser,
  loginUser
};
