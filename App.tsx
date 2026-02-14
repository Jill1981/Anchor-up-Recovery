
import React, { useState, useEffect } from 'react';
import { View, UserProfile } from './types';
import { Icons } from './constants';
import VoiceSupport from './components/VoiceSupport';
import TextSupport from './components/TextSupport';
import Tools from './components/Tools';
import Resources from './components/Resources';
import PeerConnect from './components/PeerConnect';
import Outreach from './components/Outreach';
import Testimonies from './components/Testimonies';
import SponsorMatch from './components/SponsorMatch';
import Journal from './components/Journal';
import ScriptureBank from './components/ScriptureBank';
import Profile from './components/Profile';
import SponsorChat from './components/SponsorChat';
import Meetings from './components/Meetings';
import MeetingRoom from './components/MeetingRoom';
import VideoCall from './components/VideoCall';

const AnchorCrossIllustration = () => (
  <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
    <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] rounded-full"></div>
    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
      <path d="M12 2v14" />
      <path d="M9 5h6" />
      <path d="M5 12a7 7 0 0 0 14 0" />
      <path d="M12 19v3" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
      <path d="M11 2h2" />
      <circle cx="12" cy="2" r="1" />
    </svg>
    <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
    <div className="absolute bottom-10 left-6 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>
);

