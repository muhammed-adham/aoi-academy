// Global variables
let isLoggedIn = false;
let selectedCourse = '';
let selectedRoom = '';
let currentLanguage = 'en';

// Translation object
const translations = {
    en: {
        // Navigation
        home: "Home",
        about: "About",
        courses: "Courses",
        rooms: "Rooms & Labs",
        instructors: "Instructors",
        news: "News",
        videos: "Videos",
        contact: "Contact",
        signin: "Sign In",
        profile: "Profile",
        logout: "Logout",

        // Hero section
        heroTitle: "Elevate Your Skills with <span class='text-secondary-custom'>Expert Training</span>",
        heroSubtitle: "Join thousands of professionals who have advanced their careers through our comprehensive training programs, modern facilities, and world-class instructors.",
        exploreCourses: "Explore Courses <i class='fas fa-arrow-right ms-2'></i>",
        learnMore: "Learn More",

        // Stats
        graduates: "Graduates",
        coursesCount: "Courses",
        expertInstructors: "Expert Instructors",
        yearsExperience: "Years Experience",

        // Featured courses
        featuredCourses: "Featured Courses",
        featuredCoursesSubtitle: "Discover our most popular and in-demand training programs",
        enrollNow: "Enroll Now",

        // Course titles
        leadershipTitle: "Advanced Leadership Training",
        leadershipDesc: "Master the skills needed to lead teams effectively and drive organizational success in today's dynamic business environment.",
        dataAnalyticsTitle: "Data Analytics & Visualization",
        dataAnalyticsDesc: "Transform data into actionable insights using the latest tools and techniques in data science and business intelligence.",
        digitalMarketingTitle: "Digital Marketing Mastery",
        digitalMarketingDesc: "Learn cutting-edge digital marketing strategies including SEO, social media, and content marketing for maximum impact.",

        // Why choose us
        whyChooseUs: "Why Choose Elite Training Center?",
        expertInstructorsTitle: "Expert Instructors",
        expertInstructorsDesc: "Learn from industry leaders, including former ministers and top executives.",
        modernFacilitiesTitle: "Modern Facilities",
        modernFacilitiesDesc: "State-of-the-art labs and conference rooms equipped with latest technology.",
        certifiedProgramsTitle: "Certified Programs",
        certifiedProgramsDesc: "Receive industry-recognized certifications upon course completion.",

        // Footer
        tagline:"Empowering professionals with world-class training and development programs for over 25 years.",
        quickLinks: "Quick Links",
        services: "Services",
        contactInfo: "Contact Info",
        professionalTraining: "Professional Training",
        roomRental: "Room Rental",
        certificationPrograms: "Certification Programs",
        rightsReserved: "All rights reserved."
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        about: "من نحن",
        courses: "الدورات",
        rooms: "القاعات والمعامل",
        instructors: "المدربون",
        news: "الأخبار",
        videos: "الفيديوهات",
        contact: "تواصل معنا",
        signin: "تسجيل الدخول",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",

        // Hero section
        heroTitle: "ارتق بمهاراتك مع <span class='text-secondary-custom'>التدريب المتخصص</span>",
        heroSubtitle: "انضم إلى آلاف المهنيين الذين طوروا مسيرتهم المهنية من خلال برامجنا التدريبية الشاملة ومرافقنا الحديثة ومدربينا المتميزين.",
        exploreCourses: "استكشف الدورات <i class='fas fa-arrow-left ms-2'></i>",
        learnMore: "اعرف المزيد",

        // Stats
        graduates: "خريج",
        coursesCount: "دورة",
        expertInstructors: "مدرب متخصص",
        yearsExperience: "سنة خبرة",

        // Featured courses
        featuredCourses: "الدورات المميزة",
        featuredCoursesSubtitle: "اكتشف أشهر وأهم برامجنا التدريبية",
        enrollNow: "سجل الآن",

        // Course titles
        leadershipTitle: "التدريب المتقدم على القيادة",
        leadershipDesc: "أتقن المهارات المطلوبة لقيادة الفرق بفعالية ودفع نجاح المؤسسة في بيئة الأعمال الديناميكية اليوم.",
        dataAnalyticsTitle: "تحليل البيانات والتصور",
        dataAnalyticsDesc: "حول البيانات إلى رؤى قابلة للتنفيذ باستخدام أحدث الأدوات والتقنيات في علوم البيانات وذكاء الأعمال.",
        digitalMarketingTitle: "إتقان التسويق الرقمي",
        digitalMarketingDesc: "تعلم استراتيجيات التسويق الرقمي المتطورة بما في ذلك السيو ووسائل التواصل الاجتماعي والتسويق بالمحتوى.",

        // Why choose us
        whyChooseUs: "لماذا تختار مركز النخبة للتدريب؟",
        expertInstructorsTitle: "مدربون متخصصون",
        expertInstructorsDesc: "تعلم من قادة الصناعة، بما في ذلك وزراء سابقون وكبار التنفيذيين.",
        modernFacilitiesTitle: "مرافق حديثة",
        modernFacilitiesDesc: "معامل وقاعات مؤتمرات متطورة مجهزة بأحدث التقنيات.",
        certifiedProgramsTitle: "برامج معتمدة",
        certifiedProgramsDesc: "احصل على شهادات معترف بها في الصناعة عند إتمام الدورة.",

        // Footer
        tagline:"تمكين المحترفين ببرامج تدريب وتطوير عالمية المستوى منذ أكثر من 25 عامًا.",
        quickLinks: "روابط سريعة",
        services: "الخدمات",
        contactInfo: "معلومات التواصل",
        professionalTraining: "التدريب المهني",
        roomRental: "تأجير القاعات",
        certificationPrograms: "برامج الشهادات",
        rightsReserved: "جميع الحقوق محفوظة."
    }
};

