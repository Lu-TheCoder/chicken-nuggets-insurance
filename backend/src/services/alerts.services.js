const { query } = require('../utils/db.utils');

async function fetchUserAlerts(userId) {
    const sql = 'SELECT * FROM user_alerts WHERE user_id = $1';
    return await query(sql, [userId]);
}

module.exports = {
    fetchUserAlerts
};
