
import React, { useState, useMemo } from 'react';
import { Icons } from '../constants';
import { JournalEntry, UserProfile } from '../types';

interface JournalProps {
  user: UserProfile;
  onUpdateEntries: (entries: JournalEntry[]) => void;
}

const MOODS = [
  { emoji: '☀️', label: 'Peaceful', color: 'bg-yellow-500' },
  { emoji: '💪', label: 'Strong', color: 'bg-emerald-500' },
  { emoji: '☁️', label: 'Struggling', color: 'bg-slate-500' },
  { emoji: '🌪️', label: 'In Crisis', color: 'bg-red-500' },
  { emoji: '🙏', label: 'Grateful', color: 'bg-indigo-500' }
];

const REFLECTION_PROMPTS = [
  "What was your biggest victory today, no matter how small?",
  "Who did you connect with today that helped you stay anchored?",
  "What is one thing you're letting go of tonight?",
  "Where did you see Grace in your life today?",
  "If today was a storm, how did your anchor hold?",
  "What are you most looking forward to in your recovery tomorrow?"
];

const Journal: React.FC<JournalProps> = ({ user, onUpdateEntries }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [entryText, setEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  const [filterMood, setFilterMood] = useState<string | 'All'>('All');
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);

  const handleSave = () => {
    if (!entryText.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text: entryText,
      mood: selectedMood,
      timestamp: Date.now()
    };
    onUpdateEntries([newEntry, ...user.journalEntries]);
    setEntryText('');
    setIsWriting(false);
  };

  const nextPrompt = () => {
    setCurrentPromptIdx((prev) => (prev + 1) % REFLECTION_PROMPTS.length);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEntries = useMemo(() => {
    if (filterMood === 'All') return user.journalEntries;
    return user.journalEntries.filter(e => e.mood === filterMood);
  }, [user.journalEntries, filterMood]);

  const pastReflection = useMemo(() => {
    if (user.journalEntries.length < 2) return null;
    // Show an entry from at least 3 days ago if exists
    const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
    const olderEntries = user.journalEntries.filter(e => e.timestamp < threeDaysAgo);
    if (olderEntries.length === 0) return null;
    return olderEntries[Math.floor(Math.random() * olderEntries.length)];
  }, [user.journalEntries]);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-indigo-900/40 relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-5"><span className="text-9xl font-black">📖</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Recovery Log</h2>
        <p className="text-indigo-200 text-sm font-scriptural italic">"Reflect on where you've been to see where you're going."</p>
        
        {!isWriting && (
          <button 
            onClick={() => {
              setIsWriting(true);
              setCurrentPromptIdx(Math.floor(Math.random() * REFLECTION_PROMPTS.length));
            }}
            className="mt-6 bg-indigo-600 text-white font-black py-4 px-10 rounded-[24px] shadow-xl hover:bg-white hover:text-indigo-950 transition-all transform active:scale-95 text-xs uppercase tracking-widest border border-indigo-400/30"
          >
            Log Today's Walk
          </button>
        )}
      </div>

      <div className="p-6 space-y-8">
        {isWriting ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="bg-slate-900 rounded-[40px] p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 blur-[40px] rounded-full"></div>
              
              <div className="flex justify-between items-start mb-6">
                 <div className="space-y-1">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-400">Reflection Prompt</h3>
                    <p className="text-sm font-bold text-white leading-tight italic">"{REFLECTION_PROMPTS[currentPromptIdx]}"</p>
                 </div>
                 <button onClick={nextPrompt} className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                 </button>
              </div>

              <div className="flex justify-between mb-8 overflow-x-auto pb-2 scrollbar-hide space-x-2">
                {MOODS.map(m => (
                  <button 
                    key={m.label}
                    onClick={() => setSelectedMood(m.label)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-[24px] transition-all shrink-0 min-w-[70px] ${selectedMood === m.label ? 'bg-indigo-600 scale-105 shadow-lg' : 'bg-slate-800 opacity-40'}`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-[8px] font-black uppercase tracking-tighter">{m.label}</span>
                  </button>
                ))}
              </div>

              <textarea 
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="Spill your heart here... what's on your mind?"
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-[24px] p-5 text-sm font-medium outline-none focus:border-indigo-500 min-h-[220px] text-white placeholder:text-slate-700 transition-colors"
              />

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setIsWriting(false)}
                  className="flex-1 bg-slate-800 text-slate-400 font-black py-4 rounded-[20px] text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!entryText.trim()}
                  className="flex-[2] bg-indigo-600 text-white font-black py-4 rounded-[20px] shadow-xl hover:bg-black transition-all transform active:scale-95 text-xs uppercase tracking-widest disabled:opacity-30"
                >
                  Seal Entry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Reflection Corner: Look back at where you were */}
            {pastReflection && (
              <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 rounded-[40px] p-8 border border-indigo-500/20 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><span className="text-6xl">🕰️</span></div>
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Looking Back: {formatDate(pastReflection.timestamp)}</h3>
                <p className="text-sm text-slate-300 italic line-clamp-3 leading-relaxed">"{pastReflection.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                      <span className="text-lg">{MOODS.find(m => m.label === pastReflection.mood)?.emoji}</span>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Feeling {pastReflection.mood} then</span>
                   </div>
                   <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">See how far you've come</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">History</h3>
                <div className="flex space-x-2">
                  <select 
                    value={filterMood} 
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="bg-slate-900 border-none rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 outline-none"
                  >
                    <option value="All">All Moods</option>
                    {MOODS.map(m => <option key={m.label} value={m.label}>{m.emoji} {m.label}</option>)}
                  </select>
                </div>
              </div>

              {filteredEntries.length === 0 ? (
                <div className="text-center py-20 space-y-4 opacity-20">
                  <span className="text-6xl">🖋️</span>
                  <p className="font-black text-[10px] uppercase tracking-widest">No matching entries found.</p>
                </div>
              ) : (
                filteredEntries.map((entry, idx) => {
                  const moodData = MOODS.find(m => m.label === entry.mood);
                  return (
                    <div key={entry.id} className="bg-slate-900 rounded-[32px] p-6 border border-slate-800 shadow-xl group transition-all hover:border-indigo-500/40 relative">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{formatDate(entry.timestamp)}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-lg">{moodData?.emoji}</span>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{entry.mood}</span>
                          </div>
                        </div>
                        {idx === 0 && filterMood === 'All' && (
                          <span className="bg-indigo-900/50 text-indigo-400 text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter ring-1 ring-indigo-500/20">Today's Log</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                        {entry.text}
                      </p>
                      
                      <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Anchored Thought</span>
                         <div className="text-indigo-500/50"><Icons.Sparkles /></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Journal;
