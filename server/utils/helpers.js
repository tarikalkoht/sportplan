/**
 * Helper Utilities
 * Common utility functions used throughout the application
 */

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} - BMI value rounded to 1 decimal place
 */
function calculateBMI(weight, height) {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI: weight (kg) / height^2 (m)
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Round to 1 decimal place
    return Math.round(bmi * 10) / 10;
}

/**
 * Get BMI classification based on BMI value
 * @param {number} bmi - BMI value
 * @returns {string} - BMI classification in Arabic
 */
function getBMIClassification(bmi) {
    if (bmi < 18.5) {
        return 'نقص في الوزن';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'وزن طبيعي';
    } else if (bmi >= 25 && bmi < 30) {
        return 'زيادة في الوزن';
    } else if (bmi >= 30 && bmi < 35) {
        return 'سمنة درجة أولى';
    } else if (bmi >= 35 && bmi < 40) {
        return 'سمنة درجة ثانية';
    } else {
        return 'سمنة مفرطة';
    }
}

/**
 * Calculate ideal weight range based on height
 * @param {number} height - Height in cm
 * @param {string} gender - Gender ('male' or 'female')
 * @returns {Object} - Minimum and maximum ideal weight in kg
 */
function calculateIdealWeightRange(height, gender) {
    // Using the BMI range of 18.5 to 24.9 for ideal weight
    const heightInMeters = height / 100;
    
    // Calculate minimum and maximum weights based on BMI range
    const minWeight = Math.round(18.5 * heightInMeters * heightInMeters);
    const maxWeight = Math.round(24.9 * heightInMeters * heightInMeters);
    
    return {
        min: minWeight,
        max: maxWeight
    };
}

/**
 * Format a date to Arabic locale
 * @param {Date|string} date - Date object or date string
 * @returns {string} - Formatted date in Arabic
 */
function formatDateArabic(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-SA');
}

/**
 * Generate a random unique ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} - Random alphanumeric ID
 */
function generateRandomId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - HTML content to sanitize
 * @returns {string} - Sanitized HTML content
 */
function sanitizeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Check if a value is a valid number
 * @param {*} value - Value to check
 * @returns {boolean} - True if value is a valid number, false otherwise
 */
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Format calories or macronutrients for display
 * @param {number} value - Value to format
 * @param {string} unit - Unit (e.g., 'kcal', 'g')
 * @returns {string} - Formatted value with unit
 */
function formatNutrientValue(value, unit) {
    return `${Math.round(value)} ${unit}`;
}

// Export all utility functions
module.exports = {
    calculateBMI,
    getBMIClassification,
    calculateIdealWeightRange,
    formatDateArabic,
    generateRandomId,
    sanitizeHTML,
    isValidNumber,
    formatNutrientValue
};