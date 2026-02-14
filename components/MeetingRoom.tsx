
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

interface Participant {
  name: string;
  role: string;
  color: string;
  isSpeaking?: boolean;
}

const MOCK_PARTICIPANTS: Participant[] = [
  { name: 'Sister Jill', role: 'Host', color: 'bg-indigo-600', isSpeaking: true },
  { name: 'Brother Mike', role: 'Peer', color: 'bg-emerald-600' },
  { name: 'Sister Anna', role: 'Peer', color: 'bg-amber-600' },
  { name: 'Robert P.', role: 'Peer', color: 'bg-rose-600' },
  { name: 'Sarah W.', role: 'Peer', color: 'bg-sky-600' },
  { name: 'Joe M.', role: 'Peer', color: 'bg-slate-700' },
];

interface MeetingRoomProps {
  meetingTitle: string;
  onLeave: () => void;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ meetingTitle, onLeave }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState('Sister Jill');
  const [messages, setMessages] = useState([
    { user: 'Sister Jill', text: 'Welcome everyone. We are starting in 2 minutes.' },
    { user: 'Brother Mike', text: 'Glad to be here today.' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = MOCK_PARTICIPANTS[Math.floor(Math.random() * MOCK_PARTICIPANTS.length)].name;
      setActiveSpeaker(next);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col font-display animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-4 bg-black/40 backdrop-blur-md flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-white font-black uppercase tracking-tight text-xs">{meetingTitle}</h2>
        </div>
        <button onClick={onLeave} className="bg-red-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors">Leave</button>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-3 gap-3 overflow-hidden">
        {MOCK_PARTICIPANTS.map((p) => (
          <div key={p.name} className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 ${activeSpeaker === p.name ? 'border-sky-500 ring-4 ring-sky-500/20' : 'border-white/5'}`}>
            <div className={`w-full h-full ${p.color} flex items-center justify-center`}>
              <span className="text-4xl font-black text-white/20">{p.name[0]}</span>
              {activeSpeaker === p.name && (
                <div className="absolute top-4 right-4 flex space-x-1">
                  <div className="w-1 h-3 bg-sky-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-5 bg-sky-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-3 bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <p className="text-[10px] font-black text-white uppercase truncate">{p.name}</p>
              <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest">{p.role}</p>
            </div>
          </div>
        ))}

        {/* Local Preview */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500 bg-slate-900 flex items-center justify-center">
          {isVideoOff ? (
             <div className="text-center">
                <span className="text-2xl font-black text-indigo-500">YOU</span>
             </div>
          ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center">
                <span className="text-xs text-indigo-400 font-black uppercase tracking-widest">Video Active</span>
             </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 bg-indigo-950/80 backdrop-blur-md p-2 rounded-xl border border-indigo-500/30">
            <p className="text-[10px] font-black text-white uppercase">You</p>
          </div>
        </div>
      </div>

      {/* Chat Sidebar Overlay (Mobile Style) */}
      <div className="h-32 bg-black/20 p-4 border-t border-white/5 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="flex space-x-2 text-[10px]">
            <span className="font-black text-sky-400 uppercase tracking-widest">{m.user}:</span>
            <span className="text-white/70">{m.text}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-slate-950 p-6 pb-12 flex justify-center items-center space-x-6 border-t border-white/5">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-white/5 text-white border border-white/10'}`}
        >
          {isMuted ? <Icons.X /> : <Icons.Mic />}
        </button>
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-white/5 text-white border border-white/10'}`}
        >
          {isVideoOff ? <Icons.X /> : <Icons.Mic />}
        </button>
        <div className="h-8 w-px bg-white/10"></div>
        <button className="bg-white/5 text-white p-3 rounded-2xl border border-white/10"><Icons.Share /></button>
        <button className="bg-white/5 text-white p-3 rounded-2xl border border-white/10">👋</button>
      </div>
    </div>
  );
};

export default MeetingRoom;
