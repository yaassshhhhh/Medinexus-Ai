
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.log("No API Key found");
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => {
                if (m.name.includes('gemini')) {
                    console.log(m.name, m.supportedGenerationMethods);
                }
            });
        } else {
            console.log("Error listing models:", data);
        }
    } catch (error) {
        console.log("Network error listing models:", error.message);
    }
}

listModels();
