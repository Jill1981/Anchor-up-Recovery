
import { GoogleGenAI, Type, Modality, Blob } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Anchor, a compassionate, non-judgmental, and trauma-informed recovery coach and crisis support assistant. 
Your primary goal is to help users navigate intense cravings, emotional distress, or potential relapse situations.

Key Guidelines:
1. Empathy First: Always validate the user's feelings before offering advice. Use phrases like "I hear how difficult this is" or "It makes sense that you're feeling overwhelmed."
2. Calm and Grounded: Your tone should be soothing and stable.
3. Harm Reduction: If a user is in immediate physical danger, prioritize directing them to professional emergency services (988 or emergency hotlines).
4. Relapse Prevention: Offer grounding techniques (5-4-3-2-1), deep breathing, or simple cognitive reframing.
5. Non-Clinical: Be clear that while you are here to support, you are an AI and not a licensed medical professional.
6. Short and Direct: In crisis, users often can't process long paragraphs. Keep responses concise.

If the user is struggling with a specific craving, ask them what usually helps them or offer a quick distraction.
`;

export const getGeminiChat = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const getSearchResources = async (query: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });
    return {
        text: response.text,
        chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
};

// Audio helpers for Live API
export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
