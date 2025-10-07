import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import AdminLogin from './components/AdminLogin';      
import AdminSignup from './components/AdminSignup';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

// Test component to check if basic React is working
function TestComponent() {
    return (
        <div style={{padding: '20px', fontSize: '24px', color: 'blue'}}>
            <h1>React App is Working!</h1>
            <p>If you can see this, React is rendering correctly.</p>
        </div>
    );
}


// --- 1. MainLayout with modal authentication ---
function MainLayout({ darkMode, setDarkMode, activeSection, setActiveSection }) {
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Check for existing user session on component mount
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('userRole');
        
        if (token && username) {
            setUser({ username, role, token });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        setUser(null);
    };

    const handleShowAuth = () => {
        setShowAuthModal(true);
    };

    return (
        <div 
            className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            style={{
                background: darkMode 
                    ? `linear-gradient(135deg, 
                        #1a1a2e 0%, 
                        #16213e 25%, 
                        #0f3460 50%, 
                        #16213e 75%, 
                        #1a1a2e 100%),
                       radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`
                    : `linear-gradient(135deg, 
                        #667eea 0%, 
                        #764ba2 25%, 
                        #f093fb 50%, 
                        #f5576c 75%, 
                        #4facfe 100%),
                       radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                       url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Crect x='36' y='14' width='6' height='20' rx='3'/%3E%3Crect x='14' y='14' width='6' height='20' rx='3'/%3E%3Crect x='50' y='14' width='6' height='20' rx='3'/%3E%3Crect x='0' y='14' width='6' height='20' rx='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: darkMode ? 'cover, 400px 400px, 600px 600px' : 'cover, 400px 400px, 600px 600px, 60px 60px',
                backgroundPosition: darkMode ? 'center, top left, top right' : 'center, top left, top right, 0 0',
                backgroundAttachment: 'fixed'
            }}
        >
            <Header
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                onShowAuth={handleShowAuth}
                onLogout={handleLogout}
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
            
            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLogin={handleLogin}
            />
        </div>
    );
}

// --- 2. Helper Logic for Admin Authentication ---
const isAdminAuthenticated = () => {
    // Check for the JWT token stored in local storage
    return localStorage.getItem('adminToken') !== null;
};

// Component to protect admin routes
const AdminProtectedRoute = ({ children }) => {
    if (!isAdminAuthenticated()) {
        // Redirect to the admin login page if not authenticated
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};


// --- 3. Main App Component (Routing Logic) ---
export default function App() {
    // Keep your state variables
    const [activeSection, setActiveSection] = useState('home');
    const [darkMode, setDarkMode] = useState(false);

    // Keep your scroll logic
    useEffect(() => {
        const element = document.getElementById(activeSection);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [activeSection]);

    // Simplified routing system - main site is public with modal authentication
    return (
        <Router>
            <Routes>
                {/* Main Website - Always accessible with modal authentication */}
                <Route
                    path="/"
                    element={
                        <MainLayout 
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    }
                />
                
                {/* Public Admin Pages */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />

                {/* Protected Admin Dashboard Route */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminProtectedRoute>
                            <AdminDashboard />
                        </AdminProtectedRoute>
                    }
                />
                
                {/* Catch-all for undefined routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}