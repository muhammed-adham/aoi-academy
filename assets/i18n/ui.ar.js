import { dictionary } from "../js/core/i18n.js";

const numberFormat = new Intl.NumberFormat("ar-EG", { useGrouping: false });
const num = (n) => numberFormat.format(n);

function plural(n, one, two, few, many) {
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return num(n) + " " + few;
  return num(n) + " " + many;
}

const weeks = (n) => plural(n, "أسبوع واحد", "أسبوعان", "أسابيع", "أسبوعًا");
const hours = (n) => plural(n, "ساعة واحدة", "ساعتان", "ساعات", "ساعة");
const modules = (n) => plural(n, "وحدة واحدة", "وحدتان", "وحدات", "وحدة");
const people = (n) => plural(n, "شخص واحد", "شخصان", "أشخاص", "شخصًا");

const patterns = [
  [/^Go to slide (\d+)$/, (m) => "انتقل إلى الشريحة " + num(+m[1])],
  [/^Room view (\d+)$/, (m) => "منظر القاعة " + num(+m[1])],
  [
    /^Showing (\d+) of (\d+)$/,
    (m) => "عرض " + num(+m[1]) + " من " + num(+m[2]),
  ],
  [/^(\d+) Weeks?$/, (m) => weeks(+m[1])],
  [/^(\d+) hours?$/, (m) => hours(+m[1])],
  [/^(\d+) modules?$/, (m) => modules(+m[1])],
  [
    /^(.+) \((\d+) hrs\)$/,
    (m, tr) => {
      const a = tr(m[1]);
      return a ? a + " (" + hours(+m[2]) + ")" : null;
    },
  ],
  [
    /^(.+) · (.+)$/,
    (m, tr) => {
      const a = tr(m[1]),
        b = tr(m[2]);
      return a && b ? a + " · " + b : null;
    },
  ],
  [/^\$([\d,]+)\/hour$/, (m) => m[1] + "$ / ساعة"],
  [/^\$([\d,]+)\/day$/, (m) => m[1] + "$ / يوم"],
  [/^\$([\d,]+) per day$/, (m) => m[1] + "$ / يوم"],
  [/^(\d+) Capacity$/, (m) => "سعة " + num(+m[1])],
  [/^Up to (\d+) people$/, (m) => "حتى " + people(+m[1])],
  [/^(\d+) people$/, (m) => people(+m[1])],
  [/^(.+) \| AOI Academy$/, (m, tr) => (tr(m[1]) || m[1]) + " | أكاديمية AOI"],

  [
    /^Explain the core ideas behind (.+)$/,
    (m, tr) => {
      const a = tr(m[1]);
      return a ? "شرح الأفكار الأساسية في " + a : null;
    },
  ],
];
patterns.forEach(([regex, build]) => dictionary.addPattern(regex, build));

dictionary.addContext(".stat-label", {
  Graduates: "خريج",
  Courses: "دورة",
  "Expert Instructors": "مدرب متخصص",
  "Years Experience": "سنة خبرة",
});

dictionary.addContext(".page-title", {
  "Room Booking": "حجز القاعات",
});

dictionary.addContext(".card-body h3", {
  Phone: "الهاتف",
});

