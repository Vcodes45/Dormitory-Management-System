import React from 'react';

const Header = ({ setActiveSection }) => (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="#" onClick={() => setActiveSection('home')} className="text-2xl font-bold text-blue-600">DormLife</a>
            <div className="hidden md:flex space-x-8 items-center">
                {['home', 'rooms', 'gallery', 'location', 'contact'].map(section => (
                    <a key={section} href={`#${section}`} onClick={(e) => { e.preventDefault(); setActiveSection(section); }} className="text-gray-600 hover:text-blue-600 capitalize transition duration-300">{section}</a>
                ))}
            </div>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setActiveSection('contact'); }} className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
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