import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { initialRooms, faqs } from "../../constants/mockData";
import { generateContent } from "../../api/geminiAPI";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm DormBot, your friendly dormitory assistant. I can help you with:\n\n• Room types and pricing\n• Facilities and amenities\n• Booking process\n• Meal plans & dining options\n• Guest policies & security\n\nWhat would you like to know about our dormitory?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Hide Spline watermark and add custom animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide Spline watermark and logo */
      iframe[src*="spline.design"] {
        position: relative !important;
      }
      
      iframe[src*="spline.design"]::after {
        content: '' !important;
        position: absolute !important;
        bottom: 0 !important;
        right: 0 !important;
        width: 80px !important;
        height: 25px !important;
        background: transparent !important;
        z-index: 1000 !important;
      }
      
      /* Additional watermark hiding */
      .spline-watermark,
      .spline-logo,
      [class*="watermark"],
      [class*="spline"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }

      /* Custom animations */
      .animate-slide-up {
        animation: slideUp 0.3s ease-out forwards;
      }
      
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.4s ease-out forwards;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Custom scrollbar for messages */
      .chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .chatbot-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 3px;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // ... (scrollToBottom and useEffect hooks remain the same)

  // --- Fallback responses for common questions ---
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Room pricing queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rent')) {
      return `Here are our current room prices:
• Spacious Quad Room (4-Bed): ₹6,000/month
• Economy Single Room: ₹7,000/month  
• Triple Occupancy (3-Bed): ₹7,200/month
• Cozy Twin Sharing (2-Bed): ₹8,500/month
• Premium Studio Suite: ₹10,000/month
• Private Deluxe Room (1-Bed): ₹15,000/month

All rooms include Wi-Fi, laundry access, and basic amenities. Contact us for more details!`;
    }
    
    // Amenities queries
    if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('what do you have')) {
      return `Our dormitory offers excellent facilities:
🏠 Room Types: Single, Twin, Triple, Quad & Studio options
🌐 High-speed Wi-Fi throughout
❄️ Air conditioning in all rooms
👕 Laundry facilities
📚 Quiet study areas
🍽️ Cafeteria with meal plans
💪 Fitness gym
🎮 Recreation/Game room
🔒 24/7 Security
🚗 Parking available

Need more specific information? Feel free to ask!`;
    }
    
    // Booking queries
    if (lowerMessage.includes('book') || lowerMessage.includes('apply') || lowerMessage.includes('admission')) {
      return `To book a room at our dormitory:
1. Fill out our inquiry form on the website
2. Our team will contact you within 24 hours
3. Submit required documents
4. Complete payment process
5. Move in and enjoy your new home!

We're here to make the process as smooth as possible. Contact our reception for immediate assistance!`;
    }
    
    // FAQ queries
    if (lowerMessage.includes('meal') || lowerMessage.includes('food') || lowerMessage.includes('dining')) {
      return `We offer flexible meal options:
🍽️ Optional meal plans available
🥘 Breakfast, lunch & dinner at our cafeteria
📝 Weekly changing menu
💳 Pay-as-you-go option also available
🍳 Some rooms include kitchenettes

Contact us to learn more about our dining options!`;
    }
    
    if (lowerMessage.includes('guest') || lowerMessage.includes('visitor')) {
      return `Guest Policy:
👥 Guests welcome in common areas (9 AM - 9 PM)
🌙 Overnight guests allowed with prior permission
💰 Nominal fee may apply for overnight stays
📝 Sign-in required at security desk

Please contact management for guest approval!`;
    }
    
    if (lowerMessage.includes('timing') || lowerMessage.includes('curfew') || lowerMessage.includes('gate')) {
      return `Gate Timings & Security:
🕐 Main gate open 24/7 for residents
🌙 11:00 PM curfew for entry
🔐 After 11 PM, sign in at security desk required
👮 24/7 security staff on duty

Your safety and security is our top priority!`;
    }
    
    // Default fallback
    return `I'd be happy to help you with information about our dormitory! I can tell you about:
• Room types and pricing
• Facilities and amenities  
• Booking process
• Meal plans
• Guest policies
• Safety and security

What would you like to know more about?`;
  };

  const callGeminiAPI = async (prompt) => {
    const roomInfo = initialRooms
      .map(
        (r) =>
          `- ${r.name} (${r.type}): Costs ₹${
            r.price
          }/month, has ${r.amenities.join(", ")}. ${r.availability} beds left.`
      )
      .join("\n");
    const faqInfo = faqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n");

    const systemPrompt = `You are DormBot, a helpful AI assistant for our student dormitory. 

Available Rooms:
${roomInfo}

Frequently Asked Questions:
${faqInfo}

Be friendly, helpful, and concise. Focus on student needs. If you can't answer something, direct them to contact our staff.

Now, please answer the user's question.`;

    try {
      const response = await generateContent(prompt, systemPrompt);
      
      // If the response contains error messages, use fallback
      if (response.includes('trouble connecting') || response.includes('technical difficulties') || response.includes('temporarily unavailable') || response.includes('brain')) {
        return getFallbackResponse(prompt);
      }
      
      return response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return getFallbackResponse(prompt);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    const botResponseText = await callGeminiAPI(currentInput);

    setMessages((prev) => [...prev, { sender: "bot", text: botResponseText }]);
    setIsLoading(false);
  };

  // --- Chatbot UI JSX ---
  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isOpen && (
<<<<<<< HEAD
        <button
          className="fixed bottom-6 right-6 z-50 text-white p-4 flex items-center justify-center transition-all duration-200 bg-transparent"
          onClick={() => setIsOpen(true)}
          aria-label="Open DormBot Chat"
        >
          {/* Spline 3D Model Embed */}
          <iframe
            src="https://my.spline.design/genkubgreetingrobot-3VztJ3AJijuenaM1LbPoRewZ/"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
          <span className="font-semibold">Chat</span>
        </button>
      )}

      {/* Chatbot Window */}
