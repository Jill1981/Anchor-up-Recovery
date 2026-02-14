
import React, { useState } from 'react';
import { Icons } from '../constants';
import TwelveSteps from './TwelveSteps';

interface Meeting {
  id: string;
  title: string;
  time: string;
  type: 'AA' | 'NA' | 'Faith-Based' | 'Women Only' | 'Men Only';
  host: string;
  description: string;
  isLive?: boolean;
}

const UPCOMING_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Daily Bread Morning Devotional',
    time: 'Happening Now',
    type: 'Faith-Based',
    host: 'Sister Jill',
    description: 'A morning check-in to start the day with prayer and scripture.',
    isLive: true
  },
  {
    id: 'm2',
    title: 'New Horizons Step 1 Study',
    time: 'Today, 2:00 PM EST',
    type: 'AA',
    host: 'Brother Mike',
    description: 'Deep dive into Powerlessness and Unmanageability.'
  },
  {
    id: 'm3',
    title: 'Late Night Safe Harbor SOS',
    time: 'Tonight, 11:30 PM EST',
    type: 'Faith-Based',
    host: 'Brother Caleb',
    description: 'A drop-in meeting for those struggling with insomnia or late-night cravings.'
  }
];

interface MeetingsProps {
  onJoinMeeting: (meeting: Meeting) => void;
}

const Meetings: React.FC<MeetingsProps> = ({ onJoinMeeting }) => {
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'STEP_STUDY'>('SCHEDULE');

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white">
      {/* Tab Header */}
      <div className="p-4 bg-slate-900/50 border-b border-white/5">
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('SCHEDULE')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SCHEDULE' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Live Schedule
          </button>
          <button 
            onClick={() => setActiveTab('STEP_STUDY')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'STEP_STUDY' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Step Studies
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'SCHEDULE' ? (
          <div className="p-6 space-y-6">
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
               <div className="relative z-10 space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">Safe Harbor Live</h3>
                  <p className="text-xs text-emerald-400 font-bold">Community is your greatest defense.</p>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Icons.Users /></div>
            </div>

            <div className="space-y-4 pb-24">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Upcoming Fellowship</h3>
              {UPCOMING_MEETINGS.map((meeting) => (
                <div key={meeting.id} className={`bg-slate-900 rounded-[32px] p-6 border transition-all flex flex-col ${
                  meeting.isLive ? 'border-sky-500 shadow-2xl scale-[1.02]' : 'border-slate-800 opacity-90'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      meeting.type === 'Faith-Based' ? 'bg-indigo-900 text-indigo-400' : 'bg-sky-900 text-sky-400'
                    }`}>
                      {meeting.type}
                    </span>
                    <span className={`text-[10px] font-bold ${meeting.isLive ? 'text-sky-400 animate-pulse' : 'text-slate-500'}`}>
                      {meeting.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-black mb-1">{meeting.title}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Host: {meeting.host}</p>
                  
                  <p className="text-xs text-slate-500 italic mb-6 leading-relaxed">"{meeting.description}"</p>
                  
                  <button 
                    onClick={() => onJoinMeeting(meeting)}
                    className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg ${
                      meeting.isLive ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                    <span>{meeting.isLive ? 'Enter Room' : 'Set Reminder'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <TwelveSteps />
        )}
      </div>
    </div>
  );
};

export default Meetings;
