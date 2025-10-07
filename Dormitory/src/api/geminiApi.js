const API_KEY = "AIzaSyAFwsuNH-hreJ_JGVNv6gM_L30CFf8rBAI"; // Remember to add your own API key here.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const generateContent = async (prompt, systemInstruction = null) => {
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    if (systemInstruction) {
        payload.systemInstruction = {
            parts: [{ text: systemInstruction }]
        };
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.error("Unexpected API response structure:", result);
            return "I'm sorry, I received an unexpected response. Please try again.";
        }
    } catch (error) {
        console.error("Gemini API call error:", error);
        
        // More specific error messages
        if (error.message.includes('400')) {
            return "I couldn't process your request. Please try rephrasing your question about our dormitory facilities.";
        } else if (error.message.includes('401') || error.message.includes('403')) {
            return "I'm experiencing some technical difficulties. Let me help you with basic dormitory information instead.";
        } else if (error.message.includes('429')) {
            return "I'm getting too many requests right now. Please wait a moment and try again.";
        } else {
            return "I'm temporarily unavailable, but I can still help! Try asking about our rooms, amenities, or contact information.";
        }
    }
};

