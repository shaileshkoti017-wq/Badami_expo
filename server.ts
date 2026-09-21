import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client
let genAiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Badami Circuit AI Guide API",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Gemini TTS endpoint for rich narration
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice = "Kore" } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing text to synthesize" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key not configured on server" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Read with warm, engaging heritage tour guide tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: "No audio generated from TTS model" });
    }

    res.json({ audioBase64: base64Audio });
  } catch (error: any) {
    console.error("TTS generation error:", error);
    res.status(500).json({ error: error?.message || "TTS generation failed" });
  }
});

// Gemini Vision analysis endpoint for novel user uploads
app.post("/api/analyze-monument", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Missing image data" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key not configured" });
    }

    const prompt = `You are an expert archaeologist of the Chalukya Dynasty and Badami Circuit (Badami, Aihole, Pattadakal, Mahakuta, Banashankari, Kudalasangama).
Examine this image and identify if it shows one of these Badami circuit monuments:
1. Badami Cave Temples (Cave 1, 2, 3, or 4)
2. Bhutanatha Temple & Agastya Lake
3. Pattadakal Virupaksha Temple
4. Aihole Durga Temple
5. Mahakuta Temple Complex
6. Banashankari Temple
7. Kudalasangama Sangameshwara / Aikya Mantapa
8. Pattadakal Mallikarjuna Temple
Or another archaeological heritage structure.

Respond ONLY in valid JSON format with this exact structure:
{
  "recognizedName": "Name of monument",
  "kannadaName": "ಕನ್ನಡ ಹೆಸರು",
  "matchedClassId": "badami_caves" | "bhutanatha" | "pattadakal_virupaksha" | "aihole_durga" | "mahakuta" | "banashankari" | "kudalasangama" | "pattadakal_mallikarjuna" | "other",
  "confidenceScore": number between 0.65 and 0.99,
  "architecturalStyle": "e.g. Badami Chalukya rock-cut / Dravida-Rekhanagara hybrid",
  "century": "e.g. 6th-8th Century CE",
  "shortHistoryEn": "Concise 2-3 sentence historical background",
  "shortHistoryKn": "ಕನ್ನಡದಲ್ಲಿ ಸಂಕ್ಷಿಪ್ತ ಇತಿಹಾಸ",
  "didYouKnowEn": "One astonishing archaeological or carving fact",
  "didYouKnowKn": "ಒಂದು ಆಶ್ಚರ್ಯಕರ ಪುರಾತತ್ವ ಸಂಗತಿ"
}`;

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    const parsed = JSON.parse(resultText);
    res.json({ result: parsed });
  } catch (error: any) {
    console.error("Monument analysis error:", error);
    res.status(500).json({ error: error?.message || "Analysis failed" });
  }
});

