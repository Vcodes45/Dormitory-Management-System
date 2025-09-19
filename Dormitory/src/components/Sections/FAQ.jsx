import React from 'react';
import { faqs } from '../../constants/mockData';
import FAQItem from '../Common/FAQItem';

const FAQ = ({ darkMode }) => (
    <section id="faq" className={`py-20 ${darkMode ? 'bg-[#222] text-teal-100' : 'bg-white'}`}>
        <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>Frequently Asked Questions</h2>
                <p className={`text-lg mt-2 ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>Find answers to common questions about living at DormLife.</p>
            </div>
            <div className={`space-y-2 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                {faqs.map((faq, index) => (
                    <FAQItem key={index} q={faq.q} a={faq.a} darkMode={darkMode} />
                ))}
            </div>
        </div>
    </section>
);

export default FAQ;