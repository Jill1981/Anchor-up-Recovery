
import React, { useState } from 'react';
import { Icons } from '../constants';

interface Step {
  number: number;
  title: string;
  principle: string;
  scripture: string;
  description: string;
  questions: string[];
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Honesty",
    principle: "Powerlessness",
    scripture: "Romans 7:18 - \"For I know that good itself does not dwell in me, that is, in my sinful nature. For I have the desire to do what is good, but I cannot carry it out.\"",
    description: "We admitted we were powerless over our addiction—that our lives had become unmanageable.",
    questions: [
      "In what ways has my life become unmanageable lately?",
      "Can I identify a specific time this week when I felt completely powerless?",
      "What am I afraid will happen if I admit I can't do this alone?"
    ]
  },
  {
    number: 2,
    title: "Hope",
    principle: "Belief",
    scripture: "Philippians 2:13 - \"For it is God who works in you to will and to act in order to fulfill his good purpose.\"",
    description: "Came to believe that a Power greater than ourselves could restore us to sanity.",
    questions: [
      "Do I believe that restoration is actually possible for me?",
      "What does a 'Power greater than myself' look like in my daily life?",
      "What 'insane' behaviors am I still repeating?"
    ]
  },
  {
    number: 3,
    title: "Surrender",
    principle: "Trust",
    scripture: "Romans 12:1 - \"Therefore, I urge you, brothers and sisters, in view of God’s mercy, to offer your bodies as a living sacrifice, holy and pleasing to God.\"",
    description: "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    questions: [
      "What specific parts of my life am I still trying to control?",
      "What does 'turning it over' feel like in my body?",
      "How can I practice surrender in the next 24 hours?"
    ]
  }
  // Simplified for brevity, would continue to Step 12
];

const TwelveSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-indigo-950 relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute top-0 left-0 p-8 opacity-5"><span className="text-9xl font-black italic">👣</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Step Studies</h2>
        <p className="text-indigo-200 text-sm font-scriptural italic">"The path of the righteous is like the first gleam of dawn..." — Proverbs 4:18</p>
      </div>

      <div className="p-6 space-y-4">
        {activeStep === null ? (
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 mb-4">The Twelve Steps</h3>
            {STEPS.map((step) => (
              <button 
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className="w-full bg-slate-900 rounded-3xl p-6 border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all text-left shadow-lg"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-black text-xl border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-tight">{step.title}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Principle: {step.principle}</p>
                  </div>
                </div>
                <div className="text-slate-700 group-hover:text-indigo-500 transition-colors">
                  <Icons.Sparkles />
                </div>
              </button>
            ))}
            <div className="p-10 text-center opacity-20 italic text-sm">Steps 4-12 coming soon in the next fellowship update.</div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setActiveStep(null)}
              className="flex items-center space-x-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <span>Back to all steps</span>
            </button>

            {STEPS.find(s => s.number === activeStep) && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-5xl font-black text-indigo-500/20">{activeStep}</span>
                    <h3 className="text-3xl font-black uppercase tracking-tight">{STEPS.find(s => s.number === activeStep)?.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">{STEPS.find(s => s.number === activeStep)?.principle}</p>
                </div>

                <div className="bg-slate-900 rounded-[32px] p-8 border border-slate-800 shadow-2xl relative">
                  <p className="text-lg font-bold text-white leading-relaxed mb-6 italic">
                    "{STEPS.find(s => s.number === activeStep)?.description}"
                  </p>
                  <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-500/20">
                    <p className="font-scriptural text-sm text-indigo-200 leading-relaxed italic">
                      {STEPS.find(s => s.number === activeStep)?.scripture}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Reflection Study</h4>
                  {STEPS.find(s => s.number === activeStep)?.questions.map((q, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800 space-y-4">
                      <p className="text-sm font-bold text-slate-300">{q}</p>
                      <textarea 
                        placeholder="Type your reflection..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder:text-slate-700 outline-none focus:border-indigo-500 transition-colors min-h-[100px] resize-none"
                      />
                    </div>
                  ))}
                </div>

                <button className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-indigo-950 transition-all">
                  Complete Step Study
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwelveSteps;
