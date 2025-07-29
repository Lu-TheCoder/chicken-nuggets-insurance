const { getUserAlertsByUserId } = require('../utils/db.utils');

async function fetchUserAlerts(userId) {
    return await getUserAlertsByUserId(userId);
}

module.exports = {
    fetchUserAlerts
};
