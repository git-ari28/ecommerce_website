const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.get('/recommendations', (req, res) => {
    const searchQuery = req.query.query;
    const pythonProcess = spawn('python', ['../scripts/recommendations.py', searchQuery]);

    pythonProcess.stdout.on('data', (data) => {
        const recommendedProductIds = JSON.parse(data.toString());
        res.json({ recommendations: recommendedProductIds });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ error: 'Failed to generate recommendations' });
    });
});

module.exports = router;  // Ensure you export the router correctly

