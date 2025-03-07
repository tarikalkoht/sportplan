/**
 * Server entry point for fitness and diet plan generator
 */

const app = require('./app');
const config = require('./config/config');

// Get port from config
const PORT = config.port || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Visit: http://localhost:${PORT}`);
});