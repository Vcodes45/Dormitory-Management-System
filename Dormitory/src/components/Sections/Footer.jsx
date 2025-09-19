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
                            {/* Replace with a proper SVG icon for Facebook */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M..."></path></svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                             {/* Replace with a proper SVG icon for Twitter */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M..."></path></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                             {/* Replace with a proper SVG icon for Instagram */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M..."></path></svg>
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