import { dictionary } from '../js/core/i18n.js';
import { roomsAr } from '../i18n/rooms.ar.js';

export const roomsData = [
    {
        id: 1,
        image: "https://plus.unsplash.com/premium_photo-1689701711379-154c21998787?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1689701711362-a574bea1822a?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1678734268616-015d5879b8c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        title: "Executive Conference Room",
        description: "Premium conference room with capacity for 50 people, featuring state-of-the-art AV equipment, video conferencing capabilities, and elegant furnishing perfect for board meetings and executive sessions.",
        capacity: 50,
        price: 200,
        category: "Conference",
        features: ["AV Equipment", "Video Conference", "Elegant Furnishing", "Board Room Setup"]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1667646639495-8865f3ea638b?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1663068630302-c1bfd81f57a6?q=80&w=1117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1663099814676-72cfabfb91f8?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        title: "Advanced Computer Lab",
        description: "Fully equipped computer lab with 30 high-performance workstations, latest software suites, and high-speed internet. Perfect for technical training and software development workshops.",
        capacity: 30,
        price: 150,
        category: "Computer Lab",
        features: ["Latest Software", "High-Speed WiFi", "30 Workstations", "Technical Support"]
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1627884812866-51f842389ee5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1677536849474-2819061389ed?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        title: "Main Training Hall",
        description: "Spacious training hall accommodating up to 100 participants with theater-style seating, professional lighting, sound system, and multiple projection screens for large-scale events.",
        capacity: 100,
        price: 300,
        category: "Training Hall",
        features: ["Theater Seating", "Sound System", "Multiple Screens", "Professional Lighting"]
    },
    {
        id: 4,
        image: "https://plus.unsplash.com/premium_photo-1679547202918-bf37285d3caf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1679547202405-0cd1f7f3efb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1679547202734-95e59a16cac9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        title: "Interactive Workshop Studio",
        description: "Modern workshop space designed for interactive sessions with flexible seating arrangements, whiteboard walls, collaboration tools, and breakout areas for team activities.",
        capacity: 25,
        price: 120,
        category: "Workshop",
        features: ["Flexible Seating", "Collaboration Tools", "Whiteboard Walls", "Breakout Areas"]
    }
];

roomsData.forEach((room) => {
  room.ar = roomsAr[room.id];
  dictionary.addObject(room, room.ar);
});
