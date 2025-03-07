/**
 * Main application script
 * Controls the main functionality and initializes the app
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
    
    // Add form submission listener
    initFormHandler();
});

/**
 * Initialize application features and UI enhancements
 */
function initApp() {
    console.log('Fitness & Diet Plan App initialized');
    
    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', validateNumberInput);
    });
    
    // Add animation classes to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        // Staggered animation delay
        setTimeout(() => {
            group.style.opacity = '1';
        }, 100 * index);
    });
    
    // Check if browser supports required features
    checkBrowserSupport();
}

/**
 * Validate number inputs to ensure they are within min/max range
 * @param {Event} event - The input event
 */
function validateNumberInput(event) {
    const input = event.target;
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    const value = parseInt(input.value);
    
    if (value < min) {
        input.value = min;
    } else if (value > max) {
        input.value = max;
    }
}

/**
 * Check if browser supports all the required features
 */
function checkBrowserSupport() {
    const requiredFeatures = {
        localStorage: !!window.localStorage,
        fetch: !!window.fetch,
        blob: !!window.Blob,
        promise: !!window.Promise
    };
    
    const unsupportedFeatures = Object.keys(requiredFeatures).filter(
        feature => !requiredFeatures[feature]
    );
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Browser does not support required features:', unsupportedFeatures);
        // You could show a warning to the user here
    }
}

/**
 * Handle dark/light mode toggle (for future implementation)
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Store preference in localStorage for future visits
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Show notification to user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functions for use in other modules
window.app = {
    showNotification,
    toggleDarkMode
};