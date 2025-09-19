import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../../constants/mockData';

const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">What Our Residents Say</h2>
                <p className="text-lg text-gray-600 mt-2">Real stories from students who call DormLife home.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.review}"</p>
                        <div className="mt-6">
                            <p className="font-bold text-gray-800">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.course}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;