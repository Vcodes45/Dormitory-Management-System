export const initialRooms = [
    {
        id: 1,
        name: 'Cozy Twin Sharing',
        type: '2-Bed',
        price: 8500,
        availability: 3,
        description: 'A comfortable shared room with two beds, perfect for students looking for a balance of privacy and community.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk'],
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
        ]
    },
    {
        id: 2,
        name: 'Private Single Room',
        type: '1-Bed',
        price: 12000,
        availability: 1,
        description: 'A simple private room for focused study. Basic amenities with good ventilation and natural light.',
        amenities: ['wifi', 'fan', 'laundry', 'study-desk'],
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
        ]
    },
    {
        id: 3,
        name: 'Budget Quad Room',
        type: '4-Bed',
        price: 5500,
        availability: 5,
        description: 'Economical option for students. Shared space with bunk beds, ideal for making friends and saving money.',
        amenities: ['wifi', 'fan', 'laundry'],
        images: [
<<<<<<< HEAD
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop'
=======
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
        ]
    },
    {
        id: 4,
        name: 'Triple Sharing Room',
        type: '3-Bed',
        price: 6500,
        availability: 2,
        description: 'Great for small groups of friends. Affordable accommodation with basic facilities and good community feel.',
        amenities: ['wifi', 'fan', 'laundry', 'study-desk'],
        images: [
<<<<<<< HEAD
            'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&auto=format&fit=crop'
=======
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
        ]
    },
    {
        id: 5,
        name: 'AC Single Room',
        type: 'Single AC',
        price: 9500,
        availability: 1,
        description: 'Single room with air conditioning for comfortable stay during hot weather. Includes basic furniture and study area.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk', 'almirah'],
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'Economy Bed Space',
        type: 'Bed Only',
        price: 4500,
        availability: 4,
        description: 'Most affordable option - just a bed in shared dormitory style room. Perfect for budget-conscious students.',
        amenities: ['wifi', 'fan', 'shared-bathroom'],
        images: [
<<<<<<< HEAD
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'
=======
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
        ]
    },
];

export const galleryImages = {
    'Rooms': [
        'https://ak.jogurucdn.com/media/image/p15/media_gallery-2017-01-25-11-Jugaad_Delhi_d2151745da4a320eeb2f32b3bd047b2c.jpg', // Real Indian hostel room
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60', // Basic hostel room
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60', // Simple bed
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=60', // Plain room
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60', // Minimal setup
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=60', // Basic furniture
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60', // Simple room
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=60'  // Budget room
    ],
    'Common Areas': [
        'https://ak.jogurucdn.com/media/image/p15/media_gallery-2017-01-25-11-Jugaad_Delhi_d2151745da4a320eeb2f32b3bd047b2c.jpg', // Indian hostel common area
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60', // Simple corridor
        'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&auto=format&fit=crop&q=60', // Basic study area
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60', // Hallway
        'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&auto=format&fit=crop&q=60', // Common room
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60'  // Stairs
    ],
    'Dining': [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60', // Basic mess
        'https://images.unsplash.com/photo-1567521464027-f32849384330?w=600&auto=format&fit=crop&q=60', // Simple dining
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60', // Cafeteria
        'https://images.unsplash.com/photo-1567521464027-f32849384330?w=600&auto=format&fit=crop&q=60', // Eating area
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60', // Food hall
        'https://images.unsplash.com/photo-1567521464027-f32849384330?w=600&auto=format&fit=crop&q=60'  // Dining room
    ],
    'Facilities': [
        'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=60', // Basic laundry
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60', // Simple gym
        'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=60', // Washing area
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60', // Exercise room
        'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=60', // Utility room
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60'  // Basic facilities
    ]
};

export const testimonials = [
    { name: 'Priya Sharma', course: 'Engineering Student', review: 'Living here has been amazing! The facilities are top-notch, the rooms are clean, and the management is super responsive. It feels like a home away from home.', rating: 5 },
    { name: 'Rohan Gupta', course: 'Medical Student', review: 'The location is perfect, close to my college and local transport. The study hall is quiet and the Wi-Fi is reliable, which is crucial for my studies.', rating: 4 },
    { name: 'Ananya Reddy', course: 'Arts Student', review: 'I love the community events they organize. It was so easy to make new friends. The rooms are comfortable and have everything you need.', rating: 5 },
];

export const faqs = [
    { q: 'What is the booking process?', a: 'You can book a room by filling out the inquiry form on our website. Our team will contact you within 24 hours to confirm availability and guide you through the next steps, including document submission and payment.' },
    { q: 'Are meals included in the rent?', a: 'We offer flexible meal plans. You can opt for a plan that includes breakfast, lunch, and dinner at our cafeteria, or you can choose to pay as you go. The mess menu changes weekly.' },
    { q: 'What are the gate timings?', a: 'The main gate is open 24/7 for residents. However, for security purposes, we have a curfew of 11:00 PM for entry, after which residents need to sign in at the security desk.' },
    { q: 'Is there a laundry service?', a: 'Yes, we have a fully equipped laundry room with washing machines and dryers available for all residents. You can purchase laundry cards from the reception.' },
    { q: 'Can I have guests over?', a: 'Yes, you can have guests in the common areas during visiting hours (9 AM to 9 PM). Overnight guests are allowed with prior permission from the management and may incur a nominal fee.' },
];