// Language toggle function
function toggleLanguage() {
    const languageSwitch = document.getElementById('languageSwitch');
    const body = document.body;
    const languageLabel = document.getElementById('languageLabel');

    if (languageSwitch.checked) {
        currentLanguage = 'ar';
        body.classList.add('rtl');
        body.dir = 'rtl';
        languageLabel.textContent = 'English';
    } else {
        currentLanguage = 'en';
        body.classList.remove('rtl');
        body.dir = 'ltr';
        languageLabel.textContent = 'العربية';
    }

    updatePageContent();
}

// Update page content based on current language
function updatePageContent() {
    const t = translations[currentLanguage];

    // Update navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navTexts = ['home', 'about', 'courses', 'rooms', 'instructors', 'news', 'videos', 'contact'];
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            link.textContent = t[navTexts[index]];
        }
    });

    // Update auth buttons
    document.querySelector('.auth-btn-text').textContent = t.signin;
    document.querySelector('.profile-btn-text').textContent = t.profile;
    document.querySelector('.logout-btn-text').textContent = t.logout;

    // Update hero section
    document.querySelector('.hero h1').innerHTML = t.heroTitle;
    document.querySelector('.hero p').textContent = t.heroSubtitle;
    document.querySelector('.btn-primary-custom').innerHTML = `${t.exploreCourses}`;
    document.querySelector('.btn-outline-custom').textContent = t.learnMore;

    // Update stats
    const statLabels = document.querySelectorAll('.stat-label');
    const statTexts = [t.graduates, t.coursesCount, t.expertInstructors, t.yearsExperience];
    statLabels.forEach((label, index) => {
        if (statTexts[index]) {
            label.textContent = statTexts[index];
        }
    });

    // Update featured courses section
    document.querySelector('.section-title').textContent = t.featuredCourses;
    document.querySelector('.section-subtitle').textContent = t.featuredCoursesSubtitle;

    // Update course cards
    const courseCards = document.querySelectorAll('#home-page .card-custom');
    const courseData = [
        { title: t.leadershipTitle, desc: t.leadershipDesc },
        { title: t.dataAnalyticsTitle, desc: t.dataAnalyticsDesc },
        { title: t.digitalMarketingTitle, desc: t.digitalMarketingDesc }
    ];

    courseCards.forEach((card, index) => {
        if (courseData[index]) {
            const title = card.querySelector('.card-title');
            const desc = card.querySelector('.card-text');
            const btn = card.querySelector('.btn-card');

            if (title) title.textContent = courseData[index].title;
            if (desc) desc.textContent = courseData[index].desc;
            if (btn) btn.innerHTML = `${t.enrollNow} <i class="fas fa-arrow-right ms-1"></i>`;
        }
    });

    // Update why choose us section
    const whyChooseTitle = document.querySelector('.section-title.text-start');
    if (whyChooseTitle) {
        whyChooseTitle.textContent = t.whyChooseUs;
    }

    const whyChooseItems = document.querySelectorAll('#home-page .d-flex.align-items-start');
    const whyChooseData = [
        { title: t.expertInstructorsTitle, desc: t.expertInstructorsDesc },
        { title: t.modernFacilitiesTitle, desc: t.modernFacilitiesDesc },
        { title: t.certifiedProgramsTitle, desc: t.certifiedProgramsDesc }
    ];

    whyChooseItems.forEach((item, index) => {
        if (whyChooseData[index]) {
            const title = item.querySelector('h5');
            const desc = item.querySelector('p');

            if (title) title.textContent = whyChooseData[index].title;
            if (desc) desc.textContent = whyChooseData[index].desc;
        }
    });

    // Update footer
    const footerTitles = document.querySelectorAll('.footer h5');
    const footerTexts = ['Elite Training Center', t.quickLinks, t.services, t.contactInfo];
    footerTitles.forEach((title, index) => {
        if (footerTexts[index] && index > 0) {
            title.textContent = footerTexts[index];
        }
    });
    
    const footerTagline= document.querySelectorAll('.footer p');
    footerTagline[0].textContent = t.tagline;

    // Update footer links
    const footerLinks = document.querySelectorAll('.footer ul li a');
    const footerLinkTexts = [
        t.home, t.about, t.courses, t.contact,
        t.professionalTraining, t.roomRental, t.expertInstructors, t.certificationPrograms
    ];

    footerLinks.forEach((link, index) => {
        if (footerLinkTexts[index]) {
            link.textContent = footerLinkTexts[index];
        }
    });

    // Update copyright
    const copyright = document.querySelector('.footer .text-center p');
    if (copyright) {
        copyright.innerHTML = `&copy; 2025 AOI Academy ${t.rightsReserved}`;
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Show selected page
    document.getElementById(pageId + '-page').classList.remove('hidden');

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (pageId === 'home') {
        document.querySelector('.navbar-nav .nav-link').classList.add('active');
    } else {
        const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }

    // Update URL without page reload
    const newUrl = pageId === 'home' ? '/' : `/${pageId}`;
    history.pushState({ page: pageId }, '', newUrl);


    // Scroll to top
    window.scrollTo(0, 0);
}

