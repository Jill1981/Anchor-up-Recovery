import React, { useState } from 'react';
import { Icons } from '../constants';
import { Sponsor, UserProfile } from '../types';

const MOCK_SPONSORS: Sponsor[] = [
  { id: 's1', name: 'Brother Caleb', avatarColor: 'bg-indigo-700', soberTime: '8 Years', specialty: ['Alcohol'], availability: 'High', bio: "Saved by grace in 2016. Here to help navigate the first 90 days." },
  { id: 's2', name: 'Sister Sarah', avatarColor: 'bg-emerald-700', soberTime: '12 Years', specialty: ['Narcotics'], availability: 'Medium', bio: "Mother of three, long-term recovery advocate. Walking through the fire." },
];

const SponsorMatch: React.FC<{ user: UserProfile, onSelectSponsor: (id: string) => void }> = ({ user, onSelectSponsor }) => {
  const [requestingId, setRequestingId] = useState<string | null>(null);

  const handleRequest = (id: string) => {
    setRequestingId(id);
    setTimeout(() => { onSelectSponsor(id); setRequestingId(null); }, 1500);
  };

  return (
    <div className="p-4 space-y-6 pb-24 overflow-y-auto h-full bg-slate-950 text-white">
      <div className="text-center space-y-2 py-4">
        <h2 className="text-2xl font-black">Find Your Sponsor</h2>
        <p className="text-sm text-slate-500 italic">"Steady in the storm together."</p>
      </div>
      <div className="space-y-4">
        {MOCK_SPONSORS.map(sponsor => {
          const isPending = user.pendingSponsorId === sponsor.id;
          return (
            <div key={sponsor.id} className="bg-slate-900 rounded-[32px] p-6 border border-slate-800 relative">
              {isPending && <div className="absolute top-4 right-4 bg-amber-900/50 text-amber-400 text-[8px] font-black px-2 py-1 rounded-full uppercase border border-amber-500/30">Pending</div>}
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl ${sponsor.avatarColor} flex items-center justify-center font-black`}>{sponsor.name[8]}</div>
                <div className="flex-1">
                  <h3 className="font-black text-sm">{sponsor.name}</h3>
                  <p className="text-[10px] text-sky-400 font-bold">{sponsor.soberTime} Sober</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed my-4">{sponsor.bio}</p>
              <button disabled={isPending || !!user.pendingSponsorId} onClick={() => handleRequest(sponsor.id)} className={`w-full font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest ${isPending ? 'bg-slate-800 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                {isPending ? 'Request Sent' : requestingId === sponsor.id ? '...' : 'Request Sponsorship'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SponsorMatch;