const ui = {

  "AOI Academy": "أكاديمية AOI",
  "View Details": "عرض التفاصيل",
  "Book Now": "احجز الآن",
  "Enroll Now": "سجّل الآن",
  "Read more": "اقرأ المزيد",
  Share: "مشاركة",
  Email: "البريد الإلكتروني",
  Phone: "رقم الهاتف",
  "Contact Us": "تواصل معنا",
  "Get in touch": "تواصل معنا",
  Details: "التفاصيل",
  Features: "المميزات",
  Home: "الرئيسية",
  Courses: "الدورات",
  Instructors: "المدربون",

  "Dr. Sarah Johnson": "د. سارة جونسون",
  "Prof. Michael Chen": "أ.د. مايكل تشن",
  "Dr. Emily Rodriguez": "د. إميلي رودريغيز",
  "Mr. David Thompson": "السيد ديفيد طومسون",
  "Dr. Lisa Wang": "د. ليزا وانغ",
  "Prof. James Mitchell": "أ.د. جيمس ميتشل",

  breadcrumb: "مسار التنقل",
  "Featured Video": "الفيديو المميز",
  "Room Image": "صورة القاعة",
  "Featured highlights": "أبرز العروض",
  "Previous slide": "الشريحة السابقة",
  "Next slide": "الشريحة التالية",

  "123 AOI Academy, Cairo, Egypt": "123 أكاديمية AOI، القاهرة، مصر",
  "Leadership Training": "التدريب على القيادة",
  "Data Analytics": "تحليل البيانات",
  "Digital Marketing": "التسويق الرقمي",

  "Successfully signed in!": "تم تسجيل الدخول بنجاح!",
  "Passwords do not match!": "كلمتا المرور غير متطابقتين!",
  "Account created successfully!": "تم إنشاء الحساب بنجاح!",
  "Successfully logged out!": "تم تسجيل الخروج بنجاح!",
  "Room details copied to clipboard!": "تم نسخ تفاصيل القاعة إلى الحافظة!",

  "Featured Labs": "المعامل المميزة",
  "Explore our most popular and in-demand rentable lab spaces for individuals and companies.":
    "اكتشف أشهر معاملنا وقاعاتنا المتاحة للإيجار للأفراد والشركات.",

  "Our Story": "قصتنا",
  "Founded in 1998, Elite Training Center has been at the forefront of professional development, helping individuals and organizations achieve their full potential through innovative training solutions.":
    "تأسس مركز النخبة للتدريب عام 1998، وهو في طليعة مراكز التطوير المهني، ويساعد الأفراد والمؤسسات على تحقيق كامل إمكاناتهم من خلال حلول تدريبية مبتكرة.",
  "We believe that continuous learning is the key to success in today's rapidly evolving business landscape. Our mission is to provide world-class training that combines theoretical knowledge with practical application, ensuring our graduates are ready to tackle real-world challenges.":
    "نؤمن بأن التعلّم المستمر هو مفتاح النجاح في بيئة الأعمال سريعة التطور اليوم. ورسالتنا تقديم تدريب عالمي المستوى يجمع بين المعرفة النظرية والتطبيق العملي، لنضمن أن خريجينا مستعدون لمواجهة تحديات الواقع.",
  "With a team of distinguished instructors, including former government ministers and industry leaders, we offer unparalleled expertise across various domains.":
    "بفريق من المدربين المتميزين، من بينهم وزراء حكوميون سابقون وقادة في القطاع، نقدّم خبرة لا مثيل لها في مجالات متعددة.",
  "Our Mission": "هدفنا",
  "To empower professionals with cutting-edge skills and knowledge that drive innovation and success in their careers and organizations.":
    "تمكين المهنيين بمهارات ومعارف متقدمة تدفع الابتكار والنجاح في مسيرتهم المهنية ومؤسساتهم.",
  "Our Vision": "رؤيتنا",
  "To be the leading training institution that transforms careers and drives organizational excellence across the region.":
    "أن نكون المؤسسة التدريبية الرائدة التي تغيّر المسارات المهنية وتدفع التميز المؤسسي في أنحاء المنطقة.",
  "Our Values": "قيمنا",
  "Excellence, integrity, innovation, and commitment to continuous improvement in everything we do.":
    "التميز والنزاهة والابتكار والالتزام بالتحسين المستمر في كل ما نقوم به.",

  "Welcome Back": "مرحبًا بعودتك",
  "Sign in to your account": "سجّل الدخول إلى حسابك",
  Password: "كلمة المرور",
  "Remember me": "تذكّرني",
  "Sign In": "تسجيل الدخول",
  "Don't have an account?": "ليس لديك حساب؟",
  "Sign up here": "سجّل من هنا",
  "Create Account": "إنشاء حساب",
  "Join thousands of professionals": "انضم إلى آلاف المهنيين",
  "First Name": "الاسم الأول",
  "Last Name": "اسم العائلة",
  "Confirm Password": "تأكيد كلمة المرور",
  "I agree to the": "أوافق على",
  "Terms of Service": "شروط الخدمة",
  and: "و",
  "Privacy Policy": "سياسة الخصوصية",
  "Already have an account?": "لديك حساب بالفعل؟",
  "Sign in here": "سجّل الدخول من هنا",

  "Master the skills needed to lead teams effectively and drive organizational success in today's dynamic business environment.":
    "أتقن المهارات المطلوبة لقيادة الفرق بفعالية ودفع نجاح المؤسسة في بيئة الأعمال الديناميكية اليوم.",
  "Transform data into actionable insights using the latest tools and techniques in data science and business intelligence.":
    "حوّل البيانات إلى رؤى قابلة للتنفيذ باستخدام أحدث الأدوات والتقنيات في علوم البيانات وذكاء الأعمال.",
  "Learn cutting-edge digital marketing strategies including SEO, social media, and content marketing for maximum impact.":
    "تعلّم استراتيجيات التسويق الرقمي المتطورة بما في ذلك تحسين محركات البحث ووسائل التواصل الاجتماعي والتسويق بالمحتوى لتحقيق أقصى أثر.",
  "Expert Instructors": "مدربون متخصصون",
  "Modern Facilities": "مرافق حديثة",
  "Certified Programs": "برامج معتمدة",
  "Why Choose Elite Training Center?": "لماذا تختار مركز النخبة للتدريب؟",
  "Learn from industry leaders, including former ministers and top executives.":
    "تعلّم من قادة الصناعة، بما في ذلك وزراء سابقون وكبار التنفيذيين.",
  "State-of-the-art labs and conference rooms equipped with latest technology.":
    "معامل وقاعات مؤتمرات متطورة مجهزة بأحدث التقنيات.",
  "Receive industry-recognized certifications upon course completion.":
    "احصل على شهادات معترف بها في الصناعة عند إتمام الدورة.",

  "Booking Information": "معلومات الحجز",
  "Phone Number": "رقم الهاتف",
  "Company/Organization": "الشركة / المؤسسة",
  "Selected Room/Lab": "القاعة / المعمل المختار",
  "Booking Date": "تاريخ الحجز",
  "Start Time": "وقت البدء",
  "Duration (hours)": "المدة (بالساعات)",
  "Select duration": "اختر المدة",
  "1 hour": "ساعة واحدة",
  "2 hours": "ساعتان",
  "4 hours": "4 ساعات",
  "8 hours (full day)": "8 ساعات (يوم كامل)",
  "Purpose of Event": "الغرض من الفعالية",
  "Select purpose": "اختر الغرض",
  Conference: "مؤتمر",
  Workshop: "ورشة عمل",
  "Training Session": "جلسة تدريبية",
  Meeting: "اجتماع",
  Seminar: "ندوة",
  Other: "أخرى",
  "Expected Number of Attendees": "العدد المتوقع للحضور",
  "Special Requests (Optional)": "طلبات خاصة (اختياري)",
  "Any special equipment or setup requirements":
    "أي معدات أو تجهيزات خاصة مطلوبة",
  "Submit Booking Request": "إرسال طلب الحجز",

  "Enrollment Information": "معلومات التسجيل",
  "Are you from inside or outside the AOI?": "هل أنت من داخل AOI أم من خارجها؟",
  "Inside AOI": "داخل AOI",
  "Outside AOI": "خارج AOI",
  "Selected Course": "الدورة المختارة",
  "ID Number": "رقم الهوية",
  "File Number": "رقم الملف",
  "Work Section": "قسم العمل",
  "Select your section": "اختر قسمك",
  "Human Resources": "الموارد البشرية",
  "Information Technology": "تقنية المعلومات",
  Finance: "المالية",
  Marketing: "التسويق",
  Operations: "العمليات",
  Sales: "المبيعات",
  "College/University": "الكلية / الجامعة",
  "Enter your college or university": "أدخل اسم كليتك أو جامعتك",
  "Field of Study/Direction": "مجال الدراسة / الاتجاه",
  "Enter your field of study or professional direction":
    "أدخل مجال دراستك أو اتجاهك المهني",
  "Additional Notes (Optional)": "ملاحظات إضافية (اختياري)",
  "Any additional information or special requirements":
    "أي معلومات إضافية أو متطلبات خاصة",
  "Submit Enrollment": "إرسال التسجيل",

  "Available Rooms": "القاعات المتاحة",
  "Click any room to view details": "اضغط على أي قاعة لعرض التفاصيل",

  "What you'll learn": "ماذا ستتعلم",
  "Course curriculum": "المنهج الدراسي",
  "Who it's for": "لمن هذه الدورة",
  Requirements: "المتطلبات",
  "Your instructor": "مدربك",
  "One-time fee": "رسوم لمرة واحدة",
  Duration: "المدة",
  Level: "المستوى",
  Format: "النمط",
  Schedule: "الجدول",
  Start: "البدء",
  Certificate: "الشهادة",
  "Have a question?": "هل لديك سؤال؟",
  "You may also like": "قد يعجبك أيضًا",
  "Course not found": "الدورة غير موجودة",
  "The course you're looking for doesn't exist or was removed.":
    "الدورة التي تبحث عنها غير موجودة أو تمت إزالتها.",
  "Browse all courses": "تصفح جميع الدورات",
  "Browse Courses": "تصفح الدورات",

  "Submitted Successfully": "تم الإرسال بنجاح",
  "Enrollment submitted!": "تم إرسال التسجيل!",
  "Booking request received!": "تم استلام طلب الحجز!",
  "Nothing submitted yet": "لم يتم إرسال أي طلب بعد",
  "There's no recent request to show. Browse our courses or rooms to get started.":
    "لا يوجد طلب حديث لعرضه. تصفح دوراتنا أو قاعاتنا للبدء.",
  "Return Home": "العودة للرئيسية",
  "Browse more rooms": "تصفح المزيد من القاعات",
  "More rooms": "المزيد من القاعات",
  "More courses": "المزيد من الدورات",
  "Browse more courses": "تصفح المزيد من الدورات",
  Course: "الدورة",
  "Room / Lab": "القاعة / المعمل",
  "Requested date": "التاريخ المطلوب",
  "Confirmation sent to": "تم إرسال التأكيد إلى",
  "What happens next": "ماذا بعد؟",
  "Thank you,": "شكرًا لك،",
  "A confirmation email has been sent to": "تم إرسال رسالة تأكيد إلى",
  "Check your inbox for the confirmation (and your spam folder, just in case).":
    "تحقق من بريدك الوارد بحثًا عن رسالة التأكيد (وتفقّد مجلد البريد غير المرغوب فيه أيضًا).",
  "Our team will contact you soon with your enrollment details and next steps.":
    "سيتواصل معك فريقنا قريبًا بتفاصيل تسجيلك والخطوات التالية.",
  "Our team will contact you soon to confirm availability and details.":
    "سيتواصل معك فريقنا قريبًا لتأكيد التوفر والتفاصيل.",

  "More Videos": "المزيد من الفيديوهات",
  All: "الكل",
  Announcements: "إعلانات",
  "Success Stories": "قصص نجاح",
  Partnerships: "شراكات",
  Events: "فعاليات",
  Academics: "أكاديمي",
  Community: "المجتمع",
  "Show articles in this category": "عرض مقالات هذه الفئة",
  "Filter by category": "تصفية حسب الفئة",
  "Search videos": "ابحث في الفيديوهات",
  "Clear search": "مسح البحث",
  "No videos match your search.": "لا توجد فيديوهات مطابقة لبحثك.",

  "Computer Lab": "معمل حاسوب",
  "Training Hall": "قاعة تدريب",

  Leadership: "القيادة",
  Management: "الإدارة",
  "Data & Technology": "البيانات والتقنية",
  Communication: "التواصل",
  Beginner: "مبتدئ",
  Intermediate: "متوسط",
  Advanced: "متقدم",
  "All levels": "جميع المستويات",
  "Beginner to Intermediate": "من مبتدئ إلى متوسط",
  "In-person": "حضوري",
  "Online live": "مباشر عبر الإنترنت",
  Hybrid: "مدمج",
  "Sun & Tue, 6:00 – 9:00 PM": "الأحد والثلاثاء، 6:00 – 9:00 مساءً",
  "Mon & Wed, 5:30 – 8:30 PM": "الاثنين والأربعاء، 5:30 – 8:30 مساءً",
  "Sat, 10:00 AM – 4:00 PM": "السبت، 10:00 صباحًا – 4:00 مساءً",
  "Thu, 5:00 – 9:00 PM": "الخميس، 5:00 – 9:00 مساءً",
  "Tue & Thu, 7:00 – 9:00 PM": "الثلاثاء والخميس، 7:00 – 9:00 مساءً",
  "Wed, 6:00 – 10:00 PM": "الأربعاء، 6:00 – 10:00 مساءً",
  "first Sunday of the month": "أول أحد من الشهر",
  "first Monday of the month": "أول اثنين من الشهر",
  "second Saturday of the month": "ثاني سبت من الشهر",
  "first Thursday of the month": "أول خميس من الشهر",
  "first Tuesday of the month": "أول ثلاثاء من الشهر",
  "second Wednesday of the month": "ثاني أربعاء من الشهر",
  "first week of the month": "الأسبوع الأول من الشهر",
  "AOI Certificate of Completion": "شهادة إتمام من AOI",
  "PMP exam preparation certificate": "شهادة التحضير لاختبار PMP",
  "AOI Data Analytics Certificate": "شهادة AOI في تحليل البيانات",
  "AOI Financial Modeling Certificate": "شهادة AOI في النمذجة المالية",
  "AOI Digital Marketing Certificate": "شهادة AOI في التسويق الرقمي",

  "Working professionals": "المهنيون العاملون",
  "Recent graduates": "الخريجون الجدد",
  "Team leaders and managers": "قادة الفرق والمديرون",
  "No prior experience required": "لا تتطلب خبرة سابقة",
  "Laptop recommended for exercises": "يُنصح بحاسوب محمول للتمارين",
  "Apply proven techniques to real workplace cases":
    "طبّق تقنيات مجرَّبة على حالات حقيقية في بيئة العمل",
  "Use the tools and templates professionals rely on":
    "استخدم الأدوات والقوالب التي يعتمد عليها المحترفون",
  "Finish with a project you can show to employers":
    "أنهِ الدورة بمشروع يمكنك عرضه على أصحاب العمل",
  Foundations: "الأساسيات",
  "Core techniques": "التقنيات الأساسية",
  "Tools and workflow": "الأدوات وسير العمل",
  "Applied practice": "التطبيق العملي",
  "Capstone project": "المشروع الختامي",
  "Key concepts and terminology": "المفاهيم والمصطلحات الأساسية",
  "Guided exercise with feedback": "تمرين موجَّه مع تغذية راجعة",
};

