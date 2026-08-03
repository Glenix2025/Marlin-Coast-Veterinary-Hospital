import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { FAQ_KNOWLEDGE_BASE, CLINIC_INFO, findBestFAQMatch } from './src/data/faqData';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// System Instruction constructed strictly from prompt parameters and FAQ knowledge base
const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for Marlin Coast Veterinary Hospital, a family-owned veterinary hospital located at Cnr Aropa St and Captain Cook Highway, Trinity Beach QLD 4879 (Cairns and Northern Beaches community, Far North Queensland).
The hospital is led by Dr Steven Porep and Dr Ashleigh Porep.

YOUR TONE:
Warm, professional, reassuring, supportive, and community-minded. Match the clinic's caring and gentle approach.

STRICT BEHAVIOR RULES:
1. Answer ONLY from the FAQ Knowledge Base provided below. Do NOT hallucinate or add facts outside this list.
2. NEVER invent prices, exact costs, medical diagnoses, medical advice, or medication dosing.
   - If asked about PRICING or FEES: Respond warmly that fees are assessed per pet during consultation and direct the user to call 07 4057 6033 or book an appointment online at https://www.mcvet.com.au/appointment.
3. NEVER give a medical diagnosis or emergency triage judgment.
   - For ANY mention of a PET EMERGENCY or urgent medical situation: Immediately surface our after-hours emergency service information ("Marlin Coast Veterinary Hospital provides an after hours emergency service for existing situations") and direct the user to call the clinic immediately at 07 4057 6033.
4. If a question falls outside the FAQ set: Respond warmly and direct the user to call 07 4057 6033, email admin@mcvet.com.au, or visit our contact page at https://www.mcvet.com.au/contact-us rather than guessing.
5. Whenever relevant, include actual contact links:
   - Book Online: https://www.mcvet.com.au/appointment
   - Phone: 07 4057 6033
   - Email: admin@mcvet.com.au
   - Online Medication & Food Orders: https://www.mcvet.com.au/order-online
   - Contact Page: https://www.mcvet.com.au/contact-us

FAQ KNOWLEDGE BASE:
${FAQ_KNOWLEDGE_BASE.map((item, idx) => `${idx + 1}. Q: ${item.question}\n   A: ${item.answer}`).join('\n\n')}
`;

// Helper to initialize Gemini client safely
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for Chat requests
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required.' });
    }

    const ai = getGenAIClient();

    if (ai) {
      try {
        // Build chat history for Gemini API call
        const formattedHistory = Array.isArray(history)
          ? history.map((msg: { sender: string; text: string }) => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }],
            }))
          : [];

        const chat = ai.chats.create({
          model: 'gemini-3.6-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2, // Low temperature to maintain strict adherence to knowledge base
          },
          history: formattedHistory,
        });

        const response = await chat.sendMessage({ message });
        const replyText = response.text;

        if (replyText) {
          return res.json({ reply: replyText, source: 'gemini' });
        }
      } catch (geminiError) {
        console.warn('Gemini API call warning/fallback:', geminiError);
        // Fall through to smart FAQ fallback
      }
    }

    // Fallback logic using local FAQ search engine when API key is unconfigured or fails
    const { match, isEmergency, isPriceQuery } = findBestFAQMatch(message);

    if (isEmergency) {
      return res.json({
        reply: `🚨 **Pet Emergency Notice**\n\nMarlin Coast Veterinary Hospital provides an after hours emergency service for existing situations. If your pet is experiencing an urgent medical emergency, please call us immediately at **07 4057 6033**.\n\nOur team is located at Cnr Aropa St and Captain Cook Highway, Trinity Beach.`,
        source: 'fallback',
        isEmergency: true,
      });
    }

    if (isPriceQuery) {
      return res.json({
        reply: `Veterinary fees and treatment plans are assessed individually per pet based on their specific health requirements. \n\nFor pricing inquiries or custom quotes, please call our friendly team on **07 4057 6033** or book a consultation online at https://www.mcvet.com.au/appointment.\n\nWe also accept GapOnly, Zip Pay, and VetPay payment options.`,
        source: 'fallback',
      });
    }

    if (match) {
      return res.json({
        reply: match.answer,
        source: 'fallback',
      });
    }

    // Warm default fallback for questions outside knowledge base
    return res.json({
      reply: `Thank you for contacting Marlin Coast Veterinary Hospital. I want to make sure you get the most accurate care and information for your pet! \n\nAs this specific topic is best handled directly by our veterinary team, please call us on **07 4057 6033**, email **admin@mcvet.com.au**, or reach out via our contact page at https://www.mcvet.com.au/contact-us. You can also book an appointment online anytime at https://www.mcvet.com.au/appointment.`,
      source: 'fallback',
    });

  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return res.status(500).json({
      reply: 'We encountered an error processing your message. Please call Marlin Coast Veterinary Hospital directly on 07 4057 6033 for immediate assistance.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
