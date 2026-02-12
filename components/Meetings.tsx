
import React from 'react';
import { Icons } from '../constants';

interface Meeting {
  id: string;
  title: string;
  time: string;
  type: 'AA' | 'NA' | 'Faith-Based' | 'Women Only' | 'Men Only';
  host: string;
  description: string;
}

const UPCOMING_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Daily Bread Morning Devotional',
    time: 'Today, 8:00 AM EST',
    type: 'Faith-Based',
    host: 'Sister Jill',
    description: 'A morning check-in to start the day with prayer and scripture.'
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
  },
  {
    id: 'm4',
    title: 'Sisters in Sobriety',
    time: 'Tomorrow, 10:00 AM EST',
    type: 'Women Only',
    host: 'Sister Sarah',
    description: 'A safe space for women to share their journey and strength.'
  }
];

const Meetings: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-sky-950/40 relative overflow-hidden border-b border-sky-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-5"><span className="text-9xl font-black italic">🎥</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Zoom Fellowship</h2>
        <p className="text-sky-200 text-sm font-scriptural italic">"Where two or three are gathered..." — Matthew 18:20</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-4 flex items-center space-x-4 mb-4">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg">
            <Icons.Calendar />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Next Meeting</h4>
            <p className="text-sm font-bold text-white">Morning Devotional starts in 15m</p>
          </div>
        </div>

        {UPCOMING_MEETINGS.map((meeting) => (
          <div key={meeting.id} className="bg-slate-900 rounded-[32px] p-6 border border-slate-800 shadow-xl group hover:border-sky-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                meeting.type === 'Faith-Based' ? 'bg-indigo-900 text-indigo-400' : 
                meeting.type === 'AA' ? 'bg-sky-900 text-sky-400' : 'bg-emerald-900 text-emerald-400'
              }`}>
                {meeting.type}
              </span>
              <span className="text-[10px] font-bold text-slate-500">{meeting.time}</span>
            </div>

            <h3 className="text-lg font-black mb-1 group-hover:text-sky-400 transition-colors">{meeting.title}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hosted by {meeting.host}</p>
            
            <p className="text-xs text-slate-500 italic mb-6 leading-relaxed">
              "{meeting.description}"
            </p>
            
            <button className="w-full bg-slate-800 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center space-x-2">
              <Icons.Mic />
              <span>Join via Zoom</span>
            </button>
          </div>
        ))}

        <div className="text-center pt-8">
          <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-4">Can't find a meeting?</p>
          <button className="text-sky-500 text-[10px] font-black uppercase tracking-widest border border-sky-500/20 px-6 py-3 rounded-xl hover:bg-sky-500/10 transition-colors">
            Contact Meeting Coordinator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
