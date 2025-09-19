// import React, { useState, useEffect, useRef } from "react";
// import { MessageSquare, X, Send, Sparkles } from "lucide-react";
// import { initialRooms, faqs } from "../../constants/mockData";
// import { generateContent } from "../../api/geminiAPI";

// const AIChatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hello! I'm DormBot, powered by Gemini. How can I help you today?",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // ... (scrollToBottom and useEffect hooks remain the same)

//   const callGeminiAPI = async (prompt) => {
//     const roomInfo = initialRooms
//       .map(
//         (r) =>
//           `- ${r.name} (${r.type}): Costs ₹${
//             r.price
//           }/month, has ${r.amenities.join(", ")}. ${r.availability} beds left.`
//       )
//       .join("\n");
//     const faqInfo = faqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n");

//     const systemPrompt = `You are DormBot, a friendly and helpful AI assistant for the DormLife student dormitory. Your goal is to answer user questions accurately and concisely based on the information provided below. Do not make up information. If you don't know the answer, say that you can't find the information and suggest they use the contact form.

// Dormitory Information:
// - Contact: +1 (234) 567-890 or contact@dormlife.com
// - Location: 123 University Lane, Student City, ST 45678

// Available Rooms:\n${roomInfo}

// Frequently Asked Questions:\n${faqInfo}

// Now, please answer the user's question.`;

//     return await generateContent(prompt, systemPrompt);
//   };

//   const handleSendMessage = async () => {
//     if (inputValue.trim() === "" || isLoading) return;

//     const userMessage = { sender: "user", text: inputValue };
//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = inputValue;
//     setInputValue("");
//     setIsLoading(true);

//     const botResponseText = await callGeminiAPI(currentInput);

//     setMessages((prev) => [...prev, { sender: "bot", text: botResponseText }]);
//     setIsLoading(false);
//   };

//   // ... (The rest of the component's JSX from the original file)
// };

// export default AIChatbot;




import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { initialRooms, faqs } from "../../constants/mockData";
import { generateContent } from "../../api/geminiAPI";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm DormBot, powered by Gemini. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ... (scrollToBottom and useEffect hooks remain the same)

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
        <button
          className="fixed bottom-6 right-6 z-50 text-white p-4 flex items-center justify-center transition-all duration-200 bg-transparent"
          onClick={() => setIsOpen(true)}
          aria-label="Open DormBot Chat"
        >
          {/* Spline 3D Model Embed */}
          <iframe src='https://my.spline.design/genkubgreetingrobot-3VztJ3AJijuenaM1LbPoRewZ/' frameborder='0' width='100%' height='100%'></iframe>
          <span className="font-semibold">Chat</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-600 rounded-t-xl">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">DormBot</span>
            </div>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50" style={{ maxHeight: '350px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
              className={`bg-blue-600 hover:bg-emerald-500 text-white rounded-lg p-2 transition-all duration-200 ${isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;