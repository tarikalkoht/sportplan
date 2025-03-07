/**
 * PDF Generator Script
 * Handles creation and downloading of PDF files
 */

// Import PDF library (jsPDF)
// Note: In a real application, you'd include this via script tag in index.html
// For demonstration, we'll mock it here
// When implementing, add: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

/**
 * Generate and download a PDF with the plan data
 * @param {Object} planData - The plan data from the backend
 * @returns {Promise<void>}
 */
async function generatePDF(planData) {
    try {
        // Check if jsPDF is available
        if (typeof jspdf === 'undefined') {
            // If in development mode and jsPDF is not available, load it dynamically
            await loadJsPDF();
        }
        
        // Initialize PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });
        
        // Add support for Arabic (needs arabic font like Tajawal)
        doc.addFont('fonts/tajawal/Tajawal-Regular.ttf', 'Tajawal', 'normal');
        doc.addFont('fonts/tajawal/Tajawal-Bold.ttf', 'Tajawal', 'bold');
        
        // Set default font
        doc.setFont('Tajawal');
        
        // Add RTL support
        doc.setR2L(true);
        
        // Create PDF content
        createPDFContent(doc, planData);
        
        // Save the PDF
        doc.save(`خطة-اللياقة-والتغذية-${new Date().toLocaleDateString('ar-SA').replace(/\//g, '-')}.pdf`);
        
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        window.app.showNotification('حدث خطأ أثناء إنشاء ملف PDF', 'error');
        throw error;
    }
}

/**
 * Load jsPDF library dynamically if not available
 * @returns {Promise<void>}
 */
function loadJsPDF() {
    return new Promise((resolve, reject) => {
        // In a real application, this would load the library
        // For demo purposes, we'll simulate the library
        console.log('Loading jsPDF library...');
        
        // Mock jsPDF for demo
        window.jspdf = {
            jsPDF: function(options) {
                return {
                    setR2L: function() {},
                    addFont: function() {},
                    setFont: function() {},
                    setFontSize: function() {},
                    setTextColor: function() {},
                    setFillColor: function() {},
                    setDrawColor: function() {},
                    rect: function() {},
                    text: function() {},
                    line: function() {},
                    addPage: function() {},
                    save: function(filename) {
                        console.log(`Saving PDF as: ${filename}`);
                    }
                };
            }
        };
        
        // Simulate loading delay
        setTimeout(resolve, 500);
    });
}

/**
 * Create the content of the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {Object} planData - The plan data
 */
function createPDFContent(doc, planData) {
    // Set page margins
    const margin = 15;
    const pageWidth = 210; // A4 width in mm
    const contentWidth = pageWidth - (margin * 2);
    
    // Keep track of vertical position
    let y = margin;
    
    // Add title
    y = addTitle(doc, 'خطة اللياقة والتغذية الشخصية', y);
    y += 5;
    
    // Add date
    const date = planData.date || new Date().toLocaleDateString('ar-SA');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`تاريخ الإنشاء: ${date}`, pageWidth - margin, y, { align: 'right' });
    y += 10;
    
    // Add user information section
    y = addSectionTitle(doc, 'معلومات المستخدم', y);
    y = addUserInformation(doc, planData.user, y, margin, contentWidth);
    y += 10;
    
    // Add workout plan section
    y = addSectionTitle(doc, 'خطة التمارين', y);
    y = addWorkoutPlan(doc, planData.workoutPlan, y, margin, contentWidth);
    
    // Check if we need a new page for diet plan
    if (y > 230) {
        doc.addPage();
        y = margin;
    }
    
    y += 10;
    
    // Add diet plan section
    y = addSectionTitle(doc, 'النظام الغذائي', y);
    y = addDietPlan(doc, planData.dietPlan, y, margin, contentWidth);
    
    // Add notes section
    y += 10;
    y = addSectionTitle(doc, 'ملاحظات هامة', y);
    y = addNotes(doc, planData, y, margin, contentWidth);
    
    // Add footer
    addFooter(doc, 'جميع الخطط مقدمة كإرشادات عامة فقط. يرجى استشارة أخصائي صحي قبل بدء أي نظام تمارين أو نظام غذائي جديد.');
}

