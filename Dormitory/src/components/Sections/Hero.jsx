import React from 'react';


const Hero = ({ setActiveSection, darkMode }) => (
    <section
        id="home"
        className={`relative h-screen flex items-center justify-center overflow-hidden ${darkMode ? 'bg-[#303030]' : ''}`}
        style={{ minHeight: '100vh' }}
    >
        {/* Background image */}
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: darkMode ? "url('/BG.jpg')" : "url('/BG.jpg')",
                backgroundColor: darkMode ? '#303030' : 'transparent',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
            }}
        />
        {/* Blur overlay */}
        <div className={`absolute inset-0 w-full h-full z-10 ${darkMode ? 'bg-[#303030]/80' : 'backdrop-blur-xs bg-emerald/30'}`} />
        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-20">
            <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg ${darkMode ? 'text-teal-200' : 'text-emerald-950'}`}>Your Perfect Student Home Awaits</h1>
            <p className={`mt-4 text-lg max-w-2xl mx-auto drop-shadow ${darkMode ? 'text-teal-100' : 'text-emerald-50'}`}>Discover a safe, comfortable, and vibrant community. Fully-furnished rooms with all-inclusive amenities designed for student life.</p>
            <div className="mt-8 flex justify-center space-x-4">
                <a
                    href="#rooms"
                    onClick={(e) => { e.preventDefault(); setActiveSection('rooms'); }}
                    className={`px-8 py-3 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg ${darkMode ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
                >
                    Explore Rooms
                </a>
                <a
                    href="#gallery"
                    onClick={(e) => { e.preventDefault(); setActiveSection('gallery'); }}
                    className={`border px-8 py-3 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 shadow ${darkMode ? 'bg-[#222] text-teal-200 border-teal-400 hover:bg-[#303030]' : 'bg-emerald-50 text-emerald-600 border-emerald-600 hover:bg-gray-50'}`}
                >
                    View Gallery
                </a>
            </div>
        </div>
    </section>
);

export default Hero;