/* ===== URL Handler Start ===== */
// Handle browser back/forward buttons
window.addEventListener('popstate', function (event) {
    const pageId = event.state ? event.state.page : getPageFromUrl();
    showPageWithoutHistoryUpdate(pageId);
});

// Get page ID from current URL
function getPageFromUrl() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
        return 'home';
    }
    return path.substring(1); // Remove leading slash
}

// Show page without updating browser history (for back/forward navigation)
function showPageWithoutHistoryUpdate(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    } else {
        // Fallback to home if page doesn't exist
        document.getElementById('home-page').classList.remove('hidden');
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (pageId === 'home') {
        document.querySelector('.navbar-nav .nav-link').classList.add('active');
    } else {
        const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Initialize the correct page on load
document.addEventListener('DOMContentLoaded', function () {
    const initialPage = getPageFromUrl();
    showPageWithoutHistoryUpdate(initialPage);
});

// This allows users to right-click and open in new tab/window
function updateNavLinks() {
    document.querySelectorAll('[onclick*="showPage"]').forEach(link => {
        const match = link.getAttribute('onclick').match(/showPage\('(.+?)'\)/);
        if (match) {
            const pageId = match[1];
            const href = pageId === 'home' ? '/' : `/${pageId}`;
            link.setAttribute('href', href);

            // Prevent default link behavior and use our routing
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showPage(pageId);
            });
        }
    });
}
/* ===== URL Handler End ===== */

