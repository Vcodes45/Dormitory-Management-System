import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { initialRooms, faqs } from '../../constants/mockdata';
import { generateContent } from '../../api/geminiApi';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! I'm DormBot, powered by Gemini. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // ... (scrollToBottom and useEffect hooks remain the same)

    const callGeminiAPI = async (prompt) => {
        const roomInfo = initialRooms.map(r => `- ${r.name} (${r.type}): Costs ₹${r.price}/month, has ${r.amenities.join(', ')}. ${r.availability} beds left.`).join('\n');
        const faqInfo = faqs.map(f => `- Q: ${f.q}\n  A: ${f.a}`).join('\n');

        const systemPrompt = `You are DormBot, a friendly and helpful AI assistant for the DormLife student dormitory. Your goal is to answer user questions accurately and concisely based on the information provided below. Do not make up information. If you don't know the answer, say that you can't find the information and suggest they use the contact form.

Dormitory Information:
- Contact: +1 (234) 567-890 or contact@dormlife.com
- Location: 123 University Lane, Student City, ST 45678

Available Rooms:\n${roomInfo}

Frequently Asked Questions:\n${faqInfo}

Now, please answer the user's question.`;
        
        return await generateContent(prompt, systemPrompt);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        const botResponseText = await callGeminiAPI(currentInput);
        
        setMessages(prev => [...prev, { sender: 'bot', text: botResponseText }]);
        setIsLoading(false);
    };

    // ... (The rest of the component's JSX from the original file)
};

export default AIChatbot;