const shared = {

  "Skip to content": "تخطَّ إلى المحتوى",
  "Main menu": "القائمة الرئيسية",
  "Toggle navigation": "تبديل قائمة التنقل",
  "© 2025 AOI Academy. All rights reserved.":
    "© 2025 أكاديمية AOI. جميع الحقوق محفوظة.",
  "Message sent!": "تم إرسال الرسالة!",
  "Our team will reply to your message soon.":
    "سيرد عليك فريقنا على رسالتك قريبًا.",
  Subject: "الموضوع",
  "AOI Academy | Professional Training, Labs & Rooms":
    "أكاديمية AOI | تدريب مهني ومعامل وقاعات",
  "Our Instructors": "مدربونا",
  "Course Details": "تفاصيل الدورة",
  "Room Details": "تفاصيل القاعة",
  "Request Received": "تم استلام الطلب",
  "My Profile": "ملفي الشخصي",
  "Show more": "عرض المزيد",
  "Back to top": "العودة إلى الأعلى",
  "Your account": "حسابك",
  "Signed in as": "تم تسجيل الدخول باسم",
  "You are not signed in": "لم تسجّل الدخول",
  "Sign in to manage your account.": "سجّل الدخول لإدارة حسابك.",
  "Recommended for you": "مقترحة لك",
  "Course not found": "الدورة غير موجودة",
  "Watching now": "يشاهد الآن",
  "Our team will contact you soon to reply to your message.":
    "سيتواصل معك فريقنا قريبًا للرد على رسالتك.",
  Contact: "تواصل معنا",
  About: "من نحن",
  "Rooms & Labs": "القاعات والمعامل",
  News: "الأخبار",
  Videos: "الفيديوهات",
  Profile: "الملف الشخصي",
  Logout: "تسجيل الخروج",
  Graduates: "خريج",
  "Years Experience": "سنة خبرة",
  "Featured Courses": "الدورات المميزة",
  "Discover our most popular and in-demand training programs":
    "اكتشف أشهر وأهم برامجنا التدريبية",
  "Empowering professionals with world-class training and development programs for over 25 years.":
    "تمكين المحترفين ببرامج تدريب وتطوير عالمية المستوى منذ أكثر من 25 عامًا.",
  "Quick Links": "روابط سريعة",
  Services: "الخدمات",
  "Contact Info": "معلومات التواصل",
  "Professional Training": "التدريب المهني",
  "Room Rental": "تأجير القاعات",
  "Certification Programs": "برامج الشهادات",
  "All rights reserved.": "جميع الحقوق محفوظة.",
};

