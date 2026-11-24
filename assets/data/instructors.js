import { dictionary } from '../js/core/i18n.js';
import { instructorsAr } from '../i18n/instructors.ar.js';

export const instructors = [
  {
    image: "https://images.unsplash.com/photo-1720805752653-10ddccea4c94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dr. Sarah Johnson",
    title: "Former Minister of Education | Leadership Expert",
    bio: "With over 30 years in public service and education policy, Dr. Johnson brings unparalleled expertise in leadership development and organizational transformation.",
  },
  {
    image: "https://images.unsplash.com/photo-1649899111001-f585ce5ec178?q=80&w=745&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Prof. Michael Chen",
    title: "Former Finance Minister | Investment Strategist",
    bio: "A renowned economist and former Finance Minister, Prof. Chen specializes in financial modeling, investment analysis, and economic policy development.",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1741378216141-ed12ecac9fa0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dr. Emily Rodriguez",
    title: "Tech Industry Veteran | Data Science Expert",
    bio: "Former CTO of major tech companies, Dr. Rodriguez leads our data analytics and digital transformation programs with cutting-edge industry insights.",
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    name: "Mr. David Thompson",
    title: "Former Trade Minister | International Business",
    bio: "With extensive experience in international trade and diplomacy, Mr. Thompson brings global perspective to our business strategy and negotiation courses.",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    name: "Dr. Lisa Wang",
    title: "Marketing Director | Digital Strategy Expert",
    bio: "A digital marketing pioneer with 20+ years of experience, Dr. Wang has led marketing transformations for Fortune 500 companies and startups alike.",
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    name: "Prof. James Mitchell",
    title: "Project Management Institute Fellow",
    bio: "",
  },
];

instructors.forEach((person, i) => {
  person.ar = instructorsAr[i];
  dictionary.addObject(person, person.ar);
});
