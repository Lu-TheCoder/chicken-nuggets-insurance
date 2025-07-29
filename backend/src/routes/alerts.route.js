const express = require('express');
const { fetchUserAlerts } = require('../services/alerts.services');

const router = express.Router();

// TEMP TEST ROUTE
router.get('/test', (req, res) => {
    res.json({ message: '✅ Alert router test route works' });
});

router.get('/:userId/alerts', async (req, res) => {
    const { userId } = req.params;

    try {
        const alerts = await fetchUserAlerts(userId);
        return res.json(alerts);
    }
    catch (error) {
        console.error('Error fetching user alerts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;