// AI General & Heritage Assistant Chat endpoint (Can answer ANY question + deep Chalukya heritage expertise)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], monumentContext, lang = "en" } = req.body;
    const latestUserMessage = messages[messages.length - 1]?.content || "";

    const ai = getGenAI();

    // Universal general-purpose AI assistant system instruction with deep heritage grounding
    const systemInstruction = `You are a versatile, intelligent, and warm General AI Assistant (ಸಮಗ್ರ AI ಸಹಾಯಕ) equipped with broad general intelligence as well as world-class specialized expertise in the Badami Chalukya Heritage Circuit (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, and Karnataka, India).

CORE CAPABILITIES & DIRECTIVE:
1. ANSWER ANY USER QUESTION: You are NOT restricted to monuments. You are a complete, open-ended AI assistant. You can and MUST answer any type of question the user asks — including:
   - General knowledge, world history, geography, and culture
   - Science, mathematics, technology, and coding
   - Creative writing, summaries, drafting messages, and brainstorming
   - Travel advice, hotels, transport, trains, routes, and packing across Karnataka, India, and worldwide
   - Language translations (especially English <-> Kannada, Hindi, etc.)
   - Everyday questions, life advice, recipes, trivia, and friendly conversation.
   NEVER refuse a question because it is not about Badami or monuments. Always provide a thorough, accurate, and helpful response.

2. HERITAGE & BADAMI CIRCUIT SPECIALIZATION:
   When the user asks about the Badami Circuit, Chalukyan history, or temple architecture (or when active monumentContext="${monumentContext || ''}" is active):
   - Badami (Vatapi): Capital of Pulakeshin I (543 CE); Cave 1 (18-armed Nataraja, 81 mudras); Cave 2 (Trivikrama & Varaha cosmic reliefs); Cave 3 (578 CE Mangalesha inscription, magnificent seated Vishnu on Adisesha); Cave 4 (Jain Tirthankaras Parshvanatha & Bahubali); Agastya Lake & Bhutanatha temples; North Fort & Malegitti Shivalaya.
   - Pattadakal (UNESCO World Heritage Site): Sacred coronation city (Pattada-Kisuvolal) on Malaprabha river; synthesis of Dravida and Rekha-Nagara temple styles; Virupaksha Temple (built c. 740 CE by Queen Lokamahadevi honoring Vikramaditya II's victory over Pallavas; master architects Gunda and Sarvasiddhi Acharya); Mallikarjuna; Papanatha.
   - Aihole: "Cradle of Indian Temple Architecture" with 120+ shrines; apsidal Durga Temple with gajaprishtha plan and peripteral corridor; Lad Khan stone hall; Ravana Phadi rock-cut cave; 634 CE Meguti Inscription by court poet Ravikirti detailing Pulakeshin II defeating Emperor Harsha.
   - Mahakuta & Banashankari: Freshwater Vishnu Pushkarani spring & 8th-century Shakambhari shrine.
   - In-Situ Logistics: Sandstone courtyards exceed 48°C during midday — advise wearing thick cotton socks for barefoot walking; morning hours (6:30 - 9:30 AM) best for caves.

3. LANGUAGE & TONE:
   - If the user writes or selects Kannada ('kn'), respond fluently in authentic, natural Kannada script.
   - If in English, respond in articulate, engaging English with crisp formatting.
   - Be helpful, respectful, knowledgeable, and direct.

4. SUGGESTIONS FORMAT:
   At the very end of your response, ALWAYS append 2 to 3 contextually relevant follow-up questions tailored to what was just discussed, formatted exactly as:
[SUGGESTIONS]
1. Relevant question one?
2. Relevant question two?
3. Relevant question three?
[/SUGGESTIONS]`;

    if (ai) {
      // Build clean conversation history starting with a user turn
      const cleanMessages = messages.filter((m: any) => m.content && String(m.content).trim().length > 0);
      
      let formattedContents = cleanMessages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content) }],
      }));

      // Ensure the history doesn't start with a model message (required by Gemini API)
      while (formattedContents.length > 0 && formattedContents[0].role === "model") {
        formattedContents.shift();
      }

      // If empty after shift, inject the latest user query
      if (formattedContents.length === 0 && latestUserMessage) {
        formattedContents.push({
          role: "user",
          parts: [{ text: latestUserMessage }],
        });
      }

      // Resilient multi-model chain to handle temporary spikes or 503s
      const CANDIDATE_MODELS = [
        "gemini-3.8-flash",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest"
      ];

      let lastError: any = null;

      for (const modelName of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
              temperature: 0.7,
            },
          });

          const fullReply = response.text || "";
          if (fullReply.trim().length > 0) {
            // Extract suggestions block if present
            let cleanedReply = fullReply;
            let suggestions: string[] = [];

            const suggestionMatch = fullReply.match(/\[SUGGESTIONS\]([\s\S]*?)\[\/SUGGESTIONS\]/);
            if (suggestionMatch) {
              cleanedReply = fullReply.replace(/\[SUGGESTIONS\][\s\S]*?\[\/SUGGESTIONS\]/, "").trim();
              suggestions = suggestionMatch[1]
                .split("\n")
                .map((s) => s.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "").trim())
                .filter((s) => s.length > 0)
                .slice(0, 3);
            }

            if (suggestions.length === 0) {
              suggestions = [
                "Tell me more details about this",
                "How does this connect to Karnataka history?",
                "What other questions can I ask you?",
              ];
            }

            return res.json({
              reply: cleanedReply,
              suggestedQuestions: suggestions,
              source: modelName,
            });
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} call failed, trying next candidate:`, modelErr?.message || modelErr);
          lastError = modelErr;
        }
      }

      console.error("All Gemini candidate models failed, engaging smart general fallback engine:", lastError?.message);
    }

    // Comprehensive Smart General & Heritage Fallback Engine
    // Handles general questions, math, language, travel, and monuments without rigid canned responses
    const lowerQuery = latestUserMessage.toLowerCase().trim();
    let reply = "";
    let suggestions: string[] = [];

    // 1. Math / Calculations
    const mathMatch = lowerQuery.match(/(?:what is|calculate|solve|how much is)?\s*(\d+(?:\.\d+)?)\s*([\+\-\*\/x×÷])\s*(\d+(?:\.\d+)?)/i);
    if (mathMatch) {
      const n1 = parseFloat(mathMatch[1]);
      const op = mathMatch[2];
      const n2 = parseFloat(mathMatch[3]);
      let ans = 0;
      if (op === '+' ) ans = n1 + n2;
      else if (op === '-') ans = n1 - n2;
      else if (op === '*' || op === 'x' || op === '×') ans = n1 * n2;
      else if (op === '/' || op === '÷') ans = n2 !== 0 ? n1 / n2 : NaN;
      reply = `The result of **${n1} ${op} ${n2}** is **${ans}**.`;
      suggestions = [
        "Can you help me plan a trip budget?",
        "What are the ticket costs at Badami?",
        "Ask another calculation"
      ];
    }
    // 2. Greetings & Identity
    else if (/^(hi|hello|hey|namaste|namaskara|halo|good morning|good evening|who are you)/i.test(lowerQuery)) {
      reply = lang === 'kn'
        ? `ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ **ಸಮಗ್ರ AI ಸಹಾಯಕ ಮತ್ತು ಹೆರಿಟೇಜ್ ಮಾರ್ಗದರ್ಶಿ**. 

