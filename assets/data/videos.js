import { dictionary } from '../js/core/i18n.js';
import { videosAr } from '../i18n/videos.ar.js';

export const videosData = [
  {
    id: "2JvLvJygHwU",
    title: "Data Analytics Fundamentals",
    description: "Learn the core principles of data analytics and how to transform raw data into actionable business insights. Perfect for beginners looking to start their data science journey.",
    duration: "15:30",
    category: "Analytics Course",
  },
  {
    id: "kBdfcR-8hEY",
    title: "Leadership Masterclass with Dr. Sarah Johnson",
    description: "Watch excerpts from our popular leadership masterclass featuring former Education Minister Dr. Sarah Johnson as she shares insights on effective leadership in the modern workplace.",
    duration: "22:15",
    category: "Dr. Sarah Johnson",
  },
  {
    id: "072P_2o8vzQ",
    title: "Digital Marketing Trends 2025",
    description: "Stay ahead of the curve with the latest digital marketing trends and strategies. Learn about social media marketing, content creation, and customer engagement techniques.",
    duration: "12:45",
    category: "Marketing Series",
  },
  {
    id: "IxRVa1DbSAg",
    title: "Project Management Best Practices",
    description: "Master the art of project management with proven methodologies and tools. Learn about agile practices, team coordination, and successful project delivery.",
    duration: "18:20",
    category: "PM Essentials",
  },
  {
    id: "HQGCJiNCvec",
    title: "Communication Skills Workshop",
    description: "Enhance your communication skills with practical techniques for presentations, meetings, and interpersonal interactions. Build confidence and clarity in your professional communications.",
    duration: "24:10",
    category: "Soft Skills Series",
  },
];

videosData.forEach((video) => {
  video.ar = videosAr[video.id];
  if (video.ar) dictionary.addObject(video, video.ar);
});
