const { query } = require("../utils/db.utils");
const bcrypt = require('bcrypt');

const signupUser = async (fname, lname, email, password) => {
  // Check if user already exists
  const existingUser = await _getUserByEmail(email);

  if (existingUser.length > 0) {
    throw new Error("User already exits");
  }

  // Hash the password
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashpassword = await bcrypt.hash(password, saltRounds);

  // Insert the new user
  const results = await query(
    `INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`, [
    fname,
    lname,
    email,
    hashpassword
  ]
  );

  return results[0]; // Return the first (and only) result
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
  const results = await query("SELECT * FROM users WHERE email ILIKE $1;", [
    email,
  ]);

  return results;
};

module.exports = {
  signupUser,
  loginUser
};
