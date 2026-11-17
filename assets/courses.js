// Single source of truth for course data (used by index, courses and course_details pages).
// NOTE: level, format, schedule, outcomes, curriculum etc. are sample content - replace with real details.
const coursesData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Advanced Leadership Training",
        category: "Leadership",
        instructor: "Dr. Sarah Johnson",
        instructorRole: "Leadership & Organizational Development Expert",
        description: "Develop essential leadership skills including strategic thinking, team management, and organizational development. Perfect for managers and executives.",
        duration: "12 Weeks",
        hours: 48,
        level: "Intermediate",
        format: "In-person",
        schedule: "Sun & Tue, 6:00 – 9:00 PM",
        startDate: "Next intake: first Sunday of the month",
        price: 1200,
        certificate: "AOI Certificate of Completion",
        outcomes: [
            "Build and communicate a clear strategic vision",
            "Lead, motivate and develop high-performing teams",
            "Manage change and navigate organizational conflict",
            "Make confident, data-informed decisions under pressure"
        ],
        audience: ["Team leads and managers", "Newly promoted supervisors", "Executives building leadership depth"],
        requirements: ["2+ years of professional experience", "No prior leadership training required"],
        curriculum: [
            { title: "Leadership Foundations", topics: ["Leadership styles", "Self-awareness and emotional intelligence"] },
            { title: "Strategic Thinking", topics: ["Vision and goal setting", "Strategic planning frameworks"] },
            { title: "Managing Teams", topics: ["Delegation and accountability", "Coaching and feedback"] },
            { title: "Leading Change", topics: ["Change management models", "Overcoming resistance"] },
            { title: "Capstone Project", topics: ["Leadership action plan", "Final presentation"] }
        ]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Project Management Professional",
        category: "Management",
        instructor: "Prof. Michael Chen",
        instructorRole: "PMP-Certified Project Director",
        description: "Comprehensive PMP certification preparation covering project lifecycle, methodologies, risk management, and stakeholder communication.",
        duration: "14 Weeks",
        hours: 56,
        level: "Intermediate",
        format: "Hybrid",
        schedule: "Mon & Wed, 5:30 – 8:30 PM",
        startDate: "Next intake: first Monday of the month",
        price: 1300,
        certificate: "PMP exam preparation certificate",
        outcomes: [
            "Plan and run projects across the full lifecycle",
            "Apply predictive, agile and hybrid methodologies",
            "Identify, assess and respond to project risks",
            "Be ready to sit the PMP certification exam"
        ],
        audience: ["Aspiring and practicing project managers", "Engineers and IT professionals", "Team leads managing deliverables"],
        requirements: ["Basic project experience recommended", "Laptop for practice exams"],
        curriculum: [
            { title: "Project Fundamentals", topics: ["Lifecycle and process groups", "Project charter"] },
            { title: "Planning & Scheduling", topics: ["Scope and WBS", "Schedule and cost baselines"] },
            { title: "Risk & Quality", topics: ["Risk registers", "Quality management"] },
            { title: "Agile & Hybrid Delivery", topics: ["Scrum and Kanban", "Choosing an approach"] },
            { title: "Exam Preparation", topics: ["Mock exams", "Question strategy"] }
        ]
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Data Analytics & Visualization",
        category: "Data & Technology",
        instructor: "Dr. Emily Rodriguez",
        instructorRole: "Senior Data Scientist",
        description: "Master data analysis techniques, statistical methods, and visualization tools including Python, R, and Tableau for data-driven decision making.",
        duration: "16 Weeks",
        hours: 64,
        level: "Beginner to Intermediate",
        format: "In-person",
        schedule: "Sat, 10:00 AM – 4:00 PM",
        startDate: "Next intake: second Saturday of the month",
        price: 1500,
        certificate: "AOI Data Analytics Certificate",
        outcomes: [
            "Clean, explore and analyze real-world datasets",
            "Apply core statistical methods with Python and R",
            "Build interactive dashboards in Tableau",
            "Present insights that drive business decisions"
        ],
        audience: ["Analysts and business professionals", "Graduates entering data roles", "Managers who rely on reports"],
        requirements: ["Comfort with spreadsheets", "Own laptop (software setup provided)"],
        curriculum: [
            { title: "Data Foundations", topics: ["Data types and sources", "Spreadsheet to code"] },
            { title: "Python & R for Analysis", topics: ["Data wrangling", "Exploratory analysis"] },
            { title: "Statistics", topics: ["Descriptive statistics", "Hypothesis testing"] },
            { title: "Visualization with Tableau", topics: ["Charts that communicate", "Interactive dashboards"] },
            { title: "Capstone Project", topics: ["End-to-end analysis", "Stakeholder presentation"] }
        ]
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Financial Analysis & Modeling",
        category: "Finance",
        instructor: "Mr. David Thompson",
        instructorRole: "Investment & Corporate Finance Specialist",
        description: "Advanced financial modeling techniques, valuation methods, and investment analysis for finance professionals and analysts.",
        duration: "12 Weeks",
        hours: 48,
        level: "Advanced",
        format: "In-person",
        schedule: "Thu, 5:00 – 9:00 PM",
        startDate: "Next intake: first Thursday of the month",
        price: 1100,
        certificate: "AOI Financial Modeling Certificate",
        outcomes: [
            "Build three-statement financial models from scratch",
            "Value companies using DCF and comparable methods",
            "Run scenario and sensitivity analysis",
            "Assess investments with clear, defensible assumptions"
        ],
        audience: ["Finance and accounting professionals", "Investment and credit analysts", "Business owners and CFO teams"],
        requirements: ["Solid Excel skills", "Understanding of basic accounting"],
        curriculum: [
            { title: "Modeling Best Practices", topics: ["Model structure", "Excel power techniques"] },
            { title: "Three-Statement Models", topics: ["Income statement and balance sheet", "Cash flow linking"] },
            { title: "Valuation", topics: ["Discounted cash flow", "Comparable analysis"] },
            { title: "Scenario Analysis", topics: ["Sensitivity tables", "Risk assessment"] },
            { title: "Case Study", topics: ["Full company model", "Investment memo"] }
        ]
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Digital Marketing Mastery",
        category: "Marketing",
        instructor: "Dr. Lisa Wang",
        instructorRole: "Digital Strategy Consultant",
        description: "Gain expertise in digital marketing strategies including SEO, PPC, social media, and content marketing to drive online engagement and conversions.",
        duration: "10 Weeks",
        hours: 40,
        level: "Beginner",
        format: "Online live",
        schedule: "Tue & Thu, 7:00 – 9:00 PM",
        startDate: "Next intake: first Tuesday of the month",
        price: 1000,
        certificate: "AOI Digital Marketing Certificate",
        outcomes: [
            "Plan a multi-channel digital marketing strategy",
            "Rank content with SEO fundamentals",
            "Launch and optimize paid campaigns (PPC)",
            "Measure results and improve conversions"
        ],
        audience: ["Marketing professionals", "Small business owners", "Career changers entering marketing"],
        requirements: ["No prior experience needed", "Stable internet connection"],
        curriculum: [
            { title: "Digital Strategy", topics: ["Audience and positioning", "Channel planning"] },
            { title: "SEO & Content", topics: ["Keyword research", "Content marketing"] },
            { title: "Paid Advertising", topics: ["Search and social ads", "Budgeting and bidding"] },
            { title: "Social Media", topics: ["Platform playbooks", "Community building"] },
            { title: "Analytics & Conversion", topics: ["Tracking and reporting", "A/B testing"] }
        ]
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Executive Communication Skills",
        category: "Communication",
        instructor: "Prof. James Mitchell",
        instructorRole: "Executive Communication Coach",
        description: "Master public speaking, presentation skills, negotiation techniques, and interpersonal communication for executive success.",
        duration: "8 Weeks",
        hours: 32,
        level: "All levels",
        format: "In-person",
        schedule: "Wed, 6:00 – 10:00 PM",
        startDate: "Next intake: second Wednesday of the month",
        price: 800,
        certificate: "AOI Certificate of Completion",
        outcomes: [
            "Deliver confident, persuasive presentations",
            "Negotiate effectively and reach better agreements",
            "Communicate clearly with senior stakeholders",
            "Handle difficult conversations with composure"
        ],
        audience: ["Managers and executives", "Professionals who present often", "Anyone building speaking confidence"],
        requirements: ["No prerequisites", "Willingness to practice in class"],
        curriculum: [
            { title: "Communication Foundations", topics: ["Audience analysis", "Message structure"] },
            { title: "Public Speaking", topics: ["Voice and presence", "Overcoming anxiety"] },
            { title: "Presentation Design", topics: ["Storytelling", "Visual clarity"] },
            { title: "Negotiation", topics: ["Preparation and strategy", "Closing agreements"] },
            { title: "Practice Lab", topics: ["Recorded presentations", "Peer and coach feedback"] }
        ]
    }
];

function getCourseById(id) {
    return coursesData.find(c => c.id === Number(id));
}
