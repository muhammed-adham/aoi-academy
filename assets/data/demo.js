import { config } from '../js/core/config.js';
import { dictionary } from '../js/core/i18n.js';

const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w || 1200}&q=80`;

const photoIds = [
    "1516321318423-f06f85e504b3", "1454165804606-c3d57bc86b40", "1560472354-b33ff0c44a43",
    "1563986768609-322da13575f3", "1551288049-bebda4e38f71", "1516321497487-e288fb19713f",
    "1522202176988-66273c2fd55f", "1517048676732-d65bc937f952", "1553877522-43269d4ea984",
    "1559136555-9303baea8ebd", "1540575467063-178a50c2df87", "1504711434969-e33886168f5c"
];
const photo = (i, w) => unsplash(photoIds[i % photoIds.length], w);

export function addDemoCourses(coursesData) {
  if (!config.demoData || coursesData.some((course) => course.demo)) return;
  const teachers = [
      ["Dr. Sarah Johnson", "Leadership & Organizational Development Expert"],
      ["Prof. Michael Chen", "PMP-Certified Project Director"],
      ["Dr. Emily Rodriguez", "Senior Data Scientist"],
      ["Mr. David Thompson", "Investment & Corporate Finance Specialist"],
      ["Dr. Lisa Wang", "Digital Strategy Consultant"],
      ["Prof. James Mitchell", "Executive Communication Coach"]
  ];
  const levels = ["Beginner", "Intermediate", "Advanced", "All levels"];
  const formats = ["In-person", "Online live", "Hybrid"];
  const schedules = ["Sun & Tue, 6:00 – 9:00 PM", "Mon & Wed, 5:30 – 8:30 PM", "Sat, 10:00 AM – 4:00 PM", "Thu, 5:00 – 9:00 PM"];

  const seeds = [
      ["Cybersecurity Essentials", "Data & Technology", "Protect systems and data: threats, defences, incident response and security awareness for teams.", "أساسيات الأمن السيبراني", "احمِ الأنظمة والبيانات: التهديدات وسبل الدفاع والاستجابة للحوادث والتوعية الأمنية للفرق."],
      ["Cloud Computing with Azure", "Data & Technology", "Design, deploy and manage cloud services with hands-on Azure labs and certification guidance.", "الحوسبة السحابية مع Azure", "صمّم الخدمات السحابية ونفّذها وأدرها عبر معامل عملية على Azure وإرشاد للحصول على الشهادة."],
      ["Human Resource Management", "Management", "Recruitment, performance, compensation and employee relations for modern HR professionals.", "إدارة الموارد البشرية", "الاستقطاب والأداء والتعويضات وعلاقات الموظفين لمتخصصي الموارد البشرية العصريين."],
      ["Business Analysis Fundamentals", "Management", "Elicit requirements, model processes and turn business needs into clear, testable solutions.", "أساسيات تحليل الأعمال", "استخلص المتطلبات وارسم العمليات وحوّل احتياجات العمل إلى حلول واضحة قابلة للاختبار."],
      ["Strategic Planning & Execution", "Leadership", "Translate strategy into measurable goals, roadmaps and results across the organisation.", "التخطيط الاستراتيجي والتنفيذ", "حوّل الاستراتيجية إلى أهداف قابلة للقياس وخرائط طريق ونتائج في جميع أنحاء المؤسسة."],
      ["Supply Chain & Logistics", "Management", "Optimise sourcing, inventory, transport and distribution to cut cost and lead time.", "سلاسل الإمداد والخدمات اللوجستية", "حسّن التوريد والمخزون والنقل والتوزيع لخفض التكلفة وزمن التسليم."],
      ["UX/UI Design Principles", "Data & Technology", "Research, wireframe and prototype digital products people find simple and enjoyable.", "مبادئ تصميم تجربة المستخدم وواجهته", "ابحث وصمّم الهياكل والنماذج الأولية لمنتجات رقمية يجدها الناس بسيطة وممتعة."],
      ["Python for Professionals", "Data & Technology", "Automate everyday work and analyse data with practical Python, from scripts to reports.", "بايثون للمحترفين", "أتمتة العمل اليومي وتحليل البيانات ببايثون عملية، من النصوص البرمجية إلى التقارير."],
      ["Accounting for Non-Accountants", "Finance", "Read financial statements, budgets and ratios with confidence, whatever your background.", "المحاسبة لغير المحاسبين", "اقرأ القوائم المالية والميزانيات والنسب بثقة، أيًّا كانت خلفيتك."],
      ["Customer Experience Excellence", "Marketing", "Map customer journeys, measure satisfaction and build service that keeps people coming back.", "التميز في تجربة العملاء", "ارسم رحلات العملاء وقِس الرضا وابنِ خدمة تجعل الناس يعودون إليك."],
      ["Agile & Scrum Master", "Management", "Run Scrum teams, facilitate ceremonies and deliver value in short, predictable cycles.", "الرشاقة وإدارة سكرم", "أدِر فرق سكرم ويسّر الاجتماعات وقدّم القيمة في دورات قصيرة يمكن التنبؤ بها."],
      ["Entrepreneurship & Startups", "Leadership", "Validate an idea, build a lean business model and pitch to investors.", "ريادة الأعمال والشركات الناشئة", "تحقق من فكرتك وابنِ نموذج عمل رشيقًا وقدّم عرضك للمستثمرين."],
      ["Negotiation & Conflict Resolution", "Communication", "Prepare, bargain and resolve disagreements to reach agreements that last.", "التفاوض وحل النزاعات", "استعد وفاوض وحلّ الخلافات للوصول إلى اتفاقات تدوم."],
      ["Public Relations & Media", "Communication", "Shape your story, handle the press and manage reputation in a digital media world.", "العلاقات العامة والإعلام", "صُغ قصتك وتعامل مع الصحافة وأدِر السمعة في عالم إعلامي رقمي."],
      ["Risk Management", "Finance", "Identify, assess and respond to operational and financial risks with proven frameworks.", "إدارة المخاطر", "حدّد المخاطر التشغيلية والمالية وقيّمها واستجب لها بأطر مجرَّبة."],
      ["Excel Advanced Analytics", "Data & Technology", "Power Query, pivot models, dashboards and formulas that save hours every week.", "التحليلات المتقدمة في Excel", "Power Query والنماذج المحورية ولوحات المعلومات والصيغ التي توفر ساعات كل أسبوع."],
      ["Corporate Governance & Compliance", "Leadership", "Boards, policies, audit and regulation: build an organisation that does things right.", "حوكمة الشركات والامتثال", "مجالس الإدارة والسياسات والتدقيق واللوائح: ابنِ مؤسسة تفعل الأمور على الوجه الصحيح."],
      ["Advanced Enterprise Resource Planning Systems Implementation and Change Management", "Management", "A very long title on purpose, to check how cards, headings and the details page handle wrapping.", "تنفيذ أنظمة تخطيط موارد المؤسسات المتقدمة وإدارة التغيير", "عنوان طويل عن قصد، لاختبار كيفية تعامل البطاقات والعناوين وصفحة التفاصيل مع التفاف النص."]
  ];

  seeds.forEach(([title, category, description, arTitle, arDescription], i) => {
      const t = teachers[i % teachers.length];
      const weeks = 6 + ((i * 3) % 11);
      coursesData.push({
          id: coursesData.length + 1,
          demo: true,
          image: photo(i + 3),
          title,
          category,
          instructor: t[0],
          instructorRole: t[1],
          description,
          duration: weeks + " Weeks",
          hours: weeks * 4,
          level: levels[i % levels.length],
          format: formats[i % formats.length],
          schedule: schedules[i % schedules.length],
          startDate: "Next intake: first week of the month",
          price: 700 + ((i * 130) % 900),
          certificate: "AOI Certificate of Completion",
          outcomes: [
              `Explain the core ideas behind ${title.toLowerCase()}`,
              "Apply proven techniques to real workplace cases",
              "Use the tools and templates professionals rely on",
              "Finish with a project you can show to employers"
          ],
          audience: ["Working professionals", "Recent graduates", "Team leaders and managers"],
          requirements: ["No prior experience required", "Laptop recommended for exercises"],
          curriculum: ["Foundations", "Core techniques", "Tools and workflow", "Applied practice", "Capstone project"]
              .map((m) => ({ title: m, topics: ["Key concepts and terminology", "Guided exercise with feedback"] })),

          ar: { title: arTitle, description: arDescription }
      });
      dictionary.addObject(coursesData[coursesData.length - 1], coursesData[coursesData.length - 1].ar);
  });

  dictionary.add("Next intake: first week of the month", "الدفعة القادمة: الأسبوع الأول من الشهر");
}

export function addDemoNews(newsData, newsAr) {
  if (!config.demoData || newsData.some((article) => article.demo)) return;

  const topics = [
      ["Open Day: Meet Our Instructors and Tour the Labs", "Visit the campus, meet the faculty and try a free mini-session in our labs.", "يوم مفتوح: تعرّف على مدربينا وجُل في معاملنا", "زر الحرم الجامعي وقابل أعضاء هيئة التدريس وجرّب جلسة قصيرة مجانية في معاملنا."],
      ["Scholarships Announced for 100 Outstanding Students", "A new scholarship fund will cover tuition for 100 high-achieving applicants this year.", "الإعلان عن منح دراسية لـ 100 طالب متفوق", "سيغطي صندوق منح جديد الرسوم الدراسية لـ 100 متقدم متفوق هذا العام."],
      ["New Cybersecurity Lab Opens Its Doors", "Our latest lab gives students a safe environment to practise defending real-world systems.", "افتتاح معمل جديد للأمن السيبراني", "يتيح معملنا الأحدث للطلاب بيئة آمنة للتدرب على الدفاع عن أنظمة واقعية."],
      ["Winter Intake Now Open for Registration", "Choose from over twenty programs starting next month, with early-bird pricing until the end of the week.", "فتح باب التسجيل في دفعة الشتاء", "اختر من بين أكثر من عشرين برنامجًا تبدأ الشهر القادم، بأسعار التسجيل المبكر حتى نهاية الأسبوع."],
      ["AOI Students Win the Regional Hackathon", "A team of four students took first place after 24 hours of building, testing and pitching.", "طلاب AOI يفوزون بهاكاثون المنطقة", "حصل فريق من أربعة طلاب على المركز الأول بعد 24 ساعة من البناء والاختبار والعرض."],
      ["Workshop Series: Presenting with Confidence", "Four evening workshops to sharpen your presentation skills, open to students and alumni.", "سلسلة ورش: التقديم بثقة", "أربع ورش مسائية لصقل مهارات العرض التقديمي، مفتوحة للطلاب والخريجين."],
      ["Partnership with the Chamber of Commerce", "A new agreement connects our graduates with internships and mentors across local businesses.", "شراكة مع الغرفة التجارية", "اتفاقية جديدة تربط خريجينا بفرص تدريب وموجهين في الشركات المحلية."],
      ["Women in Tech Networking Evening", "An evening of talks and networking with leaders from some of the region's top technology companies.", "أمسية التواصل للمرأة في التكنولوجيا", "أمسية من المحاضرات والتواصل مع قيادات من كبرى شركات التكنولوجيا في المنطقة."],
      ["Library and Study Spaces Extended Hours", "Study spaces are now open until midnight on weekdays during the exam period.", "تمديد ساعات المكتبة وأماكن الدراسة", "تفتح أماكن الدراسة الآن حتى منتصف الليل في أيام الأسبوع خلال فترة الامتحانات."],
      ["Faculty Spotlight: Dr. Emily Rodriguez on Data Careers", "Our data science lead shares how newcomers can break into analytics in twelve months.", "تحت الضوء: د. إميلي رودريغيز عن المسارات المهنية في البيانات", "تشارك رئيسة علوم البيانات لدينا كيف يمكن للوافدين الجدد دخول مجال التحليلات خلال اثني عشر شهرًا."],
      ["New Online Learning Platform Launched", "Recorded lessons, quizzes and progress tracking are now available for every course.", "إطلاق منصة التعلم الإلكتروني الجديدة", "الدروس المسجلة والاختبارات القصيرة وتتبع التقدم متاحة الآن لكل دورة."],
      ["Graduation Ceremony Dates Confirmed", "Mark your calendar: ceremonies will be held over two days in the main training hall.", "تأكيد مواعيد حفل التخرج", "سجّلوا في تقويمكم: ستُقام الحفلات على مدى يومين في قاعة التدريب الرئيسية."],
      ["Industry Panel: The Future of Finance", "Bankers, analysts and fintech founders discuss where the sector is heading next.", "جلسة حوارية: مستقبل القطاع المالي", "يناقش مصرفيون ومحللون ومؤسسو شركات تقنية مالية إلى أين يتجه القطاع."],
      ["Short Courses for Busy Professionals", "Weekend and evening formats make it easier to learn new skills alongside a full-time job.", "دورات قصيرة للمهنيين المشغولين", "صيغ نهاية الأسبوع والمساء تسهّل تعلم مهارات جديدة إلى جانب وظيفة بدوام كامل."],
      ["Alumni Mentorship Program Expands", "Over 200 alumni have signed up to mentor current students, double last year's number.", "توسيع برنامج الإرشاد للخريجين", "سجّل أكثر من 200 خريج للإرشاد، ضعف عدد العام الماضي."],
      ["Campus Sustainability Initiative Begins", "From recycling points to energy-saving lights, students are leading a greener campus.", "انطلاق مبادرة الاستدامة في الحرم الجامعي", "من نقاط إعادة التدوير إلى مصابيح توفير الطاقة، يقود الطلاب حرمًا جامعيًا أكثر اخضرارًا."],
      ["Language Lab Upgraded with New Equipment", "Modern headsets and speech-practice software help students improve faster.", "تحديث معمل اللغات بمعدات جديدة", "سماعات حديثة وبرامج للتدرب على النطق تساعد الطلاب على التقدم بشكل أسرع."],
      ["A Very Long News Headline That Goes On and On to Test How the Layout Wraps When an Editor Writes a Full Sentence Instead of a Short Title", "This item exists to check long titles, long excerpts and how the meta row behaves when there is a lot of text, which sometimes happens on real news pages when headlines are copied from press releases.", "عنوان خبر طويل جدًا يستمر ويتواصل لاختبار كيف يلتف التخطيط عندما يكتب المحرر جملة كاملة بدل عنوان قصير", "هذا العنصر موجود لاختبار العناوين الطويلة والمقتطفات الطويلة وسلوك صف البيانات عندما يكون هناك الكثير من النص، وهو ما يحدث أحيانًا في صفحات الأخبار الحقيقية عند نسخ العناوين من البيانات الصحفية."]
  ];

  const newsCategories = ["Events", "Announcements", "Academics", "Announcements", "Success Stories", "Events", "Partnerships",
      "Community", "Academics", "Academics", "Announcements", "Events", "Events", "Academics", "Community", "Community",
      "Academics", "Announcements"];
  const authors = [
      ["Academic Team", "الفريق الأكاديمي"], ["Marketing Team", "فريق التسويق"], ["Events Team", "فريق الفعاليات"],
      ["Partnership Team", "فريق الشراكات"], ["Alumni Relations", "علاقات الخريجين"], ["Student Affairs", "شؤون الطلاب"]
  ];
  const body = (title, extra) => `
              <p>${title}. This is sample content added by the demo data so the page can be tested with a full list of articles.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              ${extra ? "<p>• First highlight of the announcement<br>• A second point worth knowing<br>• Where to find more information</p>" : ""}
              <p>For questions, please contact the academy office during working hours.</p>
          `;
  const bodyAr = (title, extra) => `
              <p>${title}. هذا محتوى تجريبي أضافته البيانات التجريبية ليمكن اختبار الصفحة بقائمة كاملة من المقالات.</p>
              <p>لوريم إيبسوم هو نص تجريبي يُستخدم في صناعة الطباعة والتنضيد، وقد استُخدم كنص قياسي للنماذج منذ القرن الخامس عشر.</p>
              ${extra ? "<p>• النقطة الأولى في الإعلان<br>• نقطة ثانية تستحق المعرفة<br>• أين تجد مزيدًا من المعلومات</p>" : ""}
              <p>للاستفسارات، يُرجى التواصل مع مكتب الأكاديمية خلال ساعات العمل.</p>
          `;
  const caps = ["Behind the scenes", "On the day", "Our community", "Highlights", "Student work", "The venue"];
  const capsAr = ["خلف الكواليس", "في ذلك اليوم", "مجتمعنا", "أبرز اللحظات", "أعمال الطلاب", "المكان"];

  topics.forEach(([title, excerpt, arTitle, arExcerpt], i) => {

      const photoCount = [0, 1, 3, 0, 2, 6, 1, 4, 0, 5][i % 10];
      const id = newsData.length + 1;
      const d = new Date(2025, 0, 12 - i * 2);
      const extra = i % 2 === 0;
      newsData.push({
          id,
          demo: true,
          category: newsCategories[i],
          image: i % 5 === 3 ? "" : photo(i),
          imageAlt: title,
          title,
          excerpt,
          content: body(title, extra),
          author: authors[i % authors.length][0],
          date: d.toISOString().slice(0, 10),
          readingTime: (2 + (i % 6)) + " min read",
          views: String(((i * 937) % 4000) + 120).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          images: Array.from({ length: photoCount }, (_, k) => ({
              src: photo(i + k + 1),
              alt: `${title} – photo ${k + 1}`,
              caption: caps[(i + k) % caps.length]
          }))
      });

      if (newsAr) {
          newsAr[id] = {
              title: arTitle,
              excerpt: arExcerpt,
              content: bodyAr(arTitle, extra),
              author: authors[i % authors.length][1],
              images: Array.from({ length: photoCount }, (_, k) => ({
                  alt: `${arTitle} – صورة ${k + 1}`,
                  caption: capsAr[(i + k) % capsAr.length]
              }))
          };
      }
  });
}

export function addDemoVideos(videosData) {
  if (!config.demoData || videosData.some((video) => video.demo)) return;

  const ids = [
      "dQw4w9WgXcQ", "9bZkp7q19f0", "kJQP7kiw5Fk", "JGwWNGJdvx8", "fJ9rUzIMcZQ", "CevxZvSJLk8", "YQHsXMglC9A",
      "60ItHLz5WEA", "OPf0YbXqDm0", "09R8_2nJtjg", "hT_nvWreIhg", "RgKAFK5djSk", "lp-EO5I60KA", "e-ORhEE9VVg",
      "2vjPBrBU-TM", "nfWlot6h_JM", "ZbZSe6N_BXs", "uelHwf8o7_U", "YykjpeuMNEk", "0KSOMA3QBU0"
  ];
  const titles = [
      ["Welcome to AOI Academy: Campus Tour", "مرحبًا بكم في أكاديمية AOI: جولة في الحرم"],
      ["Introduction to Cloud Computing", "مقدمة في الحوسبة السحابية"],
      ["How to Build a Winning Resume", "كيف تبني سيرة ذاتية ناجحة"],
      ["Cybersecurity Basics for Everyone", "أساسيات الأمن السيبراني للجميع"],
      ["Excel Tips Every Analyst Should Know", "نصائح Excel التي يجب أن يعرفها كل محلل"],
      ["Public Speaking in Five Steps", "الخطابة في خمس خطوات"],
      ["Agile vs Waterfall: Choosing a Method", "الرشيق مقابل الشلالي: اختيار المنهجية"],
      ["Financial Statements Made Simple", "القوائم المالية ببساطة"],
      ["Student Stories: First Job After Graduation", "قصص الطلاب: الوظيفة الأولى بعد التخرج"],
      ["Leading Remote Teams Effectively", "قيادة الفرق عن بُعد بفعالية"],
      ["Design Thinking Workshop Highlights", "أبرز لحظات ورشة التفكير التصميمي"],
      ["Data Visualization Masterclass", "ماستر كلاس العرض المرئي للبيانات"],
      ["Negotiation Skills in Practice", "مهارات التفاوض عمليًا"],
      ["Marketing Analytics Walkthrough", "جولة في تحليلات التسويق"],
      ["Time Management for Busy Professionals", "إدارة الوقت للمهنيين المشغولين"],
      ["Panel: The Future of Work in Egypt", "جلسة حوارية: مستقبل العمل في مصر"],
      ["Python for Beginners: Your First Script", "بايثون للمبتدئين: أول نص برمجي لك"],
      ["Customer Service That Stands Out", "خدمة عملاء تتميز عن غيرها"],
      ["Project Risk Management Explained", "إدارة مخاطر المشاريع مشروحة"],
      ["A Very Long Video Title That Keeps Going to Check How Two Lines of Text Are Clamped in the List", "عنوان فيديو طويل جدًا يستمر لاختبار كيفية اقتطاع النص في سطرين داخل القائمة"]
  ];
  const cats = [
      ["Campus Life", "الحياة الجامعية"], ["Cloud Series", "سلسلة الحوسبة السحابية"], ["Career", "المسار المهني"], ["Security", "الأمن"],
      ["Excel Series", "سلسلة Excel"], ["Soft Skills", "المهارات الشخصية"], ["PM Essentials", "أساسيات إدارة المشاريع"], ["Finance", "المالية"]
  ];
  const description = ["Sample video added by the demo data to test the videos list with many items. Replace it with a real recording.",
      "فيديو تجريبي أضافته البيانات التجريبية لاختبار قائمة الفيديوهات بعدد كبير من العناصر. استبدله بتسجيل حقيقي."];
  ids.forEach((id, i) => {
      const mins = 6 + ((i * 7) % 40), secs = (i * 13) % 60;
      const cat = cats[i % cats.length];
      videosData.push({
          id,
          demo: true,
          title: titles[i][0],
          description: description[0],
          duration: `${mins}:${String(secs).padStart(2, "0")}`,
          category: cat[0],
          ar: { title: titles[i][1], description: description[1], category: cat[1] }
      });
      dictionary.addObject(videosData[videosData.length - 1], videosData[videosData.length - 1].ar);
  });
}

export function addDemoRooms(rooms) {
  if (!config.demoData || rooms.some((room) => room.demo)) return;
  const pool = rooms.slice(0, 4).flatMap((r) => [r.image].concat(r.images || []));
  const pic = (i) => pool[i % pool.length];

  const seeds = [
      ["Boardroom Suite", "Conference", 16, 120, ["Video Wall", "Private Entrance", "Catering Ready", "Soundproof"], "Intimate boardroom for leadership meetings, interviews and confidential discussions.",
          "جناح غرفة الاجتماعات", ["جدار فيديو", "مدخل خاص", "جاهز للضيافة", "عازل للصوت"], "غرفة اجتماعات مصغّرة لاجتماعات القيادة والمقابلات والنقاشات السرية."],
      ["Innovation Lab", "Computer Lab", 24, 140, ["3D Printers", "Whiteboards", "Fast Internet", "Prototyping Tools"], "Open lab for hackathons, prototyping and project sprints with flexible workstations.",
          "معمل الابتكار", ["طابعات ثلاثية الأبعاد", "سبورات", "إنترنت سريع", "أدوات النماذج الأولية"], "معمل مفتوح للهاكاثونات وبناء النماذج الأولية وسباقات المشاريع بمحطات عمل مرنة."],
      ["Auditorium A", "Training Hall", 250, 600, ["Stage Lighting", "Live Streaming", "Translation Booths", "Tiered Seating"], "Large auditorium for conferences, graduations and public events, with full production support.",
          "القاعة الكبرى أ", ["إضاءة المسرح", "بث مباشر", "كبائن ترجمة", "مقاعد متدرجة"], "قاعة كبيرة للمؤتمرات وحفلات التخرج والفعاليات العامة مع دعم إنتاجي كامل."],
      ["Seminar Room 1", "Workshop", 30, 90, ["Projector", "Whiteboard", "Natural Light", "Wi-Fi"], "Bright seminar room set up classroom-style for lectures and training sessions.",
          "قاعة الندوات 1", ["جهاز عرض", "سبورة", "إضاءة طبيعية", "واي فاي"], "قاعة ندوات مشرقة بتجهيز صفّي للمحاضرات والجلسات التدريبية."],
      ["Seminar Room 2", "Workshop", 30, 90, ["Projector", "Whiteboard", "Air Conditioning", "Wi-Fi"], "A twin of Seminar Room 1, ideal for running parallel sessions side by side.",
          "قاعة الندوات 2", ["جهاز عرض", "سبورة", "تكييف", "واي فاي"], "نسخة مماثلة لقاعة الندوات 1، مثالية لإقامة جلسات متوازية جنبًا إلى جنب."],
      ["Networking Lounge", "Conference", 60, 160, ["Lounge Seating", "Coffee Bar", "Presentation Screen", "Open Layout"], "Relaxed space for receptions, alumni evenings and informal networking.",
          "صالة التواصل", ["جلسات صالة", "ركن القهوة", "شاشة عرض", "تصميم مفتوح"], "مساحة مريحة للاستقبالات وأمسيات الخريجين والتواصل غير الرسمي."],
      ["Podcast Studio", "Workshop", 6, 80, ["Pro Microphones", "Acoustic Panels", "Mixing Desk", "Recording Support"], "Small recording studio with professional audio equipment and an engineer on request.",
          "استوديو البودكاست", ["ميكروفونات احترافية", "ألواح عزل صوتي", "طاولة مزج", "دعم التسجيل"], "استوديو تسجيل صغير بمعدات صوتية احترافية ومهندس صوت عند الطلب."],
      ["Language Lab", "Computer Lab", 20, 110, ["Headsets", "Speech Software", "Instructor Console", "Quiet Booths"], "Booth-style lab for pronunciation practice and language assessments.",
          "معمل اللغات", ["سماعات رأس", "برامج النطق", "وحدة تحكم المدرب", "كبائن هادئة"], "معمل بنظام الكبائن للتدرب على النطق واختبارات اللغة."],
      ["Cybersecurity Lab", "Computer Lab", 28, 170, ["Isolated Network", "Virtual Machines", "Attack Simulators", "Monitoring Screens"], "Segregated network environment for ethical-hacking courses and capture-the-flag events.",
          "معمل الأمن السيبراني", ["شبكة معزولة", "أجهزة افتراضية", "محاكيات الهجمات", "شاشات المراقبة"], "بيئة شبكة معزولة لدورات الاختراق الأخلاقي وفعاليات التقاط العلم."],
      ["Design Studio", "Workshop", 22, 100, ["Drawing Tables", "Large Monitors", "Material Library", "Gallery Wall"], "Creative studio with large tables and screens for design and architecture classes.",
          "استوديو التصميم", ["طاولات رسم", "شاشات كبيرة", "مكتبة مواد", "جدار معرض"], "استوديو إبداعي بطاولات وشاشات كبيرة لدروس التصميم والعمارة."],
      ["Exam Hall", "Training Hall", 120, 220, ["Spaced Desks", "CCTV", "Silent Environment", "Invigilator Support"], "Spacious hall prepared for supervised exams and certification tests.",
          "قاعة الامتحانات", ["مكاتب متباعدة", "كاميرات مراقبة", "بيئة هادئة", "دعم المراقبين"], "قاعة فسيحة مجهزة للامتحانات تحت الإشراف واختبارات الشهادات."],
      ["Executive Training Centre and Conference Facility with Extended Services", "Conference", 80, 350, ["Concierge", "Valet Parking", "Interpretation", "Full-Day Catering"], "A deliberately long room name to check how titles wrap on cards and in the side list.",
          "مركز التدريب التنفيذي ومرفق المؤتمرات بالخدمات الموسعة", ["خدمة الاستقبال", "ركن السيارات", "الترجمة الفورية", "ضيافة طوال اليوم"], "اسم قاعة طويل عن قصد لاختبار كيفية التفاف العناوين على البطاقات وفي القائمة الجانبية."]
  ];
  seeds.forEach(([title, category, capacity, price, features, description, arTitle, arFeatures, arDescription], i) => {
      const room = {
          id: rooms.length + 1,
          demo: true,
          image: pic(i),
          images: [pic(i + 1), pic(i + 2), pic(i + 3)].slice(0, 1 + (i % 3)),
          title,
          description,
          capacity,
          price,
          category,
          features,
          ar: { title: arTitle, features: arFeatures, description: arDescription }
      };
      rooms.push(room);
      dictionary.addObject(room, room.ar);
  });
}
