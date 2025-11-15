
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function base64ToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

export async function generateDescriptionFromImage(
  imageBase64: string,
  imageMimeType: string
): Promise<string> {
  try {
    const imagePart = base64ToGenerativePart(imageBase64, imageMimeType);
    const textPart = {
      text: "Describe this product for an Indian department store e-commerce listing. Be creative, evocative, and highlight its potential appeal to customers. Keep it concise (2-3 sentences)."
    };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description from Gemini:", error);
    return "Error generating description. Please try again or write one manually.";
  }
}
