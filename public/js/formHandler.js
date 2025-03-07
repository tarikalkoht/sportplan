/**
 * Form Handler Script
 * Handles all form submission and data processing
 */

// Form submission handler
function initFormHandler() {
    const form = document.getElementById('fitnessForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');
    
    try {
        // Get form data
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        
        // Validate form data
        const validationErrors = validateFormData(userData);
        if (validationErrors.length > 0) {
            throw new Error(`الرجاء إصلاح الأخطاء التالية: ${validationErrors.join(', ')}`);
        }
        
        // Calculate additional metrics
        enrichUserData(userData);
        
        // Send data to backend API
        const planData = await sendToBackend(userData);
        
        // Generate PDF from the received plan data
        await generatePDF(planData);
        
        // Show success message
        window.app.showNotification('تم إنشاء خطتك الشخصية بنجاح!', 'success');
        
    } catch (error) {
        console.error('Error processing form:', error);
        window.app.showNotification(error.message || 'حدث خطأ أثناء إنشاء الخطة، يرجى المحاولة لاحقاً', 'error');
    } finally {
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
    }
}

/**
 * Validate form data
 * @param {Object} data - The form data
 * @returns {Array} - Array of validation error messages
 */
function validateFormData(data) {
    const errors = [];
    
    // Age validation
    if (!data.age || data.age < 15 || data.age > 80) {
        errors.push('العمر يجب أن يكون بين 15 و 80');
    }
    
    // Weight validation
    if (!data.weight || data.weight < 30 || data.weight > 200) {
        errors.push('الوزن يجب أن يكون بين 30 و 200 كجم');
    }
    
    // Height validation
    if (!data.height || data.height < 120 || data.height > 220) {
        errors.push('الطول يجب أن يكون بين 120 و 220 سم');
    }
    
    // Required selections
    if (!data.goal) errors.push('الرجاء اختيار هدفك');
    if (!data.frequency) errors.push('الرجاء اختيار عدد أيام التمرين');
    if (!data.diet) errors.push('الرجاء اختيار النظام الغذائي');
    
    return errors;
}

/**
 * Enrich user data with calculated metrics
 * @param {Object} userData - The user data to enrich
 */
function enrichUserData(userData) {
    // Convert string values to numbers
    userData.age = parseInt(userData.age);
    userData.weight = parseFloat(userData.weight);
    userData.height = parseFloat(userData.height);
    userData.frequency = parseInt(userData.frequency);
    
    // Calculate BMI
    userData.bmi = calculateBMI(userData.weight, userData.height);
    
    // Calculate BMR (Basal Metabolic Rate) using Harris-Benedict equation
    userData.bmr = calculateBMR(userData);
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    userData.tdee = calculateTDEE(userData);
    
    // Calculate target calories based on goal
    userData.targetCalories = calculateTargetCalories(userData);
    
    return userData;
}

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} - BMI value
 */
function calculateBMI(weight, height) {
    // Height in meters (convert from cm)
    const heightInMeters = height / 100;
    return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
}

/**
 * Calculate BMR (Basal Metabolic Rate)
 * @param {Object} userData - User data
 * @returns {number} - BMR in calories
 */
function calculateBMR(userData) {
    // Harris-Benedict equation
    if (userData.gender === 'male' || !userData.gender) {
        // Default to male if not specified
        return Math.round(88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age));
    } else {
        return Math.round(447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age));
    }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param {Object} userData - User data
 * @returns {number} - TDEE in calories
 */
function calculateTDEE(userData) {
    // Activity multiplier based on exercise frequency
    let activityMultiplier;
    
    switch(parseInt(userData.frequency)) {
        case 3:
            activityMultiplier = 1.375; // Moderate exercise (3 days/week)
            break;
        case 4:
            activityMultiplier = 1.465; // Active (4 days/week)
            break;
        case 5:
            activityMultiplier = 1.55; // Very active (5+ days/week)
            break;
        default:
            activityMultiplier = 1.2; // Sedentary (little or no exercise)
    }
    
    return Math.round(userData.bmr * activityMultiplier);
}

/**
 * Calculate target calories based on goal
 * @param {Object} userData - User data
 * @returns {number} - Target daily calories
 */
function calculateTargetCalories(userData) {
    switch(userData.goal) {
        case 'weight_loss':
            return Math.round(userData.tdee * 0.8); // 20% deficit
        case 'muscle_gain':
            return Math.round(userData.tdee * 1.1); // 10% surplus
        case 'fitness':
        default:
            return userData.tdee; // Maintenance
    }
}

/**
 * Send user data to backend API
 * @param {Object} userData - User form data
 * @returns {Promise<Object>} - Plan data from backend
 */
async function sendToBackend(userData) {
    try {
        // In a real application, this would be the API endpoint
        const apiUrl = '/api/generate-plan';
        
        // For demo purposes, we'll simulate a backend response
        // In production, uncomment the fetch code below
        
        /*
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        return await response.json();
        */
        
        // Demo: Generate a mock response locally
        return await mockBackendResponse(userData);
        
    } catch (error) {
        console.error('API error:', error);
        throw new Error('فشل الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى');
    }
}

/**
 * Generate a mock backend response for demo purposes
 * @param {Object} userData - User data
 * @returns {Promise<Object>} - Simulated plan data
 */
async function mockBackendResponse(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get appropriate workouts from templates
    const goal = userData.goal || 'fitness';
    const frequency = parseInt(userData.frequency) || 3;
    
    // Simplified workout plan for demo
    const workoutPlan = {
        title: goal === 'weight_loss' ? 'خطة تمارين لفقدان الوزن' : 
               goal === 'muscle_gain' ? 'خطة تمارين لبناء العضلات' : 'خطة تمارين لتحسين اللياقة',
        description: 'خطة تمارين مخصصة حسب هدفك',
        days: [
            {
                day: 'اليوم الأول',
                focus: 'تمارين متكاملة',
                exercises: [
                    { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                    { name: 'تمارين القرفصاء', sets: '3', reps: '15' },
                    { name: 'تمارين الضغط', sets: '3', reps: '10-15' },
                    { name: 'تمارين البطن', sets: '3', reps: '20' }
                ]
            },
            // المزيد من الأيام حسب الحاجة
        ]
    };
    
    // Simplified diet plan
    const dietPlan = {
        title: 'نظام غذائي متوازن',
        description: 'نظام غذائي مخصص لدعم أهدافك',
        meals: [
            { 
                name: 'وجبة الإفطار', 
                suggestions: ['بيض مسلوق', 'خبز أسمر', 'خضروات'] 
            },
            { 
                name: 'وجبة الغداء', 
                suggestions: ['صدر دجاج مشوي', 'أرز بني', 'سلطة'] 
            },
            { 
                name: 'وجبة العشاء', 
                suggestions: ['سمك مشوي', 'بطاطا حلوة', 'خضروات'] 
            },
            { 
                name: 'وجبة خفيفة', 
                suggestions: ['مكسرات', 'فاكهة'] 
            }
        ]
    };
    
    // Return structured plan data
    return {
        user: {
            age: userData.age,
            weight: userData.weight,
            height: userData.height,
            bmi: userData.bmi,
            targetCalories: userData.targetCalories
        },
        goal: userData.goal,
        workoutPlan: workoutPlan,
        dietPlan: dietPlan,
        date: new Date().toISOString()
    };
}