const banners = {
  "AOI Academy": "أكاديمية AOI",
  "Empowering professionals for over 25 years":
    "تمكين المحترفين لأكثر من 25 عامًا",
  "Room Booking": "حجز القاعات",
  "Reserve your preferred room or lab": "احجز القاعة أو المعمل الذي تفضله",
  "Course Enrollment": "التسجيل في الدورة",
  "Fill out the form to enroll in your selected course":
    "املأ النموذج للتسجيل في الدورة التي اخترتها",
  "Our Courses": "دوراتنا",
  "Comprehensive training programs designed for your success":
    "برامج تدريبية شاملة مصممة لنجاحك",
  "Our Expert Instructors": "مدربونا الخبراء",
  "Learn from distinguished professionals and industry leaders":
    "تعلّم من نخبة المحترفين وقادة الصناعة",
  "Latest News": "آخر الأخبار",
  "Stay updated with our latest announcements and achievements":
    "ابقَ على اطلاع بأحدث إعلاناتنا وإنجازاتنا",
  "User Profile": "الملف الشخصي",
  "Manage your account and track your progress": "أدِر حسابك وتابع تقدمك",
  "Conference Rooms": "قاعات المؤتمرات",
  "Premium spaces for your meetings and events":
    "مساحات مميزة لاجتماعاتك وفعالياتك",
  "Rooms & Labs": "القاعات والمعامل",
  "Modern facilities for conferences, workshops, and events":
    "مرافق حديثة للمؤتمرات وورش العمل والفعاليات",
  "Training Videos": "فيديوهات تدريبية",
  "Watch highlights from our courses and events":
    "شاهد أبرز لحظات دوراتنا وفعالياتنا",
};

