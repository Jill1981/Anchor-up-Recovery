
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
    scripture: "Romans 7:18 - \"For I know that good itself does not dwell in me... For I have the desire to do what is good, but I cannot carry it out.\"",
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
    scripture: "Romans 12:1 - \"Offer your bodies as a living sacrifice, holy and pleasing to God.\"",
    description: "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    questions: [
      "What specific parts of my life am I still trying to control?",
      "What does 'turning it over' feel like in my body?",
      "How can I practice surrender in the next 24 hours?"
    ]
  },
  {
    number: 4,
    title: "Courage",
    principle: "Inventory",
    scripture: "Lamentations 3:40 - \"Let us examine our ways and test them, and let us return to the Lord.\"",
    description: "Made a searching and fearless moral inventory of ourselves.",
    questions: [
      "What secrets am I still holding onto that keep me in bondage?",
      "Who have I blamed for my own choices in the past?",
      "What character assets can I also recognize in myself?"
    ]
  },
  {
    number: 5,
    title: "Integrity",
    principle: "Confession",
    scripture: "James 5:16 - \"Therefore confess your sins to each other and pray for each other so that you may be healed.\"",
    description: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    questions: [
      "Why is it important to tell another person the truth about my inventory?",
      "How did I feel after being completely honest with someone?",
      "What am I still afraid to reveal?"
    ]
  },
  {
    number: 6,
    title: "Willingness",
    principle: "Character",
    scripture: "James 4:10 - \"Humble yourselves before the Lord, and he will lift you up.\"",
    description: "Were entirely ready to have God remove all these defects of character.",
    questions: [
      "Which character defects am I still clinging to because they feel comfortable?",
      "Am I truly ready to live without my old coping mechanisms?",
      "What does 'entirely ready' mean to me today?"
    ]
  },
  {
    number: 7,
    title: "Humility",
    principle: "Shortcomings",
    scripture: "1 John 1:9 - \"If we confess our sins, he is faithful and just and will forgive us... and purify us from all unrighteousness.\"",
    description: "Humbly asked Him to remove our shortcomings.",
    questions: [
      "What is the difference between being humiliated and being humble?",
      "How can I ask for help without feeling ashamed?",
      "What shortcomings have I seen shift already?"
    ]
  },
  {
    number: 8,
    title: "Love",
    principle: "Amends",
    scripture: "Luke 6:31 - \"Do to others as you would have them do to you.\"",
    description: "Made a list of all persons we had harmed, and became willing to make amends to them all.",
    questions: [
      "Who is the hardest person on my amends list to think about?",
      "Am I on my own list? How have I harmed myself?",
      "What does 'willingness' look like in this step?"
    ]
  },
  {
    number: 9,
    title: "Discipline",
    principle: "Restitution",
    scripture: "Matthew 5:23-24 - \"First go and be reconciled to them; then come and offer your gift.\"",
    description: "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
    questions: [
      "How do I distinguish between a 'direct amend' and a simple apology?",
      "Who might be harmed if I reach out to them right now?",
      "What fears are preventing me from making my next amend?"
    ]
  },
  {
    number: 10,
    title: "Perseverance",
    principle: "Daily Inventory",
    scripture: "1 Corinthians 10:12 - \"So, if you think you are standing firm, be careful that you don’t fall!\"",
    description: "Continued to take personal inventory and when we were wrong promptly admitted it.",
    questions: [
      "What 'spot check' can I do right now for my mood and actions?",
      "Why is it better to admit a mistake 'promptly' than wait?",
      "What have I been right about today?"
    ]
  },
  {
    number: 11,
    title: "Prayer",
    principle: "Spiritual Growth",
    scripture: "Colossians 3:16 - \"Let the message of Christ dwell among you richly...\"",
    description: "Sought through prayer and meditation to improve our conscious contact with God, praying only for knowledge of His will for us and the power to carry that out.",
    questions: [
      "How has my prayer life changed since starting this journey?",
      "What does 'conscious contact' feel like to me?",
      "What is God's will for me today (as best as I can tell)?"
    ]
  },
  {
    number: 12,
    title: "Service",
    principle: "Helping Others",
    scripture: "Galatians 6:1 - \"Brothers and sisters, if someone is caught in a sin, you who live by the Spirit should restore them gently.\"",
    description: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to addicts, and to practice these principles in all our affairs.",
    questions: [
      "How can I give back what was so freely given to me?",
      "What does it mean to practice these principles 'in all our affairs'?",
      "Who can I reach out to today who might be struggling?"
    ]
  }
];

const TwelveSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [reflections, setReflections] = useState<{[key: string]: string}>({});

  const handleReflectionChange = (stepNum: number, qIdx: number, val: string) => {
    setReflections(prev => ({ ...prev, [`${stepNum}-${qIdx}`]: val }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-24 text-white">
      <div className="p-8 text-center bg-indigo-950 relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute top-0 left-0 p-8 opacity-5"><span className="text-9xl font-black italic">👣</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Step Studies</h2>
        <p className="text-indigo-200 text-sm font-scriptural italic">"The path of the righteous is like the first gleam of dawn..." — Proverbs 4:18</p>
      </div>

      <div className="p-6 space-y-4">
        {activeStep === null ? (
          <div className="grid grid-cols-1 gap-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 mb-2">The Twelve Steps</h3>
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
                  <div className="flex items-center space-x-4">
                    <span className="text-6xl font-black text-indigo-500/20">{activeStep}</span>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight leading-none">{STEPS.find(s => s.number === activeStep)?.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">{STEPS.find(s => s.number === activeStep)?.principle}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[32px] p-8 border border-slate-800 shadow-2xl relative">
                  <p className="text-lg font-bold text-white leading-relaxed mb-6 italic">
                    "{STEPS.find(s => s.number === activeStep)?.description}"
                  </p>
                  <div className="p-6 bg-indigo-950/30 rounded-2xl border border-indigo-500/20">
                    <p className="font-scriptural text-base text-indigo-200 leading-relaxed italic">
                      {STEPS.find(s => s.number === activeStep)?.scripture}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Reflection Study</h4>
                  {STEPS.find(s => s.number === activeStep)?.questions.map((q, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800 space-y-4">
                      <p className="text-sm font-bold text-slate-300 leading-snug">{q}</p>
                      <textarea 
                        value={reflections[`${activeStep}-${i}`] || ''}
                        onChange={(e) => handleReflectionChange(activeStep, i, e.target.value)}
                        placeholder="Type your reflection..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder:text-slate-700 outline-none focus:border-indigo-500 transition-colors min-h-[100px] resize-none"
                      />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    alert(`Step ${activeStep} reflection saved locally.`);
                    setActiveStep(null);
                  }}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-indigo-950 transition-all"
                >
                  Save & Return
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
