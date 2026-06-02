const API_KEY = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `You are FitFeky AI, a premium women's fitness and wellness coach.

RULES:
- Warm, supportive, encouraging tone — like a knowledgeable friend
- Keep responses SHORT: 2-4 sentences maximum
- Give practical, actionable advice
- Never judge, never shame, always empower
- Focus on women's wellness: weight loss, yoga, nutrition, motivation, stress management
- End every response with a brief follow-up question
- If you don't know something specific, guide the user to what FitFeky offers (quiz, calculators, blog)
- NEVER use emojis
- NEVER mention you are an AI or language model
- NEVER provide medical advice — suggest consulting a professional when appropriate`;

export interface ChatHistoryEntry {
  role: 'user' | 'model';
  text: string;
}

export interface GeminiResponse {
  content: string;
  error?: string;
}

export async function generateGeminiResponse(
  userMessage: string,
  history: ChatHistoryEntry[],
  userContext?: { name?: string; archetype?: string; goal?: string }
): Promise<GeminiResponse> {
  if (!API_KEY || API_KEY === 'AIzaSyDdHWJyxv0ZR5-aroLLrXJRWjj8YDdhPmY') {
    return { content: '', error: 'No API key configured' };
  }

  const contents = [
    {
      role: 'user',
      parts: [{ text: history.length > 0
        ? `The user's context: Name=${userContext?.name || 'unknown'}, Archetype=${userContext?.archetype || 'unknown'}, Goal=${userContext?.goal || 'unknown'}. Previous conversation:\n${history.map(h => `${h.role === 'user' ? 'User' : 'You'}: ${h.text}`).join('\n')}\n\nUser's new message: ${userMessage}`
        : `The user's context: Name=${userContext?.name || 'unknown'}, Archetype=${userContext?.archetype || 'unknown'}, Goal=${userContext?.goal || 'unknown'}. User's message: ${userMessage}`
      }]
    }
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 256,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return { content: '', error: `API error: ${response.status} ${errText}` };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return { content: '', error: 'Empty response from API' };
    }

    return { content: text };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { content: '', error: message };
  }
}
