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
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 4,
        name: 'Triple Sharing Room',
        type: '3-Bed',
        price: 6500,
        availability: 2,
        description: 'A comfortable three-person room with ample storage space and good natural lighting.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk'],
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 5,
        name: 'Luxury Single Suite',
        type: '1-Bed',
        price: 18000,
        availability: 2,
        description: 'Premium accommodation with attached bathroom, air conditioning, and premium furnishing for ultimate comfort.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk', 'attached-bath'],
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'Deluxe Twin with Balcony',
        type: '2-Bed',
        price: 25000,
        availability: 1,
        description: 'Spacious deluxe room with private balcony, premium furnishing, and excellent view of the campus.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk', 'attached-bath', 'balcony'],
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
        ]
    }
];

export const faqs = [
    {
        id: 1,
        question: "What is included in the room rent?",
        answer: "Room rent includes accommodation, basic utilities (electricity and water up to a limit), Wi-Fi access, housekeeping services, and access to common facilities like gym, study rooms, and recreational areas."
    },
    {
        id: 2,
        question: "Is there a security deposit required?",
        answer: "Yes, we require a refundable security deposit equal to one month's rent. This deposit is refunded upon checkout, subject to room condition assessment and any outstanding dues."
    },
    {
        id: 3,
        question: "Are meals provided?",
        answer: "We have an on-site cafeteria and mess hall that serves nutritious and affordable meals. Meal plans are available as optional add-ons to your accommodation package."
    },
    {
        id: 4,
        question: "What are the visiting hours for guests?",
        answer: "Guests are welcome from 9:00 AM to 9:00 PM on all days. All visitors must register at the reception and provide valid identification for security purposes."
    },
    {
        id: 5,
        question: "Is laundry service available?",
        answer: "Yes, we have both self-service laundry facilities and professional laundry services available. Self-service is included in the rent, while professional services are charged separately."
    },
    {
        id: 6,
        question: "How do I report maintenance issues?",
        answer: "You can report maintenance issues through our 24/7 helpdesk, mobile app, or by contacting the reception. We aim to resolve all issues within 24-48 hours depending on the nature of the problem."
    },
    {
        id: 7,
        question: "Is parking available?",
        answer: "Yes, we provide secure parking facilities for both two-wheelers and four-wheelers. Parking slots are allocated on a first-come, first-served basis with monthly charges applicable."
    },
    {
        id: 8,
        question: "Can I change my room after moving in?",
        answer: "Room changes are possible subject to availability and valid reasons. A room change fee may apply, and the process typically takes 3-5 working days to complete."
    }
];

export const galleryImages = [
    {
        id: 1,
        url: '/cafeteria.jpg',
        alt: 'Modern Cafeteria',
        category: 'dining'
    },
    {
        id: 2,
        url: '/reception.jpg',
        alt: 'Reception Area',
        category: 'common'
    },
    {
        id: 3,
        url: '/studyroom.jpg',
        alt: 'Study Room',
        category: 'academic'
    },
    {
        id: 4,
        url: '/gym.jpg',
        alt: 'Fitness Center',
        category: 'fitness'
    },
    {
        id: 5,
        url: '/laundry.jpg',
        alt: 'Laundry Facility',
        category: 'utilities'
    },
    {
        id: 6,
        url: '/loungearea.webp',
        alt: 'Lounge Area',
        category: 'common'
    },
    {
        id: 7,
        url: '/gameroom.jpg',
        alt: 'Recreation Room',
        category: 'recreation'
    },
    {
        id: 8,
        url: '/corridor.jpg',
        alt: 'Dormitory Corridor',
        category: 'accommodation'
    }
];

export const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Engineering Student',
        rating: 5,
        review: 'Amazing dormitory experience! The facilities are top-notch and the staff is incredibly helpful. The study rooms are perfect for focused learning.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        role: 'MBA Student',
        rating: 5,
        review: 'The location is perfect and the amenities exceeded my expectations. Great WiFi, clean facilities, and a wonderful community atmosphere.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 3,
        name: 'Sneha Patel',
        role: 'Medical Student',
        rating: 4,
        review: 'Very comfortable stay with excellent security. The gym and recreational facilities are great for maintaining work-life balance.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 4,
        name: 'Arjun Singh',
        role: 'Computer Science Student',
        rating: 5,
        review: 'Best decision I made for my college years! The community here is amazing and the facilities make studying so much easier.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
];
