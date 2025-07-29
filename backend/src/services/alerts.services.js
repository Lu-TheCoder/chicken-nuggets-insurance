const DB = require('../utils/db.v2.utils');

async function fetchUserAlerts(userId) {
    return await getUserAlertsByUserId(userId);
}

async function getUserAlertsByUserId(userId) {
    const db = DB.getInstance();
    const sql = 'SELECT * FROM user_alerts WHERE user_id = $1';
    const results = await db.query(sql, [userId]);
    return results.rows;
}

module.exports = {
    fetchUserAlerts,
    getUserAlertsByUserId
};
