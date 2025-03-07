/**
 * API routes for fitness and diet plan generator
 */

const express = require('express');
const router = express.Router();
const planGenerator = require('./planGenerator');

/**
 * Route to generate a fitness and diet plan
 * POST /api/generate-plan
 */
router.post('/generate-plan', async (req, res, next) => {
    try {
        // Extract user data from request body
        const userData = req.body;
        
        // Validate required fields
        const requiredFields = ['age', 'weight', 'height', 'goal', 'frequency', 'diet'];
        const missingFields = requiredFields.filter(field => !userData[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `الحقول التالية مطلوبة: ${missingFields.join(', ')}`
            });
        }
        
        // Generate the plan
        const plan = await planGenerator.generatePlan(userData);
        
        // Return the plan
        res.status(200).json({
            success: true,
            plan
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Health check route
 * GET /api/health
 */
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;