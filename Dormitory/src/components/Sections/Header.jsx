import React from 'react';

const NAV_SECTIONS = [
    { key: 'home', label: 'Home' },
    { key: 'rooms', label: 'Rooms' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'location', label: 'Location' },
    { key: 'contact', label: 'Contact' },
];


const Header = ({ setActiveSection, activeSection, darkMode, setDarkMode, user, onShowAuth, onLogout }) => (
    <header 
        className="backdrop-blur-xl shadow-xl sticky top-0 z-50 transition-all duration-300 border-b"
        style={{
            background: darkMode 
                ? `rgba(26, 26, 46, 0.8)` 
                : `rgba(255, 255, 255, 0.25)`,
            borderColor: darkMode 
                ? 'rgba(79, 172, 254, 0.3)' 
                : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: darkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
                : '0 8px 32px rgba(102, 126, 234, 0.2)'
        }}
    >
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <a
                href="#home"
                onClick={e => { e.preventDefault(); setActiveSection('home'); }}
                className={
                    'text-2xl font-extrabold tracking-tight drop-shadow-sm hover:scale-105 transition-transform duration-200' +
                    (darkMode ? ' text-teal-300' : ' text-emerald-700')
                }
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
                                ? (darkMode ? 'bg-[#303030] text-teal-200 shadow font-semibold' : 'bg-emerald-100 text-emerald-700 shadow font-semibold')
                                : (darkMode ? 'text-teal-100 hover:text-teal-300 hover:bg-[#303030]' : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50')}
                            group
                        `}
                    >
                        <span className="z-10 relative">{label}</span>
                        {/* Animated underline on hover */}
                        <span className={`absolute left-3 right-3 -bottom-1 h-0.5 rounded transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${darkMode ? 'bg-teal-400' : 'bg-emerald-500'}`} style={{ transformOrigin: 'left' }} />
                    </a>
                ))}
            </div>
            
            {/* Authentication Section */}
            <div className="hidden md:flex items-center space-x-3">
                {user ? (
                    <>
                        <span className={`text-sm font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>
                            Welcome, {user.username}!
                        </span>
                        <button
                            onClick={onLogout}
                            className={
                                'px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ' +
                                (darkMode
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-red-500 text-white hover:bg-red-600')
                            }
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => onShowAuth(true)}
                            className={
                                'px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ' +
                                (darkMode
                                    ? 'text-teal-200 hover:text-teal-300 border border-teal-400 hover:bg-[#303030]'
                                    : 'text-emerald-700 hover:text-emerald-800 border border-emerald-300 hover:bg-emerald-50')
                            }
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => onShowAuth(false)}
                            className={
                                'px-4 py-2 rounded-full font-medium text-sm shadow hover:scale-105 transition-all duration-200 ' +
                                (darkMode
                                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                                    : 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:from-emerald-600 hover:to-emerald-600')
                            }
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Authentication Buttons */}
            <div className="md:hidden flex items-center space-x-2">
                {user ? (
                    <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>
                            {user.username}
                        </span>
                        <button
                            onClick={onLogout}
                            className={
                                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ' +
                                (darkMode
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-red-500 text-white hover:bg-red-600')
                            }
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onShowAuth(true)}
                        className={
                            'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ' +
                            (darkMode
                                ? 'bg-teal-600 text-white hover:bg-teal-700'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600')
                        }
                    >
                        Login
                    </button>
                )}
            </div>
            
            {/* Dark mode toggle button */}
            <button
                onClick={() => setDarkMode(dm => !dm)}
                className={
                    'ml-2 p-2 rounded-full border transition-colors duration-200 ' +
                    (darkMode ? 'bg-[#303030] border-teal-400 text-teal-200 hover:bg-[#222]' : 'bg-white border-emerald-200 text-emerald-500 hover:bg-emerald-50')
                }
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                    </svg>
                )}
            </button>
        </nav>
    </header>
);

export default Header;

