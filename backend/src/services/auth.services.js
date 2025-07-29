const db = require('../config/database');

const signupUser = async (name, email, password) => {
    try {
        // Check if user already exists
        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error("User already exits");
        }

        // Insert new user
        const result = await db.query(
            'INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, '', email, password, 'user']
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        // Find user by email and password
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length === 0) {
            throw new Error("Invalid credentials");
        }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const _getUser = async (email) => {
    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    signupUser,
    loginUser,
    _getUser
};