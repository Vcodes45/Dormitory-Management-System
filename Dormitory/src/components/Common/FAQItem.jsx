import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ q, a, darkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left py-4 flex justify-between items-center">
                <span className={`text-lg font-semibold ${darkMode ? 'text-teal-100' : 'text-gray-800'}`}>{q}</span>
                <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className={`pb-4 ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>{a}</div>
            )}
        </div>
    );
};

export default FAQItem;

