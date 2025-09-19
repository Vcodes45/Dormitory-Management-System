import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../../constants/mockData';

const Testimonials = ({ darkMode }) => (
    <section id="testimonials" className={`py-20 ${darkMode ? 'bg-[#222] text-teal-100' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>What Our Residents Say</h2>
                <p className={`text-lg mt-2 ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>Real stories from students who call DormLife home.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-[#303030] text-teal-100' : 'bg-white'}`}>
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                            ))}
                        </div>
                        <p className={darkMode ? 'text-teal-100' : 'text-gray-600'}>"{testimonial.review}"</p>
                        <div className="mt-6">
                            <p className={darkMode ? 'text-teal-300' : 'text-gray-600'}>{testimonial.name}</p>
                            <p className={darkMode ? 'text-teal-100' : 'text-gray-600'}>{testimonial.course}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;