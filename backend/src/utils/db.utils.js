const { Pool } = require('pg');
const dotenv = require('dotenv');

// 1. Load environment variables
dotenv.config();

// 2. Database configurations
const dbConfigs = {
  main: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5433',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DATABASE || 'chicken_nuggets_insurance',
    connectionTimeoutMillis: 2000,
  },
  test: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 5434,
    database: process.env.TEST_DB_NAME || 'chicken_nuggets_insurance_test',
    user: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'postgres',
    connectionTimeoutMillis: 2000,
  }
};

// 3. Create connection pools
const mainPool = new Pool(dbConfigs.main);
const testPool = new Pool(dbConfigs.test);

// 4. Determine which pool to use based on environment
const getPool = () => {
  return process.env.NODE_ENV === 'test' ? testPool : mainPool;
};

// 5. Get the current pool
const pool = getPool();


async function connectTest() {
    const currentPool = getPool();
    currentPool.connect();
    currentPool.on('connect', () => {
        console.log(`DATABASE connected to ${process.env.NODE_ENV === 'test' ? 'test' : 'main'} database`);
    });
}

const query = async (text, params, client) => {
    try {
        const dbClient = client || getPool(); // Use transaction client if provided, otherwise use appropriate pool
        const result = await dbClient.query(text, params);
        return result.rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};


// Function to close all pools (useful for tests)
async function closeAllPools() {
    await mainPool.end();
    await testPool.end();
}

module.exports = {
    pool,
    mainPool,
    testPool,
    getPool,
    connectTest,
    query,
    closeAllPools
};
