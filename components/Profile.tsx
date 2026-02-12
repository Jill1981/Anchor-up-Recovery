
import React from 'react';
import { UserProfile, View } from '../types';
import { Icons } from '../constants';

interface ProfileProps {
  user: UserProfile;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onNavigate, onLogout }) => {
  const daysSober = Math.floor((Date.now() - new Date(user.soberDate).getTime()) / (1000 * 60 * 60 * 24));
  
  const hasSponsor = !!user.assignedSponsorId;

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-gradient-to-b from-indigo-900/40 to-slate-950 relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-5"><span className="text-9xl font-black">👤</span></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-24 h-24 rounded-[32px] ${user.avatarColor} text-white flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-slate-800 mb-4 animate-in zoom-in duration-500`}>
            {user.name[0]?.toUpperCase()}
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight glow-text">{user.titlePrefix} {user.name}</h2>
          <p className="text-sky-400 text-xs font-black uppercase tracking-[0.2em] mt-1">Anchored Traveler</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dynamic Sponsorship CTA */}
        <div className="bg-slate-900 rounded-[40px] p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Icons.User />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                {hasSponsor ? "Your Journey Partner" : "Guided Recovery"}
              </h3>
              <p className="text-xs text-slate-500 font-medium px-4">
                {hasSponsor 
                  ? "Stay connected with your sponsor for strength and accountability."
                  : "Don't walk this path alone. Connect with a mentor who has been there."}
              </p>
            </div>
            
            <button 
              onClick={() => onNavigate(hasSponsor ? View.SPONSOR_CHAT : View.SPONSOR_MATCH)}
              className={`w-full py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 ${
                hasSponsor 
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white" 
                  : "bg-amber-600 hover:bg-amber-500 text-white"
              }`}
            >
              <span>{hasSponsor ? "Message My Sponsor" : "Find a Sponsor"}</span>
              <Icons.Sparkles />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-[32px] border border-slate-800 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Steady Days</p>
            <p className="text-3xl font-black text-sky-400">{daysSober}</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-[32px] border border-slate-800 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Journal Logs</p>
            <p className="text-3xl font-black text-indigo-400">{user.journalEntries.length}</p>
          </div>
        </div>

        {/* Info List */}
        <div className="bg-slate-900 rounded-[40px] p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between p-3 border-b border-slate-800/50">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Anchored Since</span>
            <span className="text-xs font-bold text-white">{new Date(user.soberDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 border-b border-slate-800/50">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Faith Mode</span>
            <span className="text-[10px] font-black px-2 py-1 bg-sky-900/30 text-sky-400 rounded-lg uppercase">Active</span>
          </div>
          <div className="flex items-center justify-between p-3">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fellowship Role</span>
             <span className="text-xs font-bold text-white">{user.isSponsor ? "Sponsor" : "Protégé"}</span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 border border-red-500/20 rounded-[24px] hover:bg-red-500/10 transition-colors"
        >
          Relinquish Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
