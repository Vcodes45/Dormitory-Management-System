import React from 'react';
import { MapPin } from 'lucide-react';

const LocationMap = () => (
    <section id="location" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">Our Location</h2>
                <p className="text-lg text-gray-600 mt-2">Conveniently located in the heart of the student district.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                    <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507886!3d-6.194741395534831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f428942371cf%3A0x26335f6f4d36d8db!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1622037930495!5m2!1sen!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dormitory Location"
                        ></iframe>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800">DormLife Heights</h3>
                    <p className="text-gray-600 mt-2 flex items-start">
                        <MapPin className="h-6 w-6 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                        123 University Lane, Student City, ST 45678
                    </p>
                    <div className="mt-6 border-t pt-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Nearby Places:</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>- City Central University (5 min walk)</li>
                            <li>- Downtown Metro Station (10 min walk)</li>
                            <li>- Central Library (7 min walk)</li>
                            <li>- "The Hangout" Cafe (2 min walk)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default LocationMap;