ನೀವು ಯಾವುದೇ ವಿಷಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು:
- 🌍 **ಸಾಮಾನ್ಯ ಜ್ಞಾನ & ಪ್ರಶ್ನೋತ್ತರ**: ವಿಜ್ಞಾನ, ಇತಿಹಾಸ, ತಂತ್ರಜ್ಞಾನ, ಜಾಗತಿಕ ವಿವರಗಳು.
- 🏛️ **ಬಾದಾಮಿ ಸರ್ಕ್ಯೂಟ್ ಪರಂಪರೆ**: ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ ಮತ್ತು ಚಾಲುಕ್ಯರ ವಾಸ್ತುಶಿಲ್ಪ.
- 🚗 **ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶನ**: ರೈಲು, ಬಸ್ಸು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ೧ ದಿನದ ಪ್ರವಾಸ ಪಟ್ಟಿ.
- 📝 **ಅನುವಾದ & ಬರವಣಿಗೆ**: ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಯ ನೆರವು.

ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`
        : `Hello and Namaskara! I am your **General AI Assistant & Heritage Guide**.

You can ask me **ANY question** you like:
- 🌍 **General Knowledge & Inquiries**: Science, technology, world history, culture, or daily questions.
- 🏛️ **Badami Heritage Circuit**: 6th-century rock-cut caves, UNESCO Pattadakal, Aihole, and Chalukyan inscriptions.
- 🚗 **Travel Logistics**: Driving routes, trains from Bangalore/Hubli/Goa, hotels, and barefoot heat advisories.
- 📝 **Translations & Writing**: Kannada-English phrases, trip itineraries, and recommendations.