const INITIAL_USER: UserProfile = {
  name: '',
  titlePrefix: '',
  soberDate: new Date().toISOString(),
  bio: '',
  goals: [],
  journalEntries: [],
  remindersEnabled: true,
  faithMode: true,
  avatarColor: 'bg-indigo-900',
  isSponsor: false
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [activeCallPeer, setActiveCallPeer] = useState<{name: string, title: string} | null>(null);
  const [activeMeeting, setActiveMeeting] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ 
    name: '', 
    titlePrefix: 'Sister' as 'Sister' | 'Brother' | '', 
    soberDate: new Date().toISOString().split('T')[0] 
  });

  useEffect(() => {
    const saved = localStorage.getItem('anchor_up_recovery_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('anchor_up_recovery_user', JSON.stringify(updatedUser));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.name.trim()) return;
    saveUser({ 
      ...INITIAL_USER, 
      name: loginForm.name, 
      titlePrefix: loginForm.titlePrefix,
      soberDate: new Date(loginForm.soberDate).toISOString() 
    });
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out? Your local progress will be saved.")) {
      setUser(null);
    }
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Anchor Up Recovery',
      text: 'If you are struggling or in crisis, Anchor is here to support you. Find light in the darkness.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('App link copied to clipboard. Share it with someone in need!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const startVideoCall = (volunteer: any) => {
    setActiveCallPeer({ name: volunteer.name, title: volunteer.title });
    setCurrentView(View.VIDEO_CALL);
  };

  const handleJoinMeeting = (meeting: any) => {
    setActiveMeeting(meeting);
    setCurrentView(View.MEETING_ROOM);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#020617] flex flex-col items-center justify-center p-8 text-center space-y-10 animate-in fade-in duration-1000 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none anchor-splash-gradient"></div>
        <div className="space-y-6 relative z-10">
          <AnchorCrossIllustration />
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white font-display tracking-tight glow-text leading-tight uppercase">
              Anchor up <br/> Recovery
            </h1>
            <p className="text-sky-400 text-lg font-bold tracking-tight">"Finding light in the darkness"</p>
          </div>
          <div className="max-w-xs mx-auto">
            <p className="font-scriptural text-slate-400 text-sm italic leading-relaxed">
              "The light shines in the darkness, and the darkness has not overcome it."
              <br/>
              <span className="font-bold text-slate-500 mt-1 block tracking-wider uppercase">— John 1:5</span>
            </p>
          </div>
        </div>
        <form onSubmit={handleLogin} className="w-full space-y-4 glass p-8 rounded-[40px] shadow-2xl relative z-10">
          <div className="flex space-x-2">
            <div className="w-1/3 text-left space-y-1">
               <label className="text-[10px] font-black text-sky-400 uppercase tracking-widest ml-1">Title</label>
               <select className="w-full border-none bg-slate-900/50 text-white rounded-2xl px-4 py-4 focus:ring-2 focus:ring-sky-500 outline-none font-bold" value={loginForm.titlePrefix} onChange={(e) => setLoginForm({...loginForm, titlePrefix: e.target.value as any})}>
                 <option value="Sister">Sister</option>
                 <option value="Brother">Brother</option>
                 <option value="">None</option>
               </select>
            </div>
            <div className="w-2/3 text-left space-y-1">
              <label className="text-[10px] font-black text-sky-400 uppercase tracking-widest ml-1">First Name</label>
              <input required type="text" placeholder="Your name..." className="w-full border-none bg-slate-900/50 text-white rounded-2xl px-4 py-4 focus:ring-2 focus:ring-sky-500 outline-none font-bold placeholder:text-slate-600" value={loginForm.name} onChange={(e) => setLoginForm({...loginForm, name: e.target.value})} />
            </div>
          </div>
          <div className="text-left space-y-1">
            <label className="text-[10px] font-black text-sky-400 uppercase tracking-widest ml-1">Anchored Since</label>
            <input required type="date" className="w-full border-none bg-slate-900/50 text-white rounded-2xl px-4 py-4 focus:ring-2 focus:ring-sky-500 outline-none font-bold" value={loginForm.soberDate} onChange={(e) => setLoginForm({...loginForm, soberDate: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-sky-600 text-white font-black py-5 rounded-[24px] shadow-xl hover:bg-white hover:text-sky-950 transition-all transform active:scale-95 text-lg uppercase tracking-widest">Enter Fellowship</button>
        </form>
        <p className="text-[9px] text-slate-600 uppercase font-bold tracking-[0.3em] relative z-10">Hope for the Soul • Firm and Secure</p>
      </div>
    );
  }

  const daysSober = Math.floor((Date.now() - new Date(user.soberDate).getTime()) / (1000 * 60 * 60 * 24));

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start pt-8">
              <button onClick={() => setCurrentView(View.PROFILE)} className="flex items-center space-x-3 group">
                <div className={`w-14 h-14 rounded-2xl ${user.avatarColor} text-white flex items-center justify-center font-black shadow-xl border-4 border-slate-800 transition-transform group-hover:scale-105`}>
                  {user.name[0]?.toUpperCase()}
                </div>
                <div className="text-left">
                  <h1 className="text-xl font-black text-white">{user.titlePrefix} {user.name}</h1>
                  <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">View Profile</p>
                </div>
              </button>
            </div>

            <div className="bg-slate-900 rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden border border-sky-500/20">
                <div className="absolute top-0 right-0 p-8 opacity-10"><span className="text-9xl font-black">✝</span></div>
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-2">Steady Days</p>
                    <div className="flex items-baseline space-x-2">
                        <h4 className="text-7xl font-black tracking-tighter glow-text">{daysSober}</h4>
                        <span className="text-xl font-black text-sky-300 italic">Days</span>
                    </div>
                </div>
            </div>

            {/* Fellowship Integrated Tile */}
            <div className="bg-sky-900 rounded-[32px] p-6 border border-sky-500/30 flex flex-col space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-sky-600 rounded-2xl text-white shadow-lg animate-pulse-slow">🎥</div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white">Live Fellowship</h3>
                </div>
                <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-xl text-[8px] font-black tracking-widest animate-pulse">LIVE NOW</span>
              </div>
              <p className="text-[11px] text-sky-200/70 italic leading-relaxed font-medium">Daily Devotional with Sister Jill is currently in session. Join the room to connect with others.</p>
              <button 
                onClick={() => setCurrentView(View.MEETINGS)} 
                className="bg-white text-sky-950 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-sky-100 transition-all active:scale-95"
              >
                Go to Fellowship Hall
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-24">
              <button onClick={() => setCurrentView(View.PEER_CONNECT)} className="col-span-2 bg-orange-600 p-6 rounded-[32px] text-white shadow-xl flex items-center justify-between border border-orange-500/20">
                <div className="flex items-center space-x-4 text-left">
                  <div className="bg-white/20 p-4 rounded-2xl"><Icons.Phone /></div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight">Human Fellowship</h3>
                    <p className="text-[10px] opacity-70 font-bold uppercase tracking-tighter">Talk to a peer</p>
                  </div>
                </div>
                <span className="bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-black">24/7</span>
              </button>

              <button onClick={() => setCurrentView(View.JOURNAL)} className="col-span-1 bg-slate-900/50 p-6 rounded-[32px] text-white shadow-xl flex flex-col items-center justify-center border border-indigo-500/30 space-y-2">
                <div className="bg-white/10 p-3 rounded-2xl"><span className="text-lg">📓</span></div>
                <span className="font-black text-[9px] uppercase tracking-widest">Journal</span>
              </button>

              <button onClick={() => setCurrentView(View.SCRIPTURE_BANK)} className="col-span-1 bg-slate-900 p-6 rounded-[32px] text-white shadow-xl flex flex-col items-center justify-center border border-sky-500/20 space-y-2">
                <div className="bg-white/10 p-3 rounded-2xl"><span className="text-lg text-sky-400">📜</span></div>
                <span className="font-black text-[9px] uppercase tracking-widest">Verses</span>
              </button>

              <button onClick={() => setCurrentView(View.OUTREACH)} className="col-span-2 bg-emerald-950 p-6 rounded-[32px] text-white shadow-xl flex items-center justify-between border border-emerald-900/30">
                <div className="flex items-center space-x-4 text-left">
                  <div className="bg-white/10 p-4 rounded-2xl"><Icons.Heart /></div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-sm">Safe Harbor Mission</h3>
                    <p className="text-[9px] opacity-70 font-bold uppercase tracking-tighter">Support street outreach</p>
                  </div>
                </div>
                <span className="text-xs">⚓</span>
              </button>

              <button onClick={() => setCurrentView(View.VOICE_SUPPORT)} className="bg-slate-800 p-6 rounded-[32px] border border-slate-700 flex flex-col items-center justify-center space-y-2">
                <Icons.Mic />
                <span className="font-black text-[9px] uppercase tracking-widest">AI Support</span>
              </button>

              <button onClick={() => setCurrentView(View.TESTIMONIES)} className="bg-slate-800 p-6 rounded-[32px] border border-slate-700 flex flex-col items-center justify-center space-y-2">
                <Icons.Users />
                <span className="font-black text-[9px] uppercase tracking-widest">Broken Chains</span>
              </button>
            </div>
          </div>
        );
      case View.VOICE_SUPPORT: return <VoiceSupport />;
      case View.TEXT_SUPPORT: return <TextSupport />;
      case View.TOOLS: return <Tools />;
      case View.RESOURCES: return <Resources />;
      case View.PEER_CONNECT: return <PeerConnect user={user} onStartVideoCall={startVideoCall} />;
      case View.OUTREACH: return <Outreach />;
      case View.TESTIMONIES: return <Testimonies user={user} />;
      case View.SPONSOR_MATCH: return <SponsorMatch user={user} onSelectSponsor={(id) => saveUser({...user, pendingSponsorId: id})} />;
      case View.SPONSOR_CHAT: return <SponsorChat user={user} />;
      case View.JOURNAL: return <Journal user={user} onUpdateEntries={(entries) => saveUser({...user, journalEntries: entries})} />;
      case View.SCRIPTURE_BANK: return <ScriptureBank user={user} onUpdateEntries={(entries) => saveUser({...user, journalEntries: entries})} />;
      case View.PROFILE: return <Profile user={user} onNavigate={setCurrentView} onLogout={handleLogout} />;
      case View.MEETINGS: return <Meetings onJoinMeeting={handleJoinMeeting} />;
      case View.MEETING_ROOM: return <MeetingRoom meetingTitle={activeMeeting?.title || "Fellowship Hall"} onLeave={() => setCurrentView(View.MEETINGS)} />;
      case View.VIDEO_CALL: return activeCallPeer ? <VideoCall peerName={activeCallPeer.name} peerTitle={activeCallPeer.title} onEnd={() => setCurrentView(View.PEER_CONNECT)} /> : null;
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-slate-950 relative overflow-hidden shadow-2xl border-x border-slate-800">
      <div className="absolute top-0 w-full bg-black px-4 py-1.5 text-[8px] text-white text-center font-black z-40 uppercase tracking-[0.4em] border-b border-sky-900/30">
        Anchor up Recovery • Founded by Sister Jill Demoran
      </div>
      {currentView !== View.HOME && currentView !== View.VIDEO_CALL && currentView !== View.MEETING_ROOM && (
        <header className="p-4 flex items-center glass sticky top-0 z-20 mt-8">
          <button onClick={() => setCurrentView(View.HOME)} className="p-3 hover:bg-slate-800 rounded-2xl transition-colors text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="ml-4 font-black text-white text-lg uppercase tracking-tight">{currentView.replace('_', ' ').toLowerCase()}</h2>
        </header>
      )}
      <main className={`flex-1 overflow-y-auto ${currentView === View.HOME || currentView === View.VIDEO_CALL || currentView === View.MEETING_ROOM ? 'mt-8' : ''}`}>
        {renderView()}
      </main>
      {currentView !== View.VIDEO_CALL && currentView !== View.MEETING_ROOM && (
        <nav className="glass border-t border-slate-800 p-4 flex justify-around items-center sticky bottom-0 z-30 pb-8">
          <button onClick={() => setCurrentView(View.HOME)} className={`flex flex-col items-center space-y-1 ${currentView === View.HOME ? 'text-sky-400' : 'text-slate-600'}`}>
            <Icons.Home />
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </button>
          <button onClick={() => setCurrentView(View.JOURNAL)} className={`flex flex-col items-center space-y-1 ${currentView === View.JOURNAL ? 'text-sky-400' : 'text-slate-600'}`}>
            <span className="text-xl">📓</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Journal</span>
          </button>
          <button onClick={() => setCurrentView(View.PEER_CONNECT)} className={`flex flex-col items-center space-y-1 ${currentView === View.PEER_CONNECT ? 'text-sky-400' : 'text-slate-600'}`}>
            <Icons.Users />
            <span className="text-[8px] font-black uppercase tracking-widest">Fellowship</span>
          </button>
          <button onClick={() => setCurrentView(View.PROFILE)} className={`flex flex-col items-center space-y-1 ${currentView === View.PROFILE ? 'text-sky-400' : 'text-slate-600'}`}>
            <Icons.User />
            <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
          </button>
        </nav>
      )}
      <div className="absolute top-0 w-full bg-yellow-950/20 px-4 py-1 text-[8px] text-yellow-500 text-center z-40">
        Companion. Not a medical replacement. In danger? Call 988.
      </div>
    </div>
  );
};

export default App;
