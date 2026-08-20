import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Midwife Connect Rwanda', timestamp: new Date().toISOString() });
  });

  // AI Midwife Connect Assistant endpoint
  app.post('/api/assistant', async (req, res) => {
    try {
      const { message, language = 'en', history = [] } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemPrompt = `You are the Midwife Connect Assistant for "Midwife Connect Rwanda" (Connecting Midwives, Empowering Families).
Your primary role is to provide accurate, evidence-based, compassionate educational information about:
- Maternal health, Antenatal Care (ANC), and Postnatal Care (PNC)
- Midwifery clinical skills, physiology, and emergency obstetric guidelines (following WHO and Rwanda Ministry of Health protocols)
- Newborn care, thermal protection, Kangaroo Mother Care (KMC), APGAR, breastfeeding, and Rwanda immunization schedules
- Sexual and reproductive health, family planning / contraception, menstrual health, and adolescent health
- Pharmacy considerations in maternal/newborn care (e.g. oxytocin, misoprostol, magnesium sulfate, iron/folic acid).

MANDATORY SAFETY & CLINICAL GUARDRAILS:
1. ALWAYS identify as an educational assistant and include a brief reminder that educational information does not replace professional clinical assessment or emergency obstetric care.
2. NEVER diagnose patients or prescribe specific individual medication dosages for active medical crises.
3. If the user mentions maternal or neonatal DANGER SIGNS (such as severe vaginal bleeding, severe headache with blurred vision/preeclampsia symptoms, convulsions, difficulty breathing, foul-smelling vaginal discharge, reduced fetal movement, infant lethargy, fever, or hypothermia):
   - Immediately emphasize the urgency of seeking immediate in-person evaluation at the nearest health center or hospital.
   - Mention verified Rwanda emergency resources: SAMU Ambulance (112 or 912), Police Emergency (112), National Health Line (114), and Isange One Stop Center (3029) for crisis support.
4. Language Requirement: Respond fluently in the requested user language (${language === 'rw' ? 'Kinyarwanda' : language === 'fr' ? 'French' : language === 'sw' ? 'Kiswahili' : 'English'}).
5. Keep explanations structured, warm, respectful, and easy to understand with clear bullet points where appropriate.`;

      if (!apiKey) {
        // High quality offline fallback responses for common queries if API key is not yet set
        const lowerMsg = message.toLowerCase();
        let fallbackText = '';

        if (lowerMsg.includes('danger') || lowerMsg.includes('sign') || lowerMsg.includes('ibimenyetso') || lowerMsg.includes('hatari')) {
          fallbackText = `⚠️ **Maternal & Pregnancy Danger Signs (Require Immediate Hospital Care):**
- **Vaginal bleeding** at any stage of pregnancy or heavy bleeding after birth
- **Severe headache**, visual disturbances (blurred vision, spots), or swelling of face/hands (Preeclampsia signs)
- **High fever** or chills
- **Severe abdominal or pelvic pain**
- **Decreased or absent fetal movements** after 24 weeks
- **Sudden gush of fluid (Water breaking)** before labor begins
- **Convulsions or seizures**

🚨 **Emergency Action in Rwanda:** Go immediately to your nearest Health Center or District Hospital. Call SAMU Ambulance: **112 / 912** or Rwanda Health Line: **114**.

*(Note: Midwife Connect Rwanda provides educational information and does not replace emergency medical care).*`;
        } else if (lowerMsg.includes('edd') || lowerMsg.includes('due date') || lowerMsg.includes('igihe cyo kubyara') || lowerMsg.includes('tarehe')) {
          fallbackText = `📅 **How to Calculate Estimated Date of Delivery (EDD):**
Using **Naegele's Rule**:
1. Take the **first day of your Last Normal Menstrual Period (LMP)**.
2. Add **1 year**.
3. Subtract **3 months**.
4. Add **7 days**.

*Example:* If your LMP was May 10, 2025:
- +1 year = May 10, 2026
- -3 months = February 10, 2026
- +7 days = **February 17, 2026**.

You can also use our interactive **EDD Calculator** in the Pregnancy Tools section on this platform!`;
        } else if (lowerMsg.includes('newborn') || lowerMsg.includes('uruhinja') || lowerMsg.includes('mchanga') || lowerMsg.includes('apgar')) {
          fallbackText = `👶 **Immediate Essential Newborn Care Principles:**
1. **Immediate Drying & Warmth:** Dry the baby thoroughly and place skin-to-skin on the mother's chest.
2. **Skin-to-Skin Contact:** Keeps the baby warm, promotes bonding, and stabilizes heart rate.
3. **Delayed Cord Clamping:** Wait 1–3 minutes before clamping to boost infant iron stores.
4. **Early Breastfeeding:** Initiate exclusive breastfeeding within the first hour of birth.
5. **Eye Care & Vitamin K & Chlorhexidine:** Protects against infection and bleeding disorders.

*Newborn Danger Signs:* Lethargy, inability to suckle, fever (>37.5°C) or cold (<36.5°C), chest indrawing, jaundice in first 24h. Seek urgent care immediately.`;
        } else {
          fallbackText = `Welcome to **Midwife Connect Rwanda** educational assistant!

I can help explain:
• Antenatal care schedules & nutrition
• Labor, delivery, and postpartum recovery
• Midwifery clinical skills & emergency obstetric care protocols
• Newborn care, thermal protection, and immunization
• Family planning and contraceptive options
• Sexual and reproductive health education for youth

*Please note: This assistant is for educational guidance only. In any medical emergency, please visit your nearest health facility or call SAMU (112).* How can I help your learning today?`;
        }

        return res.json({
          response: fallbackText,
          model: 'educational-knowledge-base',
          language,
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Prepare conversation history
      const formattedContents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          formattedContents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.4,
          topP: 0.9,
        },
      });

      const replyText = response.text || 'I apologize, I could not process that query. Please ask again or consult our learning modules.';

      return res.json({
        response: replyText,
        model: 'gemini-3.7-flash',
        language,
      });
    } catch (error: any) {
      console.error('Error in /api/assistant:', error);
      return res.status(500).json({
        error: 'Failed to generate assistant response',
        details: error?.message || 'Unknown server error',
      });
    }
  });

  // Contact endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message, role } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    // Record feedback receipt
    res.json({
      success: true,
      message: 'Thank you for reaching out to Midwife Connect Rwanda. Our clinical education team will review your message.',
      receivedAt: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static build for production
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
    console.log(`Midwife Connect Rwanda server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