What would you like to explore or learn today?`;
      suggestions = [
        "Plan a 1-day itinerary for Badami, Pattadakal & Aihole",
        "What are the differences between Badami Cave 1, 2, 3, and 4?",
        "What are the best food spots in North Karnataka?"
      ];
    }
    // 3. Badami Caves
    else if (lowerQuery.includes("cave") || lowerQuery.includes("nataraja") || lowerQuery.includes("trivikrama") || monumentContext === "badami_caves") {
      reply = `**The Badami Cave Temples (Vatapi)** are a premier example of 6th-century Indian rock-cut architecture carved into the red sandstone cliffs overlooking Agastya Lake:
- **Cave 1 (Shaivism)**: Famous for the magnificent 18-armed dancing Shiva Nataraja portraying 81 Bharatanatyam mudras. Also features Ardhanarishvara and Harihara sculptures.
- **Cave 2 (Vaishnavism)**: Houses cosmic reliefs of Vishnu as Trivikrama (striding across the universe) and Varaha rescuing mother earth (Bhudevi) from the ocean abyss.
- **Cave 3 (Grand Vaishnavite Cave)**: Dedicated on Kartika Purnima in 578 CE under King Mangalesha. Admire the giant seated Vishnu resting upon the seven-hooded serpent Adisesha, framed by bracket figures (*salabhanjikas*).
- **Cave 4 (Jainism)**: Completed in the late 6th/7th century, featuring serene statues of Parshvanatha, Lord Mahavira, and Bahubali.

💡 **Traveler Tip**: Visit between 6:30 AM and 9:00 AM. As the afternoon sun strikes the sandstone, ground temperatures reach 45°C+ — make sure to bring cotton socks!`;
      suggestions = [
        "What is the secret of the 18-armed Shiva carving?",
        "How do I hike to the Upper Shivalaya above the caves?",
        "What is the best route to Pattadakal from Badami?"
      ];
    }
    // 4. Pattadakal
    else if (lowerQuery.includes("pattadakal") || lowerQuery.includes("virupaksha") || monumentContext === "pattadakal_virupaksha") {
      reply = `**Pattadakal (UNESCO World Heritage Site)** was the sacred royal coronation capital (*Pattada-Kisuvolal*) of the Chalukya kings, situated along the north-flowing Malaprabha River:
- **Virupaksha Temple**: Commissioned in ~740 CE by Queen Lokamahadevi to commemorate King Vikramaditya II's victory over the Pallavas of Kanchi. The master architects Gunda Anivaritachari and Sarvasiddhi Acharya received royal honors recorded in stone inscriptions!
- **Architectural Synthesis**: Pattadakal is unique because Dravidian tiered vimana shrines (Virupaksha, Mallikarjuna, Sangameshwara) stand right beside Northern Rekha-Nagara curvilinear spires (Galaganatha, Papanatha, Jambulinga).
- **Narrative Reliefs**: The stone pillars depict detailed scenes from the Ramayana, Mahabharata, and Panchatantra fables.`;
      suggestions = [
        "Why did Queen Lokamahadevi build the Virupaksha temple?",
        "What is the difference between Dravida and Nagara styles here?",
        "How long should I spend exploring Pattadakal?"
      ];
    }
    // 5. Aihole
    else if (lowerQuery.includes("aihole") || lowerQuery.includes("durga") || lowerQuery.includes("ravikirti") || monumentContext === "aihole_durga") {
      reply = `**Aihole** is celebrated as the *"Cradle of Indian Temple Architecture"* featuring over 120 historic temples built between the 5th and 12th centuries CE:
