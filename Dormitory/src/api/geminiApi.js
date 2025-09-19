const API_KEY = ""; // Your API key would go here, but we leave it empty as requested.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

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
            // Handle cases where the response structure is unexpected
            console.error("Unexpected API response structure:", result);
            return "I'm sorry, I received an unexpected response. Please try again.";
        }
    } catch (error) {
        console.error("Gemini API call error:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
    }
};