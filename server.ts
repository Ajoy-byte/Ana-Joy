import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Client Initialization
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/gemini/styling-advice", async (req, res) => {
    try {
      const { productName, productDescription } = req.body;
      
      if (!productName) {
        return res.status(400).json({ error: "Product name is required" });
      }

      const prompt = `You are a professional fashion stylist for a high-end minimalist clothing brand called "Vellum & Thread".
      Provide architectural and styling advice for the following piece:
      
      Product: ${productName}
      Description: ${productDescription}
      
      Suggest 2 brief ways to style this piece (one casual, one formal) and 1 artistic "architectural" observation about its form. 
      Keep the tone sophisticated, poetic, and focused on minimalism. Use Markdown for formatting.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ advice: result.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate styling advice" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
