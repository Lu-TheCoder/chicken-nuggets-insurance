const { query } = require('../utils/db.utils');

//Get all monitored destinations for a user
async function getAll(userId) {
    const sql = 'SELECT * FROM monitored_destinations WHERE user_id = $1';
    return await query(sql, [userId]);
}

//Get one by ID
async function getById(id,userId) {
    const sql = 'SELECT * FROM monitored_destinations WHERE id = $1 AND user_id = $2';
    const result = await query(sql, [id, userId]);
    return result[0];
}

//Search by location and/or risk level
async function searchByCriteria({ location, riskLevel, userId }) { 
    const conditions = ['user_id = $1'];
    const values = [userId];

    if (location) { 
        values.push(location);
        conditions.push(`location ILIKE $${values.length}`);
    }

    if (riskLevel) { 
        values.push(riskLevel);
        conditions.push(`risk_level ILIKE $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const sql = `SELECT * FROM monitored_destinations ${where}`;

    return await query(sql, values);
}

module.exports = {
    getAll,
    getById,
    searchByCriteria
};