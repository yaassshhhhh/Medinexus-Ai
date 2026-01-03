import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Gemini API Key is missing in server configuration."
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Act as a medical assistant. A user has reported the following symptoms: "${symptoms}".
        Please provide:
        1. Potential causes (briefly).
        2. Suggested primary medicines (OTC) or home remedies.
        3. Key factors to monitor.
        4. A strong disclaimer that you are an AI and they should consult a doctor.
        
        Format the response in Markdown. Keep it concise but helpful.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, analysis: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { analyzeSymptoms };
