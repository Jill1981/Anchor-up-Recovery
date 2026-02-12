
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { UserProfile, Message } from '../types';

interface SponsorChatProps {
  user: UserProfile;
}

const SponsorChat: React.FC<SponsorChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'other',
      senderName: 'Sponsor',
      text: "Peace be with you. How is your heart today?",
      timestamp: Date.now() - 1000 * 60 * 60
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulated reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        senderName: 'Sponsor',
        text: "I hear you. Remember, the storm passes but the anchor holds. Keep breathing through it.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white relative">
      <div className="p-4 bg-slate-900/50 border-b border-white/5 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black">S</div>
        <div>
          <h3 className="font-black text-sm uppercase tracking-tight">Sponsor Connection</h3>
          <p className="text-[8px] text-green-500 font-black uppercase tracking-widest flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> Available for Guidance
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 mx-2">
              {msg.sender === 'user' ? 'You' : msg.senderName}
            </span>
            <div className={`max-w-[80%] p-5 rounded-[28px] text-sm leading-relaxed shadow-lg ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-950 border-t border-white/5 pb-24">
        <div className="flex space-x-3 bg-slate-900 p-2 rounded-[32px] border border-white/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Speak your truth..."
            className="flex-1 bg-transparent border-none px-4 py-2 focus:outline-none text-sm placeholder:text-slate-600"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-500 transition-all shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorChat;
