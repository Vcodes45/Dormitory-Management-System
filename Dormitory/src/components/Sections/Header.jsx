// import React from 'react';

// const Header = ({ setActiveSection }) => (
//     <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
//         <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
//             <a href="#" onClick={() => setActiveSection('home')} className="text-2xl font-bold text-blue-600">DormLife</a>
//             <div className="hidden md:flex space-x-8 items-center">
//                 {['home', 'rooms', 'gallery', 'location', 'contact'].map(section => (
//                     <a key={section} href={`#${section}`} onClick={(e) => { e.preventDefault(); setActiveSection(section); }} className="text-gray-600 hover:text-blue-600 capitalize transition duration-300">{section}</a>
//                 ))}
//             </div>
//             <a href="#contact" onClick={(e) => { e.preventDefault(); setActiveSection('contact'); }} className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
//                 Book Now
//             </a>
//             <button className="md:hidden">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                 </svg>
//             </button>
//         </nav>
//     </header>
// );

// export default Header;







import React from 'react';

const NAV_SECTIONS = [
    { key: 'home', label: 'Home' },
    { key: 'rooms', label: 'Rooms' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'location', label: 'Location' },
    { key: 'contact', label: 'Contact' },
];

const Header = ({ setActiveSection, activeSection }) => (
    <header className="bg-gradient-to-r from-blue-50 via-white to-blue-100/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a
                href="#home"
                onClick={e => { e.preventDefault(); setActiveSection('home'); }}
                className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm hover:scale-105 transition-transform duration-200"
                style={{ letterSpacing: '1px' }}
            >
                DormLife
            </a>
            <div className="hidden md:flex space-x-2 items-center">
                {NAV_SECTIONS.map(({ key, label }) => (
                    <a
                        key={key}
                        href={`#${key}`}
                        onClick={e => { e.preventDefault(); setActiveSection(key); }}
                        className={`relative px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200
                            ${activeSection === key
                                ? 'bg-blue-100 text-blue-700 shadow font-semibold'
                                : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'}
                            group
                        `}
                    >
                        <span className="z-10 relative">{label}</span>
                        {/* Animated underline on hover */}
                        <span className="absolute left-3 right-3 -bottom-1 h-0.5 bg-blue-400 rounded transition-all duration-300 scale-x-0 group-hover:scale-x-100" style={{ transformOrigin: 'left' }} />
                    </a>
                ))}
            </div>
            <a
                href="#contact"
                onClick={e => { e.preventDefault(); setActiveSection('contact'); }}
                className="hidden md:block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-200"
            >
                Book Now
            </a>
            <button className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </nav>
    </header>
);

export default Header;

