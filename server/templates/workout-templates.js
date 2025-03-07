/**
 * Workout Templates Module
 * Contains predefined workout plans for different goals and frequencies
 */

// Workout templates for different goals
const workoutTemplates = {
    // Weight loss workouts
    weight_loss: {
        title: 'خطة تمارين لفقدان الوزن',
        description: 'تركز هذه الخطة على حرق الدهون وزيادة التمثيل الغذائي من خلال مزيج من تمارين الكارديو والقوة',
        frequency: {
            3: [
                {
                    day: 'اليوم الأول',
                    focus: 'الكارديو وكامل الجسم',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين القرفصاء العميقة', sets: '4', reps: '15' },
                        { name: 'تمارين الدفع الأمامي (لانجز)', sets: '3', reps: '12 لكل رجل' },
                        { name: 'تمارين الساق الخلفية', sets: '3', reps: '15' },
                        { name: 'تمارين الكاحل', sets: '3', reps: '20' },
                        { name: 'تمارين البطن', sets: '3', reps: '20' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'تمارين كارديو هوائية',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سباحة أو دراجة أو جري', duration: '30 دقيقة', intensity: 'متوسطة' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ],
            5: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين القلب والأوعية الدموية',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'جري متوسط الشدة', duration: '20 دقيقة', intensity: 'متوسطة' },
                        { name: 'تمارين فتري', duration: '15 دقيقة', intensity: 'متوسطة إلى عالية', notes: '1 دقيقة سريع، 1 دقيقة معتدل' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'تمارين القوة للجزء العلوي',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين الضغط المتنوعة', sets: '3', reps: '12-15' },
                        { name: 'تمارين الذراعين بالدمبل', sets: '3', reps: '12' },
                        { name: 'تمارين الظهر', sets: '3', reps: '12' },
                        { name: 'تمارين الكتف', sets: '3', reps: '15' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'تمارين المرونة والتوازن',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين اليوغا', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين توازن', sets: '3', duration: '1 دقيقة لكل وضعية' },
                        { name: 'تمارين إطالة', duration: '15 دقيقة', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'تمارين القوة للجزء السفلي',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين القرفصاء المتنوعة', sets: '3', reps: '15' },
                        { name: 'تمارين الدفع الأمامي (لانجز)', sets: '3', reps: '12 لكل رجل' },
                        { name: 'تمارين الساق الخلفية', sets: '3', reps: '15' },
                        { name: 'تمارين الكاحل', sets: '3', reps: '20' },
                        { name: 'تمارين البطن', sets: '3', reps: '20' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'تمارين متكاملة للجسم',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين دائرية', duration: '30 دقيقة', intensity: 'متوسطة إلى عالية', notes: '40 ثانية عمل، 20 ثانية راحة' },
                        { name: 'بيرباي', sets: '3', reps: '10' },
                        { name: 'ماونتن كلايمبرز', sets: '3', reps: '20' },
                        { name: 'جامبنج جاك', sets: '3', reps: '30' },
                        { name: 'تمارين البلانك', sets: '3', duration: '30-60 ثانية' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'تمارين كارديو هوائية',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سباحة أو دراجة أو جري', duration: '30-45 دقيقة', intensity: 'متوسطة' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ]
        }
    },
    // Fitness improvement workouts
    fitness: {
        title: 'خطة تمارين لتحسين اللياقة البدنية',
        description: 'تركز هذه الخطة على تحسين اللياقة البدنية العامة والصحة من خلال مجموعة متنوعة من التمارين',
        frequency: {
            3: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين القلب والأوعية الدموية',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'جري متوسط الشدة', duration: '25 دقيقة', intensity: 'متوسطة' },
                        { name: 'تمارين القفز', sets: '3', reps: '20' },
                        { name: 'تمارين السرعة', duration: '10 دقائق', intensity: 'عالية', notes: '30 ثانية جري سريع، 1 دقيقة مشي' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'تمارين المرونة والتوازن',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين اليوغا', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين توازن', sets: '3', duration: '1 دقيقة لكل وضعية' },
                        { name: 'تمارين إطالة', duration: '15 دقيقة', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'تدريب متكامل للجسم',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين متكاملة (بيرباي)', sets: '3', reps: '10' },
                        { name: 'تمارين البلانك', sets: '3', duration: '30-60 ثانية' },
                        { name: 'تمارين الجذع', sets: '3', reps: '15' },
                        { name: 'تمارين القرفصاء', sets: '3', reps: '15' },
                        { name: 'تمارين الضغط', sets: '3', reps: '10-15' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ],
            4: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين القلب والأوعية الدموية',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'جري متوسط الشدة', duration: '25 دقيقة', intensity: 'متوسطة' },
                        { name: 'تمارين فتري', duration: '15 دقيقة', intensity: 'متوسطة إلى عالية', notes: '1 دقيقة سريع، 2 دقيقة معتدل' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'تمارين القوة للجزء العلوي',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين الضغط', sets: '3', reps: '12-15' },
                        { name: 'تمارين الذراعين بالدمبل', sets: '3', reps: '12' },
                        { name: 'تمارين الظهر', sets: '3', reps: '12' },
                        { name: 'تمارين الكتف', sets: '3', reps: '15' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'تمارين المرونة والتوازن',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين اليوغا', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين توازن', sets: '3', duration: '1 دقيقة لكل وضعية' },
                        { name: 'تمارين إطالة', duration: '15 دقيقة', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'تمارين القوة للجزء السفلي',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين القرفصاء', sets: '3', reps: '15' },
                        { name: 'تمارين الدفع الأمامي (لانجز)', sets: '3', reps: '12 لكل رجل' },
                        { name: 'تمارين الساق الخلفية', sets: '3', reps: '15' },
                        { name: 'تمارين الكاحل', sets: '3', reps: '20' },
                        { name: 'تمارين البطن', sets: '3', reps: '20' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'كارديو طويل',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'جري أو مشي سريع', duration: '45 دقيقة', intensity: 'متوسطة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'تدريب متكامل للجسم',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'تمارين الدائرة', duration: '30 دقيقة', intensity: 'عالية', notes: '45 ثانية عمل، 15 ثانية راحة' },
                        { name: 'تمارين القرفصاء', sets: '3', reps: '15' },
                        { name: 'تمارين الضغط', sets: '3', reps: '12' },
                        { name: 'تمارين البطن', sets: '3', reps: '20' },
                        { name: 'تمارين الظهر', sets: '3', reps: '15' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '30 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                }
            ]
        }
    },
    // Muscle gain workouts
    muscle_gain: {
        title: 'خطة تمارين لبناء العضلات',
        description: 'تركز هذه الخطة على زيادة القوة وحجم العضلات من خلال تمارين المقاومة والأوزان',
        frequency: {
            3: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين الصدر والكتفين والترايسبس',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'بنش برس', sets: '4', reps: '8-10' },
                        { name: 'ضغط دمبل مائل', sets: '3', reps: '10' },
                        { name: 'فلاي', sets: '3', reps: '12' },
                        { name: 'ضغط عسكري', sets: '4', reps: '8-10' },
                        { name: 'رفع جانبي', sets: '3', reps: '12' },
                        { name: 'تمارين الترايسبس', sets: '3', reps: '10' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'تمارين الظهر والبايسبس',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سحب علوي', sets: '4', reps: '8-10' },
                        { name: 'صف الدمبل', sets: '3', reps: '10' },
                        { name: 'ديدليفت', sets: '4', reps: '8' },
                        { name: 'بول داون', sets: '3', reps: '12' },
                        { name: 'كيرل البايسبس', sets: '4', reps: '10' },
                        { name: 'كيرل دمبل مطرقة', sets: '3', reps: '12' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'تمارين الأرجل والبطن',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سكوات بالبار', sets: '5', reps: '8' },
                        { name: 'ليج برس', sets: '4', reps: '10' },
                        { name: 'تمارين الرجل الخلفية', sets: '3', reps: '12' },
                        { name: 'كف ماشين', sets: '3', reps: '15' },
                        { name: 'تمارين البطن (كرانش)', sets: '3', reps: '20' },
                        { name: 'بلانك', sets: '3', duration: '30-60 ثانية' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ],
            4: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين الصدر والترايسبس',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'بنش برس', sets: '4', reps: '8-10' },
                        { name: 'ضغط دمبل مائل', sets: '3', reps: '10' },
                        { name: 'ضغط دمبل مستوي', sets: '3', reps: '10' },
                        { name: 'فلاي', sets: '3', reps: '12' },
                        { name: 'تمارين الترايسبس بالكيبل', sets: '4', reps: '10' },
                        { name: 'ديبس', sets: '3', reps: '10' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'تمارين الظهر والبايسبس',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سحب علوي', sets: '4', reps: '8-10' },
                        { name: 'ديدليفت', sets: '4', reps: '8' },
                        { name: 'صف الدمبل', sets: '3', reps: '10' },
                        { name: 'بول داون', sets: '3', reps: '12' },
                        { name: 'كيرل البايسبس', sets: '4', reps: '10' },
                        { name: 'كيرل دمبل مطرقة', sets: '3', reps: '12' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'تمارين الكتفين',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'ضغط عسكري', sets: '4', reps: '8-10' },
                        { name: 'رفع جانبي', sets: '3', reps: '12' },
                        { name: 'رفع أمامي', sets: '3', reps: '12' },
                        { name: 'رفع خلفي', sets: '3', reps: '12' },
                        { name: 'شراق', sets: '3', reps: '10' },
                        { name: 'أبرايت رو', sets: '3', reps: '12' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'تمارين الأرجل والبطن',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سكوات بالبار', sets: '5', reps: '8' },
                        { name: 'ليج برس', sets: '4', reps: '10' },
                        { name: 'لانجز', sets: '3', reps: '10 لكل رجل' },
                        { name: 'تمارين الرجل الخلفية', sets: '3', reps: '12' },
                        { name: 'كف ماشين', sets: '3', reps: '15' },
                        { name: 'تمارين البطن المتنوعة', sets: '3', reps: '20' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'راحة أو نشاط خفيف',
                    exercises: [
                        { name: 'المشي', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تمارين إطالة', duration: '10 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ],
            5: [
                {
                    day: 'اليوم الأول',
                    focus: 'تمارين الصدر',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'بنش برس', sets: '5', reps: '8-10' },
                        { name: 'ضغط دمبل مائل', sets: '4', reps: '10' },
                        { name: 'ضغط دمبل مستوي', sets: '4', reps: '10' },
                        { name: 'فلاي مائل', sets: '3', reps: '12' },
                        { name: 'كروس أوفر', sets: '3', reps: '15' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثاني',
                    focus: 'تمارين الظهر',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سحب علوي', sets: '5', reps: '8-10' },
                        { name: 'ديدليفت', sets: '4', reps: '8' },
                        { name: 'صف الدمبل', sets: '4', reps: '10' },
                        { name: 'بول داون', sets: '3', reps: '12' },
                        { name: 'تي بار رو', sets: '3', reps: '12' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الثالث',
                    focus: 'تمارين الكتفين',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'ضغط عسكري', sets: '5', reps: '8-10' },
                        { name: 'رفع جانبي', sets: '4', reps: '12' },
                        { name: 'رفع أمامي', sets: '3', reps: '12' },
                        { name: 'رفع خلفي', sets: '3', reps: '12' },
                        { name: 'شراق', sets: '4', reps: '10' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الرابع',
                    focus: 'تمارين الذراعين',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'كيرل البايسبس', sets: '4', reps: '10' },
                        { name: 'كيرل دمبل مطرقة', sets: '3', reps: '12' },
                        { name: 'بريتشر كيرل', sets: '3', reps: '10' },
                        { name: 'تمارين الترايسبس بالكيبل', sets: '4', reps: '12' },
                        { name: 'ديبس', sets: '3', reps: '10' },
                        { name: 'ترايسبس اكستنشن', sets: '3', reps: '12' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم الخامس',
                    focus: 'تمارين الأرجل',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'سكوات بالبار', sets: '5', reps: '8' },
                        { name: 'ليج برس', sets: '4', reps: '10' },
                        { name: 'لانجز', sets: '3', reps: '10 لكل رجل' },
                        { name: 'تمارين الرجل الخلفية', sets: '4', reps: '12' },
                        { name: 'كف ماشين', sets: '3', reps: '15' },
                        { name: 'كالف ريزس', sets: '4', reps: '20' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السادس',
                    focus: 'تمارين البطن وكارديو خفيف',
                    exercises: [
                        { name: 'إحماء', duration: '5 دقائق', intensity: 'منخفضة' },
                        { name: 'كرانش', sets: '4', reps: '20' },
                        { name: 'ليج ريزس', sets: '3', reps: '15' },
                        { name: 'روشن تويست', sets: '3', reps: '20' },
                        { name: 'بلانك', sets: '3', duration: '60 ثانية' },
                        { name: 'كارديو خفيف', duration: '20 دقيقة', intensity: 'منخفضة' },
                        { name: 'تهدئة وإطالة', duration: '5 دقائق', intensity: 'منخفضة' }
                    ]
                },
                {
                    day: 'اليوم السابع',
                    focus: 'راحة تامة',
                    exercises: [
                        { name: 'راحة تامة للجسم', notes: 'اسمح لجسمك بالتعافي الكامل' }
                    ]
                }
            ]
        }
    }
};

/**
 * Get a workout plan based on user goals and frequency
 * @param {string} goal - User fitness goal
 * @param {number} frequency - Workout frequency per week
 * @returns {Object} The appropriate workout plan
 */
function getWorkoutPlan(goal, frequency) {
    // Default to 3 days if frequency is invalid
    const freqKey = [3, 4, 5].includes(frequency) ? frequency : 3;
    
    // Default to fitness if goal is invalid
    const goalKey = ['weight_loss', 'muscle_gain', 'fitness'].includes(goal) ? goal : 'fitness';
    
    // Get the workout template
    const template = workoutTemplates[goalKey];
    
    // Create a customized plan
    return {
        title: template.title,
        description: template.description,
        days: template.frequency[freqKey]
    };
}

module.exports = {
    getWorkoutPlan
};