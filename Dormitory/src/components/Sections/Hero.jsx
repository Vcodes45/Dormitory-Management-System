import React from 'react';

const Hero = ({ setActiveSection }) => (
    <section id="home" className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                Your Perfect Student Home Awaits
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover a safe, comfortable, and vibrant community. Fully-furnished rooms with all-inclusive amenities designed for student life.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
                <a href="#rooms" onClick={(e) => { e.preventDefault(); setActiveSection('rooms'); }} className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Explore Rooms
                </a>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); setActiveSection('gallery'); }} className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-50 transition-transform transform hover:scale-105">
                    View Gallery
                </a>
            </div>
        </div>
    </section>
);

export default Hero;