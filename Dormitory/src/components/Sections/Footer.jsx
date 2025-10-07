import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold">DormLife</h3>
                    <p className="text-gray-400 mt-2">Your ideal home for your student journey. Comfort, community, and convenience.</p>
                </div>
                <div>
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="#rooms" className="text-gray-400 hover:text-white">Rooms</a></li>
                        <li><a href="#gallery" className="text-gray-400 hover:text-white">Gallery</a></li>
                        <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold">Contact Us</h4>
                    <ul className="mt-4 space-y-3 text-gray-400">
                        <li className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                            123 University Lane, Student City, ST 45678
                        </li>
                        <li className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 mt-1" />
                            +1 (234) 567-890
                        </li>
                        <li className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 mt-1" />
                            contact@dormlife.com
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold">Follow Us</h4>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                            {/* Facebook SVG icon */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                             {/* Twitter SVG icon */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                             {/* Instagram SVG icon */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.743 13.777 3.743 12.521s.455-2.374 1.383-3.172c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.798 1.383 1.917 1.383 3.172s-.455 2.374-1.383 3.17c-.875.808-2.026 1.297-3.323 1.297zm7.138 0c-1.297 0-2.448-.49-3.323-1.297-.928-.796-1.383-1.916-1.383-3.17s.455-2.374 1.383-3.172c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.798 1.383 1.917 1.383 3.172s-.455 2.374-1.383 3.17c-.875.808-2.026 1.297-3.323 1.297z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
                © {new Date().getFullYear()} DormLife. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;