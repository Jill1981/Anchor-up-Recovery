import React, { useState, useMemo } from 'react';
import { Icons } from '../constants';
import { JournalEntry, UserProfile } from '../types';

type ScriptureCategory = 'Promises' | 'Comfort' | 'Strength' | 'Guidance';

interface Verse {
  id: string;
  reference: string;
  text: string;
  category: ScriptureCategory;
}

interface ScriptureBankProps {
  user: UserProfile;
  onUpdateEntries: (entries: JournalEntry[]) => void;
}

const VERSES: Verse[] = [
  {
    id: 'v1',
    category: 'Promises',
    reference: 'Jeremiah 29:11',
    text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."'
  },
  {
    id: 'v2',
    category: 'Strength',
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.'
  },
  {
    id: 'v3',
    category: 'Comfort',
    reference: 'Psalm 23:4',
    text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.'
  },
  {
    id: 'v4',
    category: 'Guidance',
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'
  },
  {
    id: 'v5',
    category: 'Strength',
    reference: 'Isaiah 40:31',
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'
  },
  {
    id: 'v6',
    category: 'Comfort',
    reference: 'Matthew 11:28',
    text: 'Come to me, all you who are weary and burdened, and I will give you rest.'
  },
  {
    id: 'v7',
    category: 'Promises',
    reference: 'Joshua 1:9',
    text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.'
  },
  {
    id: 'v8',
    category: 'Guidance',
    reference: 'Psalm 119:105',
    text: 'Your word is a lamp for my feet, a light on my path.'
  }
];

const CATEGORIES: ScriptureCategory[] = ['Promises', 'Comfort', 'Strength', 'Guidance'];

const ScriptureBank: React.FC<ScriptureBankProps> = ({ user, onUpdateEntries }) => {
  const [activeCategory, setActiveCategory] = useState<ScriptureCategory | 'All'>('All');
  const [reflections, setReflections] = useState<{ [key: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const filteredVerses = useMemo(() => {
    if (activeCategory === 'All') return VERSES;
    return VERSES.filter(v => v.category === activeCategory);
  }, [activeCategory]);

  const handleCopy = (text: string, reference: string) => {
    navigator.clipboard.writeText(`${text} — ${reference}`);
    alert('Verse copied to clipboard');
  };

  const handleReflectionChange = (verseId: string, text: string) => {
    setReflections(prev => ({ ...prev, [verseId]: text }));
  };

  const saveReflection = (verse: Verse) => {
    const text = reflections[verse.id];
    if (!text || !text.trim()) return;

    setSavingId(verse.id);

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text: `Reflection on ${verse.reference}:\n${text}`,
      mood: 'Grateful',
      timestamp: Date.now()
    };

    setTimeout(() => {
      onUpdateEntries([newEntry, ...user.journalEntries]);
      setReflections(prev => ({ ...prev, [verse.id]: '' }));
      setSavingId(null);
      alert('Reflection saved to your Recovery Log');
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-indigo-950 relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute top-0 left-0 p-8 opacity-5"><span className="text-9xl font-black italic">✝</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Scripture Bank</h2>
        <p className="text-indigo-200 text-sm font-scriptural italic">"Man shall not live by bread alone..." — Matthew 4:4</p>
      </div>

      <div className="p-4 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10 border-b border-white/5">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
              activeCategory === 'All' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                activeCategory === cat ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {filteredVerses.map((verse) => (
          <div key={verse.id} className="bg-slate-900 rounded-[32px] p-8 border border-slate-800 shadow-xl group hover:border-sky-500/30 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-black text-sky-400 uppercase tracking-[0.3em]">{verse.category}</span>
              <button 
                onClick={() => handleCopy(verse.text, verse.reference)}
                className="text-slate-600 hover:text-white transition-colors p-1"
              >
                <Icons.Share />
              </button>
            </div>
            
            <p className="font-scriptural text-xl italic text-slate-100 leading-relaxed mb-6">
              {verse.text}
            </p>
            
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 mb-6">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{verse.reference}</p>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sky-500 opacity-50">
                <Icons.Sparkles />
              </div>
            </div>

            {/* Reflection Area */}
            <div className="bg-slate-950/50 rounded-2xl p-4 border border-indigo-500/10 space-y-3">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Personal Reflection</p>
              <p className="text-[11px] text-slate-400 italic">How does this verse apply to your current situation?</p>
              <textarea
                value={reflections[verse.id] || ''}
                onChange={(e) => handleReflectionChange(verse.id, e.target.value)}
                placeholder="Write your heart here..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-700 outline-none focus:border-indigo-500 transition-colors min-h-[80px] resize-none"
              />
              <button
                onClick={() => saveReflection(verse)}
                disabled={!reflections[verse.id]?.trim() || savingId === verse.id}
                className="w-full bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-20 flex items-center justify-center space-x-2"
              >
                {savingId === verse.id ? (
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Save to Log</span>
                )}
              </button>
            </div>
          </div>
        ))}

        {filteredVerses.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <span className="text-6xl">📜</span>
            <p className="font-black text-[10px] uppercase tracking-widest mt-4">Searching the scrolls...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptureBank;