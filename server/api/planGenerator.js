/**
 * Plan Generator Module
 * Generates personalized fitness and diet plans
 */

const workoutTemplates = require('../templates/workout-templates');
const dietTemplates = require('../templates/diet-templates');
const helpers = require('../utils/helpers');

/**
 * Generate a fitness and diet plan based on user data
 * @param {Object} userData - User information and preferences
 * @returns {Promise<Object>} The generated plan
 */
async function generatePlan(userData) {
    try {
        // Convert string values to numbers
        userData.age = parseInt(userData.age);
        userData.weight = parseFloat(userData.weight);
        userData.height = parseFloat(userData.height);
        userData.frequency = parseInt(userData.frequency);
        
        // Validate data
        validateUserData(userData);
        
        // Calculate additional metrics
        const enrichedData = calculateMetrics(userData);
        
        // Get the appropriate workout plan
        const workoutPlan = workoutTemplates.getWorkoutPlan(
            enrichedData.goal,
            enrichedData.frequency
        );
        
        // Get the appropriate diet plan
        const dietPlan = dietTemplates.getDietPlan(
            enrichedData.goal,
            enrichedData.diet,
            enrichedData.targetCalories
        );
        
        // Combine all data into a complete plan
        return {
            user: {
                age: enrichedData.age,
                weight: enrichedData.weight,
                height: enrichedData.height,
                bmi: enrichedData.bmi,
                bmr: enrichedData.bmr,
                tdee: enrichedData.tdee,
                targetCalories: enrichedData.targetCalories
            },
            workoutPlan,
            dietPlan,
            recommendations: generateRecommendations(enrichedData),
            date: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error generating plan:', error);
        throw error;
    }
}

/**
 * Validate user input data
 * @param {Object} userData - User information to validate
 * @throws {Error} If validation fails
 */
function validateUserData(userData) {
    // Age validation
    if (userData.age < 15 || userData.age > 80) {
        throw new Error('العمر يجب أن يكون بين 15 و 80 سنة');
    }
    
    // Weight validation
    if (userData.weight < 30 || userData.weight > 200) {
        throw new Error('الوزن يجب أن يكون بين 30 و 200 كجم');
    }
    
    // Height validation
    if (userData.height < 120 || userData.height > 220) {
        throw new Error('الطول يجب أن يكون بين 120 و 220 سم');
    }
    
    // Goal validation
    const validGoals = ['weight_loss', 'muscle_gain', 'fitness'];
    if (!validGoals.includes(userData.goal)) {
        throw new Error('الهدف غير صالح');
    }
    
    // Frequency validation
    if (![3, 4, 5].includes(userData.frequency)) {
        throw new Error('تكرار التمارين غير صالح');
    }
    
    // Diet validation
    const validDiets = ['standard', 'high_protein', 'vegetarian'];
    if (!validDiets.includes(userData.diet)) {
        throw new Error('نوع النظام الغذائي غير صالح');
    }
}

/**
 * Calculate additional health and fitness metrics
 * @param {Object} userData - Base user data
 * @returns {Object} Enriched user data with calculated metrics
 */
function calculateMetrics(userData) {
    const enrichedData = { ...userData };
    
    // Calculate BMI
    enrichedData.bmi = helpers.calculateBMI(userData.weight, userData.height);
    
    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    if (userData.gender === 'female') {
        enrichedData.bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    } else {
        // Default to male if gender not specified
        enrichedData.bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityFactors = {
        3: 1.375, // Moderate exercise 3 days/week
        4: 1.465, // Active 4 days/week
        5: 1.55   // Very active 5+ days/week
    };
    
    enrichedData.tdee = Math.round(enrichedData.bmr * activityFactors[userData.frequency]);
    
    // Calculate target calories based on goal
    switch (userData.goal) {
        case 'weight_loss':
            enrichedData.targetCalories = Math.round(enrichedData.tdee * 0.8); // 20% deficit
            break;
        case 'muscle_gain':
            enrichedData.targetCalories = Math.round(enrichedData.tdee * 1.1); // 10% surplus
            break;
        case 'fitness':
        default:
            enrichedData.targetCalories = enrichedData.tdee; // Maintenance
    }
    
    return enrichedData;
}

/**
 * Generate personalized recommendations based on user data
 * @param {Object} userData - Enriched user data
 * @returns {Object} Personalized recommendations
 */
function generateRecommendations(userData) {
    const recommendations = {
        general: [
            'اشرب على الأقل 8 أكواب من الماء يومياً',
            'احصل على 7-9 ساعات من النوم كل ليلة',
            'خذ أيام راحة كافية للسماح لعضلاتك بالتعافي'
        ],
        nutrition: [],
        workout: []
    };
    
    // BMI-based recommendations
    if (userData.bmi < 18.5) {
        // Underweight
        recommendations.nutrition.push('زيادة السعرات الحرارية تدريجياً مع الحفاظ على جودة الطعام');
        recommendations.nutrition.push('التركيز على الأطعمة الغنية بالسعرات الحرارية والمغذيات مثل المكسرات والأفوكادو');
    } else if (userData.bmi >= 25 && userData.bmi < 30) {
        // Overweight
        recommendations.nutrition.push('تقليل استهلاك السكريات المضافة والكربوهيدرات المكررة');
        recommendations.nutrition.push('زيادة استهلاك الخضروات والبروتينات الخالية من الدهون');
    } else if (userData.bmi >= 30) {
        // Obese
        recommendations.nutrition.push('استشارة أخصائي تغذية لوضع خطة غذائية مخصصة');
        recommendations.workout.push('البدء بتمارين منخفضة التأثير مثل المشي والسباحة');
    }
    
    // Goal-based recommendations
    switch (userData.goal) {
        case 'weight_loss':
            recommendations.workout.push('تضمين تمارين الكارديو 3-5 مرات في الأسبوع');
            recommendations.workout.push('استخدام تمارين HIIT لتسريع حرق الدهون');
            recommendations.nutrition.push('تناول وجبات متوازنة وصغيرة على مدار اليوم');
            break;
        case 'muscle_gain':
            recommendations.workout.push('التركيز على تمارين القوة مع أوزان ثقيلة وتكرارات أقل');
            recommendations.workout.push('استهداف كل مجموعة عضلية مرة إلى مرتين في الأسبوع');
            recommendations.nutrition.push('تناول 1.6-2 جرام من البروتين لكل كيلوجرام من وزن الجسم');
            break;
        case 'fitness':
            recommendations.workout.push('تنويع التمارين بين الكارديو وتدريبات القوة والمرونة');
            recommendations.workout.push('استخدام تمارين الوزن الجسدي لتحسين اللياقة العامة');
            recommendations.nutrition.push('الحفاظ على نظام غذائي متوازن يدعم مستويات الطاقة طوال اليوم');
            break;
    }
    
    // Age-based recommendations
    if (userData.age > 50) {
        recommendations.workout.push('التركيز على تمارين التوازن والمرونة للوقاية من السقوط');
        recommendations.nutrition.push('زيادة استهلاك الكالسيوم وفيتامين D لصحة العظام');
    }
    
    return recommendations;
}

module.exports = {
    generatePlan
};