// Handle CTA clicks (Check authentication)
function handleCTAClick(type, item) {
    if (!isLoggedIn) {
        showPage('signin');
        return;
    }

    if (type === 'course') {
        selectedCourse = getCourseTitle(item);
        document.getElementById('selectedCourse').value = selectedCourse;
        showPage('course-enrollment');
    } else if (type === 'room') {
        selectedRoom = getRoomTitle(item);
        document.getElementById('selectedRoom').value = selectedRoom;
        showPage('room-booking');
    }
}

// Get course title by ID
function getCourseTitle(courseId) {
    const courseTitles = {
        'leadership': 'Advanced Leadership Training',
        'data-analytics': 'Data Analytics & Visualization',
        'digital-marketing': 'Digital Marketing Mastery',
        'project-management': 'Project Management Professional',
        'financial-analysis': 'Financial Analysis & Modeling',
        'communication': 'Executive Communication Skills'
    };
    return courseTitles[courseId] || 'Selected Course';
}

// Get room title by ID
function getRoomTitle(roomId) {
    const roomTitles = {
        'executive-conference': 'Executive Conference Room',
        'computer-lab': 'Advanced Computer Lab',
        'training-hall': 'Main Training Hall',
        'workshop-studio': 'Interactive Workshop Studio'
    };
    return roomTitles[roomId] || 'Selected Room';
}

// Toggle user type in enrollment form
function toggleUserType() {
    const switchInput = document.getElementById('userTypeSwitch');
    const label = document.getElementById('userTypeLabel');
    const insideFields = document.getElementById('insideCompanyFields');
    const outsideFields = document.getElementById('outsideCompanyFields');

    if (switchInput.checked) {
        label.textContent = 'Outside Company';
        insideFields.classList.add('hidden');
        outsideFields.classList.remove('hidden');

        // Make outside fields required
        document.getElementById('college').required = true;
        document.getElementById('direction').required = true;
        document.getElementById('fileNumber').required = false;
        document.getElementById('workSection').required = false;
    } else {
        label.textContent = 'Inside Company';
        insideFields.classList.remove('hidden');
        outsideFields.classList.add('hidden');

        // Make inside fields required
        document.getElementById('fileNumber').required = true;
        document.getElementById('workSection').required = true;
        document.getElementById('college').required = false;
        document.getElementById('direction').required = false;
    }
}

// Handle sign in
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Simple validation (in real app, this would connect to backend)
    if (email && password) {
        isLoggedIn = true;
        updateAuthUI();
        showPage('home');
        alert('Successfully signed in!');
    }
}

// Handle sign up
function handleSignUp(event) {
    event.preventDefault();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    isLoggedIn = true;
    updateAuthUI();
    showPage('home');
    alert('Account created successfully!');
}

// Handle course enrollment
function handleCourseEnrollment(event) {
    event.preventDefault();
    alert('Enrollment submitted successfully! We will contact you soon.');
    showPage('home');
}

// Handle room booking
function handleRoomBooking(event) {
    event.preventDefault();
    alert('Booking request submitted successfully! We will confirm availability and contact you soon.');
    showPage('home');
}

// Logout
function logout() {
    isLoggedIn = false;
    updateAuthUI();
    showPage('home');
    alert('Successfully logged out!');
}

// Update authentication UI
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const userBtn = document.getElementById('userBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        authBtn.style.display = 'none';
        userBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
    } else {
        authBtn.style.display = 'inline-block';
        userBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    showPage('home');

    // Initialize language
    currentLanguage = 'en';
    updatePageContent();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add scroll animations
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver(function (entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('fade-in-up');
//         }
//     });
// }, observerOptions);

// // Observe elements for animation
// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('.card-custom, .instructor-card, .stat-item').forEach(el => {
//         observer.observe(el);
//     });
// });

// // Observe elements for animation
// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('.card-custom, .instructor-card, .stat-item').forEach(el => {
//         observer.observe(el);
//     });
// });