/**
 * Add a title to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {string} text - The title text
 * @param {number} y - The current y position
 * @returns {number} - The new y position
 */
function addTitle(doc, text, y) {
    doc.setFont('Tajawal', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(13, 148, 136); // Teal color
    doc.text(text, 105, y, { align: 'center' });
    
    // Add underline
    doc.setDrawColor(13, 148, 136);
    doc.line(50, y + 2, 160, y + 2);
    
    return y + 10;
}

/**
 * Add a section title to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {string} text - The section title text
 * @param {number} y - The current y position
 * @returns {number} - The new y position
 */
function addSectionTitle(doc, text, y) {
    doc.setFont('Tajawal', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(13, 148, 136); // Teal color
    doc.text(text, 195 - margin, y);
    
    // Add section separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y + 2, 195 - margin, y + 2);
    
    return y + 8;
}

/**
 * Add user information to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {Object} user - The user data
 * @param {number} y - The current y position
 * @param {number} margin - The page margin
 * @param {number} width - The content width
 * @returns {number} - The new y position
 */
function addUserInformation(doc, user, y, margin, width) {
    doc.setFont('Tajawal', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    // Create user info text
    const leftMargin = margin;
    const rightMargin = 210 - margin;
    
    // First row
    doc.text(`العمر: ${user.age} سنة`, rightMargin, y, { align: 'right' });
    doc.text(`الوزن: ${user.weight} كجم`, rightMargin - 70, y, { align: 'right' });
    doc.text(`الطول: ${user.height} سم`, leftMargin, y);
    y += 7;
    
    // Second row
    doc.text(`مؤشر كتلة الجسم (BMI): ${user.bmi}`, rightMargin, y, { align: 'right' });
    doc.text(`السعرات الحرارية المستهدفة: ${user.targetCalories} سعر/يوم`, leftMargin, y);
    
    // Add BMI classification
    y += 7;
    let bmiClass = '';
    let bmiColor = [0, 0, 0];
    
    if (user.bmi < 18.5) {
        bmiClass = 'نقص في الوزن';
        bmiColor = [255, 165, 0]; // Orange
    } else if (user.bmi < 25) {
        bmiClass = 'وزن طبيعي';
        bmiColor = [0, 128, 0]; // Green
    } else if (user.bmi < 30) {
        bmiClass = 'زيادة في الوزن';
        bmiColor = [255, 165, 0]; // Orange
    } else {
        bmiClass = 'سمنة';
        bmiColor = [255, 0, 0]; // Red
    }
    
    doc.setTextColor(bmiColor[0], bmiColor[1], bmiColor[2]);
    doc.text(`تصنيف مؤشر كتلة الجسم: ${bmiClass}`, rightMargin, y, { align: 'right' });
    
    // Reset text color
    doc.setTextColor(60, 60, 60);
    
    return y;
}

/**
 * Add workout plan to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {Object} workoutPlan - The workout plan data
 * @param {number} y - The current y position
 * @param {number} margin - The page margin
 * @param {number} width - The content width
 * @returns {number} - The new y position
 */
function addWorkoutPlan(doc, workoutPlan, y, margin, width) {
    // Reset to normal text style
    doc.setFont('Tajawal', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    // Add plan description
    doc.text(workoutPlan.description, 195 - margin, y, { align: 'right' });
    y += 7;
    
    // Loop through workout days
    for (const dayPlan of workoutPlan.days) {
        // Check if we need a new page
        if (y > 250) {
            doc.addPage();
            y = margin;
        }
        
        // Add day title
        doc.setFont('Tajawal', 'bold');
        doc.text(`${dayPlan.day} - ${dayPlan.focus}`, 195 - margin, y, { align: 'right' });
        y += 6;
        
        // Add exercises
        doc.setFont('Tajawal', 'normal');
        for (const exercise of dayPlan.exercises) {
            let exerciseText = `• ${exercise.name}`;
            
            if (exercise.sets && exercise.reps) {
                exerciseText += ` - ${exercise.sets} مجموعات × ${exercise.reps} تكرار`;
            } else if (exercise.duration) {
                exerciseText += ` - ${exercise.duration}`;
                
                if (exercise.intensity) {
                    exerciseText += ` (شدة ${exercise.intensity})`;
                }
            }
            
            doc.text(exerciseText, 190 - margin, y, { align: 'right' });
            y += 5;
        }
        
        // Add space between days
        y += 3;
    }
    
    return y;
}

/**
 * Add diet plan to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {Object} dietPlan - The diet plan data
 * @param {number} y - The current y position
 * @param {number} margin - The page margin
 * @param {number} width - The content width
 * @returns {number} - The new y position
 */
function addDietPlan(doc, dietPlan, y, margin, width) {
    // Reset to normal text style
    doc.setFont('Tajawal', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    // Add plan description
    doc.text(dietPlan.description, 195 - margin, y, { align: 'right' });
    y += 7;
    
    // Loop through meals
    for (const meal of dietPlan.meals) {
        // Check if we need a new page
        if (y > 250) {
            doc.addPage();
            y = margin;
        }
        
        // Add meal title
        doc.setFont('Tajawal', 'bold');
        doc.text(meal.name, 195 - margin, y, { align: 'right' });
        y += 6;
        
        // Add meal suggestions
        doc.setFont('Tajawal', 'normal');
        for (const suggestion of meal.suggestions) {
            doc.text(`• ${suggestion}`, 190 - margin, y, { align: 'right' });
            y += 5;
        }
        
        // Add space between meals
        y += 3;
    }
    
    return y;
}

/**
 * Add notes to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {Object} planData - The plan data
 * @param {number} y - The current y position
 * @param {number} margin - The page margin
 * @param {number} width - The content width
 * @returns {number} - The new y position
 */
function addNotes(doc, planData, y, margin, width) {
    doc.setFont('Tajawal', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    
    // Add notes based on user's goal
    let notes = [];
    
    switch(planData.goal) {
        case 'weight_loss':
            notes = [
                'حاول الحفاظ على عجز سعرات حرارية معتدل (500-750 سعر حراري يومياً)',
                'ركز على تمارين الكارديو والتمارين عالية الكثافة',
                'اشرب كمية كافية من الماء (8-10 أكواب يومياً)',
                'تناول البروتين مع كل وجبة للحفاظ على كتلة العضلات'
            ];
            break;
        case 'muscle_gain':
            notes = [
                'احرص على تناول فائض معتدل من السعرات الحرارية (300-500 سعر حراري يومياً)',
                'ركز على تمارين المقاومة والأوزان الثقيلة',
                'تناول البروتين بمعدل 1.6-2 جرام لكل كيلوجرام من وزن الجسم',
                'احصل على قسط كافٍ من النوم (7-9 ساعات) للتعافي'
            ];
            break;
        case 'fitness':
            notes = [
                'حافظ على التوازن بين تمارين الكارديو وتمارين القوة',
                'تناول نظاماً غذائياً متوازناً يشمل جميع العناصر الغذائية',
                'استهدف 150 دقيقة من النشاط البدني المعتدل أسبوعياً على الأقل',
                'خصص أياماً للراحة والتعافي ضمن خطتك'
            ];
            break;
    }
    
    // Add general notes
    notes.push('استشر طبيباً قبل بدء أي برنامج تمارين جديد');
    notes.push('اشرب الكثير من الماء طوال اليوم');
    notes.push('استمع إلى جسمك وتوقف عند الشعور بالألم');
    
    // Add the notes to PDF
    for (const note of notes) {
        doc.text(`• ${note}`, 190 - margin, y, { align: 'right' });
        y += 5;
    }
    
    return y;
}

/**
 * Add footer to the PDF document
 * @param {Object} doc - The jsPDF document object
 * @param {string} text - The footer text
 */
function addFooter(doc, text) {
    const pageCount = doc.internal.getNumberOfPages();
    
    // Add footer to all pages
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Add footer text
        doc.setFont('Tajawal', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        
        // Footer text
        doc.text(text, 105, 287, { align: 'center' });
        
        // Page number
        doc.text(`صفحة ${i} من ${pageCount}`, 105, 292, { align: 'center' });
    }
}