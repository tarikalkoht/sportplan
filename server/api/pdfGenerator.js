const { jsPDF } = require('jspdf');
require('jspdf-autotable');

/**
 * Load jsPDF library if not already loaded
 */
async function loadJsPDF() {
    if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        return new Promise((resolve) => {
            script.onload = resolve;
        });
    }
}

/**
 * Generate a PDF document from plan data
 * @param {Object} planData - The plan data to include in the PDF
 * @returns {Promise<boolean>} - Returns true if PDF generation is successful
 */
async function generatePDF(planData) {
    try {
        // إنشاء عنصر HTML مؤقت
        const container = document.createElement('div');
        container.style.width = '210mm';
        container.style.fontFamily = 'Tajawal, sans-serif';
        container.style.direction = 'rtl';
        container.style.textAlign = 'right';
        container.style.visibility = 'hidden';
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        document.body.appendChild(container);
        
        // إضافة المحتوى
        container.innerHTML = `
            <div style="padding: 20mm; color: #333;">
                <h1 style="color: #0d9488; text-align: center; font-size: 24px; margin-bottom: 10mm;">خطة اللياقة والتغذية الشخصية</h1>
                <div style="margin-bottom: 10mm;">
                    <h2 style="color: #0d9488; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 2mm;">معلومات المستخدم</h2>
                    <p>العمر: ${planData.user.age} سنة</p>
                    <p>الوزن: ${planData.user.weight} كجم</p>
                    <p>الطول: ${planData.user.height} سم</p>
                    <p>مؤشر كتلة الجسم: ${planData.user.bmi}</p>
                    <p>السعرات الحرارية المستهدفة: ${planData.user.targetCalories} سعر/يوم</p>
                </div>
                
                <div style="margin-bottom: 10mm;">
                    <h2 style="color: #0d9488; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 2mm;">خطة التمارين</h2>
                    <p>${planData.workoutPlan.description}</p>
                    ${planData.workoutPlan.days.map(day => `
                        <div style="margin-top: 5mm;">
                            <h3 style="font-size: 16px;">${day.day} - ${day.focus}</h3>
                            <ul style="list-style-type: none; padding-right: 5mm;">
                                ${day.exercises.map(exercise => `
                                    <li style="margin-bottom: 2mm;">• ${exercise.name} ${exercise.sets && exercise.reps ? `- ${exercise.sets} مجموعات × ${exercise.reps} تكرار` : ''} ${exercise.duration ? `- ${exercise.duration}` : ''}</li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-bottom: 10mm;">
                    <h2 style="color: #0d9488; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 2mm;">النظام الغذائي</h2>
                    <p>${planData.dietPlan.description}</p>
                    ${planData.dietPlan.meals.map(meal => `
                        <div style="margin-top: 5mm;">
                            <h3 style="font-size: 16px;">${meal.name}</h3>
                            <ul style="list-style-type: none; padding-right: 5mm;">
                                ${meal.suggestions.map(item => `<li style="margin-bottom: 2mm;">• ${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 10mm; font-size: 12px; color: #666; text-align: center;">
                    <p>جميع الخطط مقدمة كإرشادات عامة فقط. يرجى استشارة أخصائي صحي قبل بدء أي نظام تمارين أو نظام غذائي جديد.</p>
                </div>
            </div>
        `;
        
        // استخدام html2pdf للتحويل
        const opt = {
            margin: 0,
            filename: `خطة-اللياقة-والتغذية-${new Date().toLocaleDateString('ar-SA').replace(/\//g, '-')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        await html2pdf().from(container).set(opt).save();
        
        // إزالة العنصر المؤقت
        document.body.removeChild(container);
        
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        window.app.showNotification('حدث خطأ أثناء إنشاء ملف PDF', 'error');
        throw error;
    }
}

module.exports = {
    generatePDF
};
