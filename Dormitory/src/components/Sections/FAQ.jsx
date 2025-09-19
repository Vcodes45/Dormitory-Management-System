import React from 'react';
import { faqs } from '../../constants/mockdata';
import FAQItem from '../Common/FAQItem';

const FAQ = () => (
    <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 mt-2">Find answers to common questions about living at DormLife.</p>
            </div>
            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} q={faq.q} a={faq.a} />
                ))}
            </div>
        </div>
    </section>
);

export default FAQ;