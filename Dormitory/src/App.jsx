import React, { useState, useEffect } from 'react';

// Import all the section components
import Header from './components/Sections/Header';
import Hero from './components/Sections/Hero';
import RoomListings from './components/Sections/RoomListings';
import Gallery from './components/Sections/Gallery';
import Testimonials from './components/Sections/Testimonials';
import LocationMap from './components/Sections/LocationMap';
import FAQ from './components/Sections/FAQ';
import ContactForm from './components/Sections/ContactForm';
import Footer from './components/Sections/Footer';
import AIChatbot from './components/AIChatbot/AIChatbot';

export default function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [darkMode, setDarkMode] = useState(false);

    // Simple scroll-to-section logic
    useEffect(() => {
        const element = document.getElementById(activeSection);
        if (element) {
            // Using a slight timeout can help if content loads slowly
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [activeSection]);

    return (
        <div className={
            `min-h-screen font-sans transition-colors duration-300 ` +
            (darkMode
                ? 'bg-[#303030] text-white'
                : 'bg-gradient-to-br from-teal-100 via-white to-teal-200 text-gray-900')
        }>
            <Header
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <main>
                <Hero setActiveSection={setActiveSection} darkMode={darkMode} />
                <RoomListings darkMode={darkMode} />
                <Gallery darkMode={darkMode} />
                <Testimonials darkMode={darkMode} />
                <LocationMap darkMode={darkMode} />
                <FAQ darkMode={darkMode} />
                <ContactForm darkMode={darkMode} />
            </main>
            <Footer />
            <AIChatbot />
        </div>
    );
}