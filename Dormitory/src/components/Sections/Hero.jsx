import React from 'react';


const Hero = ({ setActiveSection, darkMode }) => (
    <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ minHeight: '100vh' }}
    >
        {/* Dormitory Background Image */}
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{
                backgroundImage: "url('/BG.jpg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
            }}
        />
        
        {/* Floating Dormitory Elements */}
        <div className="absolute inset-0 overflow-hidden z-5">
            {/* Building Icons */}
            <div className="floating-element float-1 top-20 left-10 text-6xl">🏢</div>
            <div className="floating-element float-2 top-40 right-20 text-4xl">🏠</div>
            <div className="floating-element float-3 bottom-32 left-20 text-5xl">🛏️</div>
            <div className="floating-element float-1 bottom-20 right-10 text-3xl">📚</div>
            <div className="floating-element float-2 top-32 right-1/3 text-4xl">🎓</div>
            <div className="floating-element float-3 bottom-40 right-1/4 text-3xl">☕</div>
            <div className="floating-element float-1 top-1/2 left-5 text-5xl">🏨</div>
            <div className="floating-element float-2 top-60 left-1/3 text-3xl">💡</div>
        </div>

        {/* Beautiful Glass Overlay */}
        <div 
            className="absolute inset-0 w-full h-full z-10"
            style={{
                background: darkMode 
                    ? `linear-gradient(135deg, 
                        rgba(26, 26, 46, 0.7) 0%, 
                        rgba(22, 33, 62, 0.8) 50%, 
                        rgba(15, 52, 96, 0.7) 100%)`
                    : `linear-gradient(135deg, 
                        rgba(102, 126, 234, 0.3) 0%, 
                        rgba(118, 75, 162, 0.4) 25%, 
                        rgba(240, 147, 251, 0.3) 50%, 
                        rgba(245, 87, 108, 0.4) 75%, 
                        rgba(79, 172, 254, 0.3) 100%)`,
                backdropFilter: 'blur(2px)',
            }}
        />
        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-20">
            <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight ${darkMode ? 'text-white drop-shadow-2xl' : 'text-white drop-shadow-2xl'}`}
                style={{ 
                    textShadow: darkMode 
                        ? '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(79,172,254,0.5)' 
                        : '2px 2px 4px rgba(0,0,0,0.6), 0 0 20px rgba(102,126,234,0.4)'
                }}>
                Your Perfect Student Home Awaits
            </h1>
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-100' : 'text-gray-100'}`}
               style={{ 
                   textShadow: '1px 1px 3px rgba(0,0,0,0.7)' 
               }}>
                Discover a safe, comfortable, and vibrant community. Fully-furnished rooms with all-inclusive amenities designed for student life.
            </p>
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