const contact = {
  "Contact Us": "تواصل معنا",
  "Get in touch with our team": "تواصل مع فريقنا",
  "Send us a Message": "أرسل لنا رسالة",
  "First Name": "الاسم الأول",
  "Last Name": "اسم العائلة",
  Email: "البريد الإلكتروني",
  Phone: "الهاتف",
  Subject: "الموضوع",
  "Select a subject": "اختر الموضوع",
  "Course Inquiry": "استفسار عن دورة",
  "Room Booking": "حجز قاعة",
  "General Question": "سؤال عام",
  "Technical Support": "الدعم الفني",
  Message: "الرسالة",
  "Send Message": "إرسال الرسالة",
  "Get in Touch": "معلومات التواصل",
  Address: "العنوان",
  "123 Training Street": "123 شارع التدريب",
  "Business District": "المنطقة التجارية",
  "Cairo, Egypt": "القاهرة، مصر",
  "Office Hours": "ساعات العمل",
  "Monday - Friday: 9:00 AM - 6:00 PM":
    "من الاثنين إلى الجمعة: 9:00 ص - 6:00 م",
  "Saturday: 9:00 AM - 2:00 PM": "السبت: 9:00 ص - 2:00 م",
  "Sunday: Closed": "الأحد: مغلق",
};

dictionary.addMap(shared);
dictionary.addMap(banners);
dictionary.addMap(contact);
dictionary.addMap(ui);
