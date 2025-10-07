import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { initialRooms, faqs } from "../../constants/mockData";
import { generateContent } from "../../api/geminiAPI";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm DormBot, your friendly dormitory assistant! I can help you with:\n\n🏠 Room availability and pricing\n📍 Dormitory amenities and facilities\n📞 Contact information\n❓ General questions about our dormitories\n\nHow can I assist you today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Enhanced context with dormitory-specific information
      const dormitoryContext = `
        You are DormBot, a helpful and friendly AI assistant for a premium dormitory management system in India. 
        
        Available Dormitories and Pricing:
        - Budget Room: ₹8,000/month - Basic amenities, shared washroom
        - Standard Room: ₹12,000/month - Private washroom, AC, study desk
        - Premium Room: ₹18,000/month - Luxury amenities, premium location
        - Deluxe Suite: ₹25,000/month - Spacious, premium furnishing, balcony

        Facilities Available:
        - 24/7 Security and CCTV
        - High-speed Wi-Fi throughout
        - Fully equipped gym and fitness center
        - Modern laundry facilities
        - Study rooms and library
        - Recreational areas and game room
        - Rooftop lounge and terrace
        - Cafeteria and mess hall
        - Reception and help desk
        - Kitchen facilities

        Contact Information:
        - Phone: +91 9876543210
        - Email: info@dormlife.com
        - Address: Premium Dormitories, Tech City, Bangalore

        Guidelines for responses:
        - Be warm, friendly, and helpful
        - Use Indian context and terminology
        - Include emojis to make responses engaging
        - Provide specific information about rooms and facilities
        - If asked about booking, guide them to contact reception
        - Keep responses concise but informative
        - Always maintain a positive and welcoming tone
      `;

      const prompt = `${dormitoryContext}\n\nUser Question: ${inputText}\n\nPlease provide a helpful and friendly response:`;
      
      const response = await generateContent(prompt);
      
      const botMessage = {
        sender: "bot",
        text: response,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = {
        sender: "bot",
        text: "I apologize, but I'm experiencing some technical difficulties right now. 😅 Please try asking your question again, or you can contact our reception at +91 9876543210 for immediate assistance!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isOpen && (
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
      )}

      {/* Chatbot Window */}
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
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">DormBot</h3>
                <p className="text-white/80 text-xs">Your Dormitory Assistant</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors relative z-10 p-1 hover:bg-white/10 rounded-full"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50 to-white chatbot-messages" style={{ maxHeight: '400px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-br-md'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                  style={{
                    lineHeight: '1.4',
                    wordBreak: 'break-word'
                  }}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">You</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start animate-fade-in-up">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-100 text-gray-800 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about our dormitories..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm placeholder-gray-400 transition-all"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '100px' }}
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-11 h-11 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
