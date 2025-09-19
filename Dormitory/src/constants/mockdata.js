// export const initialRooms = [
//     {
//         id: 1,
//         name: 'Cozy Twin Sharing',
//         type: '2-Bed',
//         price: 8500,
//         availability: 3,
//         description: 'A comfortable shared room with two beds, perfect for students looking for a balance of privacy and community.',
//         amenities: ['wifi', 'ac', 'laundry', 'study-desk'],
//         images: [
//             'https://placehold.co/600x400/a7c4e5/ffffff?text=Twin+Room+View+1',
//             'https://placehold.co/600x400/a7c4e5/ffffff?text=Twin+Room+View+2',
//             'https://placehold.co/600x400/a7c4e5/ffffff?text=Bathroom'
//         ]
//     },
//     // ... (rest of the initialRooms array)
// ];

// export const galleryImages = {
//     'Common Areas': [
//         'https://placehold.co/600x400/d1d5db/374151?text=Lounge+Area',
//         // ... (rest of the images)
//     ],
//     // ... (rest of the galleryImages object)
// };

// export const testimonials = [
//     { name: 'Priya Sharma', course: 'Engineering Student', review: 'Living here has been amazing! The facilities are top-notch, the rooms are clean, and the management is super responsive. It feels like a home away from home.', rating: 5 },
//     // ... (rest of the testimonials array)
// ];

// export const faqs = [
//     { q: 'What is the booking process?', a: 'You can book a room by filling out the inquiry form on our website. Our team will contact you within 24 hours to confirm availability and guide you through the next steps, including document submission and payment.' },
//     // ... (rest of the faqs array)
// ];





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
            'https://placehold.co/600x400/a7c4e5/ffffff?text=Twin+Room+View+1',
            'https://placehold.co/600x400/a7c4e5/ffffff?text=Twin+Room+View+2',
            'https://placehold.co/600x400/a7c4e5/ffffff?text=Bathroom'
        ]
    },
    {
        id: 2,
        name: 'Private Deluxe Room',
        type: '1-Bed',
        price: 15000,
        availability: 1,
        description: 'Enjoy your own personal space in our private deluxe room, featuring premium amenities and a quiet environment for studying.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk', 'tv', 'mini-fridge'],
        images: [
            'https://placehold.co/600x400/e5a7a7/ffffff?text=Private+Room+View+1',
            'https://placehold.co/600x400/e5a7a7/ffffff?text=Private+Room+View+2'
        ]
    },
    {
        id: 3,
        name: 'Spacious Quad Room',
        type: '4-Bed',
        price: 6000,
        availability: 5,
        description: 'Ideal for those who enjoy a lively atmosphere. Our quad rooms are spacious and foster a strong sense of community.',
        amenities: ['wifi', 'ac', 'laundry'],
        images: [
            'https://placehold.co/600x400/a7e5b2/ffffff?text=Quad+Room+View+1',
            'https://placehold.co/600x400/a7e5b2/ffffff?text=Quad+Room+View+2'
        ]
    },
    {
        id: 4,
        name: 'Triple Occupancy Fun',
        type: '3-Bed',
        price: 7200,
        availability: 2,
        description: 'A great option for small groups of friends. Offers a good mix of social life and personal space.',
        amenities: ['wifi', 'ac', 'laundry', 'study-desk'],
        images: [
            'https://placehold.co/600x400/e5dca7/ffffff?text=Triple+Room+View+1'
        ]
    },
];

export const galleryImages = {
    'Common Areas': [
        'https://placehold.co/600x400/d1d5db/374151?text=Lounge+Area',
        'https://placehold.co/600x400/d1d5db/374151?text=Study+Hall',
        'https://placehold.co/600x400/d1d5db/374151?text=Rooftop+Garden',
        'https://placehold.co/600x400/d1d5db/374151?text=Corridor'
    ],
    'Dining': [
        'https://placehold.co/600x400/fde68a/854d0e?text=Cafeteria',
        'https://placehold.co/600x400/fde68a/854d0e?text=Mess+Hall',
        'https://placehold.co/600x400/fde68a/854d0e?text=Kitchenette'
    ],
    'Facilities': [
        'https://placehold.co/600x400/bfdbfe/1e3a8a?text=Gym',
        'https://placehold.co/600x400/bfdbfe/1e3a8a?text=Laundry+Room',
        'https://placehold.co/600x400/bfdbfe/1e3a8a?text=Game+Room',
        'https://placehold.co/600x400/bfdbfe/1e3a8a?text=Reception'
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

