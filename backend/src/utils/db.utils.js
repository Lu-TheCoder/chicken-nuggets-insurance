const { Pool } = require('pg');
const dotenv = require('dotenv');

// 1. Load environment variables
dotenv.config();

// 2. Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});


async function connectTest() {
    pool.connect();
    pool.on('connect', () => {
        console.log("DATABASE connected");
        // return "Database connected";
    });
}

const query = async (text, params, client) => {
    try {
        const dbClient = client || pool; // Use transaction client if provided, otherwise use pool
        const result = await dbClient.query(text, params);
        return result.rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

module.exports = {
    pool,
    connectTest,
    query
};