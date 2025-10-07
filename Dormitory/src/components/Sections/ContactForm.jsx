import React, { useState } from 'react';
import axios from 'axios';
import { generateContent } from '../../api/geminiAPI';

const ContactForm = ({ darkMode }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    const generateWelcomeMessage = async (name, subject) => {
        setIsGenerating(true);
        const prompt = `Write a short, friendly, and welcoming confirmation message for a student named "${name}" who just sent an inquiry about "${subject}". Confirm their message was received and that the DormLife team will respond soon. Be warm and encouraging.`;

        const message = await generateContent(prompt);
        setWelcomeMessage(message || `Hi ${name}, thank you for your inquiry about "${subject}"! We've received it and our team will get back to you shortly.`);
        setIsGenerating(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const contactData = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            subject: form.elements.subject.value,
            message: form.elements.message.value
        };

        setIsSending(true);
        setError('');

        try {
            // Send email via backend
            const response = await axios.post('http://localhost:8080/api/contact/send', contactData);
            
            if (response.data.success) {
                setFormData(contactData);
                setSubmitted(true);
                generateWelcomeMessage(contactData.name, contactData.subject);
            } else {
                setError(response.data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending contact form:', error);
            setError(error.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className={`py-20 ${darkMode ? 'bg-[#222] text-teal-100' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className={`text-4xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>Get In Touch</h2>
                    <p className={`text-lg mt-2 ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>Have questions? Fill out the form below and we'll get back to you shortly.</p>
                </div>
                <div className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg ${darkMode ? 'bg-[#303030] text-teal-100' : 'bg-white'}`}>
                    {submitted ? (
                        <div className="text-center">
                            <div className="mb-4">
                                <svg className={`mx-auto h-16 w-16 ${darkMode ? 'text-green-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Thank You, {formData.name}!</h3>
                            <p className={`mt-2 ${darkMode ? 'text-teal-200' : 'text-gray-600'}`}>
                                Your message has been sent successfully! We've also sent a confirmation email to <strong>{formData.email}</strong>
                            </p>
                            {isGenerating ? (
                                <p className={`${darkMode ? 'text-teal-100 mt-2' : 'text-gray-700 mt-2'} italic`}>Generating personalized response...</p>
                            ) : (
                                <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-[#222] border border-teal-600' : 'bg-gray-50 border border-gray-200'}`}>
                                    <p className={`${darkMode ? 'text-teal-100 whitespace-pre-wrap' : 'text-gray-700 whitespace-pre-wrap'} text-left`}>{welcomeMessage}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900/50 border border-red-600 text-red-200' : 'bg-red-50 border border-red-200 text-red-600'}`}>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {error}
                                    </div>
                                </div>
                            )}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>Full Name</label>
                                    <input type="text" id="name" required className={`mt-1 block w-full p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-emerald-500 ${darkMode ? 'bg-[#222] border-teal-700 text-teal-100' : 'border border-gray-300'}`} />
                                </div>
                                <div>
                                    <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>Email Address</label>
                                    <input type="email" id="email" required className={`mt-1 block w-full p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-emerald-500 ${darkMode ? 'bg-[#222] border-teal-700 text-teal-100' : 'border border-gray-300'}`} />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="subject" className={`block text-sm font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>Subject</label>
                                <input type="text" id="subject" required className={`mt-1 block w-full p-3 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#222] border-teal-700 text-teal-100' : 'border border-gray-300'}`} />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-teal-200' : 'text-gray-700'}`}>Message</label>
                                <textarea id="message" rows="5" required className={`mt-1 block w-full p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-emerald-500 ${darkMode ? 'bg-[#222] border-teal-700 text-teal-100' : 'border border-gray-300'}`}></textarea>
                            </div>
                            <div className="mt-8 text-center">
                                <button 
                                    type="submit" 
                                    disabled={isSending}
                                    className={`px-12 py-3 rounded-full font-semibold text-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? 'bg-teal-700 text-white hover:bg-teal-800 disabled:hover:bg-teal-700' : 'bg-emerald-600 text-white hover:bg-emerald-500 disabled:hover:bg-emerald-600'}`}
                                >
                                    {isSending ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
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