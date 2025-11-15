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
        // Common practice to put image before text for multimodal prompts
        contents: { parts: [imagePart, textPart] },
    });

    const text = response.text;
    
    if (typeof text === 'string' && text.length > 0) {
        return text.trim();
    } else {
        console.warn("Gemini response was empty or not text:", response);
        return "The AI could not generate a description for this image. Please try another image or write a description manually.";
    }
  } catch (error) {
    console.error("Error generating description from Gemini:", error);
    // It's better to return a user-friendly message
    return "An error occurred while generating the description with AI. Please check the console for details and try again, or write one manually.";
  }
}
