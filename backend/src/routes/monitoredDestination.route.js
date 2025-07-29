const express = require('express');
const { getAll, getById, searchByCriteria } = require('../services/monitoredDestination.services');

const router = express.Router();



    // GET /monitored/search?location=...&riskLevel=...
router.get('/user/:userId/search', async (req, res) => {
    const { userId } = req.params;
    const { location, riskLevel } = req.query;

    try {
        const results = await searchByCriteria({ location, riskLevel, userId });
        res.json(results);
    } catch (err) {
        console.error('Error searching monitored destinations:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET /monitored/:id -get by ID
router.get('/user/:userId/:id', async (req, res) => {
    const { id, userId } = req.params;
    try {
        const result = await getById(id,userId);
        if (!result) {
            return res.status(404).json({ error: 'Monitored destination not found' });
        }
        res.json(result);
    } catch (err) {
        console.error('Error fetching monitored destination by ID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET /monitored - get all
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const results = await getAll(userId);
        res.json(results);
    } catch (err) {
        console.error('Error fetching monitored destinations:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    });

module.exports = router;