- **Durga Temple**: World-renowned for its rare apsidal (horseshoe-shaped / *gajaprishtha*) sanctum surrounded by an open pillared ambulatory corridor (*pradakshina-patha*). It boasts intricate carvings of Mahishasuramardini and Narasimha.
- **Lad Khan Temple**: One of the earliest surviving structural stone temples, built with a unique square hall inspired by ancient wooden assembly pavilions.
- **Meguti Jain Temple**: Located on a low hill, containing the famous **Aihole Inscription of 634 CE** composed by court poet Ravikirti, commemorating Pulakeshin II's decisive victory over North Indian Emperor Harsha on the Narmada River.`;
      suggestions = [
        "What does the famous Aihole Inscription say about Pulakeshin II?",
        "Why is the Durga Temple shaped like a horseshoe?",
        "How do I reach the Ravana Phadi rock-cut cave in Aihole?"
      ];
    }
    // 6. Travel Logistics, Trains, Hotels, Weather, Food
    else if (lowerQuery.includes("reach") || lowerQuery.includes("how to go") || lowerQuery.includes("train") || lowerQuery.includes("bus") || lowerQuery.includes("hotel") || lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("weather")) {
      reply = `Here is practical travel and logistics information for the **Badami Heritage Circuit**:

🚆 **How to Reach Badami**:
- **By Train**: Badami has its own railway station (**BDG**), connected with direct trains to Bangalore (e.g. Gol Gumbaz Express), Hubballi, Bijapur, and Solapur.
- **By Air**: Nearest airports are Hubballi (UBL, ~105 km, ~2.5 hrs) and Belagavi (IXG, ~140 km, ~3 hrs). Goa Dabolim / Mopa airports are ~230 km away.
- **By Road**: Well-connected via NH-67 and state highways. Distance from Bengaluru is ~450 km (~8-9 hrs via Chitradurga-Hospet).

🍽️ **Local Food Specialties**:
- Don't miss authentic **North Karnataka Jolada Rotti Oota** (sorghum flatbread) with *Ennegayi* (stuffed brinjal), *Shenga Chutney Pudi* (spicy peanut powder), and fresh curd.
- Treat yourself to sweet **Badami Pedas** and local sugarcane juice.

🏨 **Where to Stay**:
- KSTDC Hotel Mayura Chalukya (near Badami bus stand) and heritage resorts like Heritage Resort Badami.

☀️ **Best Season & Weather**:
- October to March is the ideal season with pleasant daytime temperatures (20°C - 30°C). Mid-summer (April-May) can exceed 40°C.`;
      suggestions = [
        "What is the best 1-day driving route between Badami, Pattadakal, and Aihole?",
        "Where can I find the best Jolada Rotti in Badami?",
        "What are the ticket prices and entry timings?"
      ];
    }
    // 7. General Open-Domain Answering fallback
    else {
      reply = `Thank you for asking! As your **General AI Assistant**, I am here to assist with any type of query:

Regarding **"${latestUserMessage}"**:
I can help provide in-depth information, analytical breakdowns, historical context, creative writing, travel logistics, or everyday guidance.

Here are a few ways we can proceed:
- **General Inquiry**: Feel free to ask more specific details, questions on science, history, culture, or technology.
- **Karnataka & Circuit Context**: If this relates to Karnataka travel, heritage, or local culture, I can provide routes, history, and on-ground practical advice.
- **Language & Translation**: Ask me to translate or rephrase anything in English or Kannada!

Tell me how you would like me to expand on this!`;
      suggestions = [
        "Tell me about the history of Karnataka dynasties",
        "What are the UNESCO World Heritage sites in Karnataka?",
        "Plan a 3-day heritage road trip from Bangalore"
      ];
    }

    res.json({
      reply,
      suggestedQuestions: suggestions,
      source: "general-intelligence-engine",
    });
  } catch (error: any) {
    console.error("Chat assistant error:", error);
    res.status(500).json({ error: error?.message || "Chat assistant error" });
  }
});

// Setup Vite or Static File serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Badami Circuit AI Guide Server listening on port ${PORT}`);
  });
}

startServer();
