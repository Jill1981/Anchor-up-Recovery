import React, { useState } from 'react';
import { Icons } from '../constants';
import { Testimony, UserProfile } from '../types';

const MOCK_TESTIMONIES: Testimony[] = [
  { id: 't1', userName: 'Brother James', title: 'From Darkness to Light', content: 'I spent 15 years lost in addiction. Today, through Jesus Christ, I am 2 years clean.', category: 'Substances', praiseCount: 124, timestamp: Date.now() },
  { id: 't2', userName: 'Sister Anna', title: 'Restored Identity', content: 'He has restored my soul and shown me my true purpose.', category: 'Other', praiseCount: 89, timestamp: Date.now() }
];

const Testimonies: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [testimonies, setTestimonies] = useState(MOCK_TESTIMONIES);

  const handleShare = async (testimony: Testimony) => {
    const text = `Read this victory from ${testimony.userName}: "${testimony.content}"`;
    if (navigator.share) await navigator.share({ title: testimony.title, text, url: window.location.href });
    else window.location.href = `mailto:?subject=${testimony.title}&body=${text}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center space-y-4 bg-slate-900 relative overflow-hidden border-b border-sky-900/30">
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text leading-tight">Broken Chains</h2>
        <p className="text-sky-300 text-sm italic">"As iron sharpens iron..." — Proverbs 27:17</p>
      </div>
      <div className="p-4 space-y-4">
        {testimonies.map(t => (
          <div key={t.id} className="bg-slate-900 rounded-[32px] p-6 border border-slate-800 shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{t.category}</span>
              <span className="text-[10px] text-slate-500 font-bold">Today</span>
            </div>
            <h3 className="text-lg font-black mb-3">{t.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-sky-500/50 pl-4 mb-6">"{t.content}"</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs font-black text-slate-500">by {t.userName}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleShare(t)} className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-sky-400"><Icons.Share /></button>
                <button className="flex items-center space-x-2 bg-sky-900/30 text-sky-400 px-4 py-2 rounded-xl text-xs font-black">🙌 {t.praiseCount}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonies;