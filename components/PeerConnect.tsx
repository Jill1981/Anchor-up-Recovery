
import React, { useState } from 'react';
import { Icons } from '../constants';
import { UserProfile, View } from '../types';

const VOLUNTEERS = [
  { id: 'v1', name: 'Martha', title: 'Sister', soberYears: 12, status: 'Online', specialty: 'Grief & Recovery' },
  { id: 'v2', name: 'Robert', title: 'Brother', soberYears: 5, status: 'Online', specialty: 'Youth Support' },
  { id: 'v3', name: 'Sarah', title: 'Sister', soberYears: 8, status: 'In Call', specialty: 'Family Restoration' },
  { id: 'v4', name: 'Joe', title: 'Brother', soberYears: 22, status: 'Online', specialty: '12 Step Deep Dive' },
];

interface PeerConnectProps {
  user: UserProfile;
  onStartVideoCall: (volunteer: typeof VOLUNTEERS[0]) => void;
}

const PeerConnect: React.FC<PeerConnectProps> = ({ user, onStartVideoCall }) => {
  const [requestStatus, setRequestStatus] = useState<'idle' | 'requesting' | 'sent'>('idle');

  return (
    <div className="flex flex-col h-full bg-orange-950/10 overflow-y-auto pb-24">
      <div className="p-8 text-center bg-orange-900 text-white relative overflow-hidden">
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Human Fellowship</h2>
        <p className="text-orange-200 text-sm font-scriptural italic">"Bear one another's burdens." — Galatians 6:2</p>
      </div>

      <div className="p-6 space-y-8">
        <section className="bg-slate-900 rounded-[40px] p-8 shadow-sm border border-orange-900/30 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-600 text-white p-4 rounded-2xl shadow-lg animate-pulse-slow">
              <Icons.Phone />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tight">Anchor Peer Line</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available 9am - 9pm EST</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-orange-600/50 pl-4">
            "Sometimes you just need to hear a human voice. Our volunteers are sisters and brothers who have walked the road."
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => window.open('tel:18005550199')} className="bg-orange-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em]">Call Now</button>
            <button disabled={requestStatus !== 'idle'} onClick={() => {setRequestStatus('requesting'); setTimeout(() => setRequestStatus('sent'), 1500)}} className="bg-slate-800 text-orange-400 font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] border border-orange-900/30">{requestStatus === 'idle' ? 'Callback' : '...'}</button>
          </div>
        </section>

        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Online Volunteers</h3>
          {VOLUNTEERS.map((v) => (
            <div key={v.id} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col space-y-4 transition-all hover:bg-slate-800/50 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${v.title === 'Sister' ? 'bg-orange-600' : 'bg-indigo-900'}`}>{v.name[0]}</div>
                  <div>
                    <h4 className="font-black text-white text-sm">{v.title} {v.name}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{v.soberYears} Years • {v.specialty}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${v.status === 'Online' ? 'bg-green-500/10 text-green-500' : 'bg-slate-800 text-slate-600'}`}>
                  {v.status}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  disabled={v.status !== 'Online'} 
                  className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${v.status === 'Online' ? 'bg-slate-800 text-white hover:bg-slate-700 border border-white/5' : 'bg-slate-950 text-slate-700 cursor-not-allowed'}`}
                >
                  Text Chat
                </button>
                <button 
                  onClick={() => onStartVideoCall(v)}
                  disabled={v.status !== 'Online'} 
                  className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${v.status === 'Online' ? 'bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-600/20' : 'bg-slate-950 text-slate-700 cursor-not-allowed'}`}
                >
                  Video Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeerConnect;
