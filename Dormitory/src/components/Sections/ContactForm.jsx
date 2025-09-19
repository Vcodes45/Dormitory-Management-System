import React, { useState } from 'react';
import { generateContent } from '../../api/geminiAPI';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', subject: '' });
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateWelcomeMessage = async (name, subject) => {
        setIsGenerating(true);
        const prompt = `Write a short, friendly, and welcoming confirmation message for a student named "${name}" who just sent an inquiry about "${subject}". Confirm their message was received and that the DormLife team will respond soon. Be warm and encouraging.`;

        const message = await generateContent(prompt);
        setWelcomeMessage(message || `Hi ${name}, thank you for your inquiry about "${subject}"! We've received it and our team will get back to you shortly.`);
        setIsGenerating(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.elements.name.value;
        const subject = form.elements.subject.value;
        setFormData({ name, subject });
        setSubmitted(true);
        generateWelcomeMessage(name, subject);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
                    <p className="text-lg text-gray-600 mt-2">Have questions? Fill out the form below and we'll get back to you shortly.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    {submitted ? (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-600">Thank You, {formData.name}!</h3>
                            {isGenerating ? (
                                <p className="text-gray-700 mt-2">Generating a confirmation...</p>
                            ) : (
                                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{welcomeMessage}</p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" required className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" required className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <input type="text" id="subject" required className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" rows="5" required className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <div className="mt-8 text-center">
                                <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;