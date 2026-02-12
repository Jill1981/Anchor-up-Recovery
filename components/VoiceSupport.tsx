
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { createPcmBlob, decode, decodeAudioData } from '../services/gemini';
import { Icons } from '../constants';

const VoiceSupport: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
        // Assume session cleanup
    }
    setIsActive(false);
    setIsConnecting(false);
    
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    
    audioContextRef.current = null;
    outputAudioContextRef.current = null;
  }, []);

  const startSession = async () => {
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = inputCtx;
    outputAudioContextRef.current = outputCtx;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.outputTranscription) {
                setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }
          },
          onerror: (e) => console.error('Live Error:', e),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are Anchor, a calm recovery companion. Speak softly, empathetically, and help the user feel safe. Focus on grounding them in the present moment."
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start voice session', err);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8 h-full">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-3xl font-bold text-gray-800">Voice Support</h2>
        <p className="text-gray-600">
          Talk to Anchor anytime you feel a craving or just need someone to listen. This is a private, safe space.
        </p>
      </div>

      <div className="relative">
        <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isActive ? 'border-blue-500 animate-pulse-slow' : 'border-gray-200'}`}>
             <button
              onClick={isActive ? stopSession : startSession}
              disabled={isConnecting}
              className={`p-8 rounded-full transition-all transform active:scale-95 ${isActive ? 'bg-red-500 text-white shadow-lg' : 'bg-blue-600 text-white shadow-xl hover:bg-blue-700'}`}
            >
              {isConnecting ? (
                 <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isActive ? (
                <Icons.X />
              ) : (
                <Icons.Mic />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md h-32 overflow-y-auto text-center px-4">
        {isActive ? (
          <p className="text-gray-500 italic text-sm animate-pulse">Anchor is listening...</p>
        ) : (
          <p className="text-gray-400 text-sm">Tap the button to start talking</p>
        )}
      </div>

      <div className="text-xs text-gray-400 text-center uppercase tracking-widest font-semibold">
        Secure & Encrypted Voice Channel
      </div>
    </div>
  );
};

export default VoiceSupport;
