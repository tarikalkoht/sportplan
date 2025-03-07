/**
 * Configuration settings for the application
 */

// Environment variables
const environment = process.env.NODE_ENV || 'development';

// Base configuration
const config = {
    // Server configuration
    port: process.env.PORT || 3000,
    
    // API settings
    apiPrefix: '/api',
    
    // CORS settings
    corsOptions: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    
    // Security settings
    security: {
        rateLimiter: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // Limit each IP to 100 requests per windowMs
        }
    }
};

// Environment-specific configurations
const envConfigs = {
    development: {
        // Development-specific settings
        logLevel: 'debug'
    },
    
    production: {
        // Production-specific settings
        logLevel: 'error',
        corsOptions: {
            origin: [
                'https://your-production-domain.com',
                'https://www.your-production-domain.com'
            ]
        }
    },
    
    test: {
        // Test-specific settings
        port: 3001,
        logLevel: 'silent'
    }
};

// Merge base config with environment-specific config
const finalConfig = {
    ...config,
    ...(envConfigs[environment] || {})
};

module.exports = finalConfig;