=======
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
            onClick={() => setIsOpen(true)}
            aria-label="Open DormBot Chat"
            style={{
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            }}
          >
            {/* Spline 3D Model Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-full">
              <iframe 
                src='https://my.spline.design/genkubgreetingrobot-3VztJ3AJijuenaM1LbPoRewZ/' 
                frameBorder='0' 
                width='120%' 
                height='120%'
                style={{
                  position: 'absolute',
                  top: '-10%',
                  left: '-10%',
                  border: 'none',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />
            </div>
            
            {/* Overlay to hide watermark */}
            <div 
              className="absolute bottom-0 right-0 w-8 h-6 bg-transparent"
              style={{ zIndex: 1000 }}
            />
          </button>
          
          {/* Floating Chat label */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <span className="text-sm font-semibold text-emerald-600 bg-white px-3 py-1 rounded-full shadow-lg border border-emerald-100">
              💬 Chat with DormBot
            </span>
          </div>
        </div>
      )}      {/* Chatbot Window */}
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col border-0 overflow-hidden backdrop-blur-sm animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-500 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-blue-500/90 backdrop-blur-sm"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{backgroundImage: "radial-gradient(circle at 20px 20px, white 2px, transparent 2px)", backgroundSize: "40px 40px"}}></div>
            </div>
            
            <div className="flex items-center gap-3 text-white relative z-10">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-lg">DormBot</span>
                <div className="text-white/80 text-xs">Always here to help 🏠</div>
              </div>
            </div>
            <button
              className="text-white/90 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 relative z-10"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
<<<<<<< HEAD
          <div
            className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50"
            style={{ maxHeight: "350px" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
=======
          <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50 to-white chatbot-messages" style={{ maxHeight: '400px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
<<<<<<< HEAD
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
=======
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md ml-8'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100 hover:shadow-md transition-shadow'
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center ml-2 flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-semibold">You</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="mb-4 flex justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-md border border-gray-100 px-4 py-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">DormBot is thinking</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-xs font-semibold text-gray-600 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Popular questions:
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setInputValue("What are your room prices?")}
                  className="text-sm bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl px-4 py-2 hover:from-emerald-100 hover:to-blue-100 hover:border-emerald-300 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                >
                  <span className="text-lg mr-2">💰</span>
                  <span className="font-medium text-gray-700">Room Pricing & Costs</span>
                </button>
                <button 
                  onClick={() => setInputValue("What facilities do you have?")}
                  className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl px-4 py-2 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                >
                  <span className="text-lg mr-2">🏠</span>
                  <span className="font-medium text-gray-700">Facilities & Amenities</span>
                </button>
                <button 
                  onClick={() => setInputValue("How do I book a room?")}
                  className="text-sm bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl px-4 py-2 hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                >
                  <span className="text-lg mr-2">📝</span>
                  <span className="font-medium text-gray-700">Booking Process</span>
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <input
              type="text"
<<<<<<< HEAD
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder={
                isLoading ? "Waiting for response..." : "Type your message..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
=======
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 placeholder-gray-400"
              placeholder={isLoading ? "DormBot is typing..." : "Ask me anything about the dormitory..."}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
              }}
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
<<<<<<< HEAD
              className={`bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-2 transition-all duration-200 ${
                isLoading || !inputValue.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
=======
              className={`bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl p-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed scale-100' : ''}`}
>>>>>>> 9f8d121 (Initial commit of the DormLife project)
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
