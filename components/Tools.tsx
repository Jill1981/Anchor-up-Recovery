
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

const BreathingTool: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          if (phase === 'Inhale') { setPhase('Hold'); return 4; }
          if (phase === 'Hold') { setPhase('Exhale'); return 4; }
          setPhase('Inhale'); return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="bg-blue-50 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 border border-blue-100">
      <h3 className="text-xl font-bold text-blue-900">Box Breathing</h3>
      <div className={`w-40 h-40 rounded-full flex items-center justify-center border-8 border-blue-200 transition-all duration-[4000ms] ${phase === 'Inhale' ? 'scale-125' : phase === 'Exhale' ? 'scale-90' : 'scale-110'}`}>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-700 uppercase tracking-widest">{phase}</p>
          <p className="text-4xl text-blue-500">{seconds}</p>
        </div>
      </div>
      <p className="text-sm text-blue-600 max-w-xs text-center">
        Follow the circle. Inhale deep, hold gently, and release slowly.
      </p>
    </div>
  );
};

const GroundingTool: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "5 things you see", desc: "Identify 5 visual objects around you." },
    { label: "4 things you feel", desc: "Notice 4 physical sensations (the seat, the breeze, etc)." },
    { label: "3 things you hear", desc: "Listen for 3 distinct sounds in your environment." },
    { label: "2 things you smell", desc: "Try to detect 2 different scents." },
    { label: "1 thing you taste", desc: "Notice 1 flavor or just the sensation of your mouth." },
  ];

  return (
    <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
       <h3 className="text-xl font-bold text-teal-900 mb-4">5-4-3-2-1 Grounding</h3>
       <div className="space-y-4">
          {steps.map((s, idx) => (
            <div key={idx} className={`flex items-start space-x-3 p-3 rounded-xl transition-all ${step === idx ? 'bg-white shadow-md' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${step === idx ? 'bg-teal-600' : 'bg-teal-300'}`}>
                {5 - idx}
              </div>
              <div>
                <p className="font-bold text-teal-800">{s.label}</p>
                {step === idx && <p className="text-sm text-teal-600">{s.desc}</p>}
              </div>
            </div>
          ))}
       </div>
       <div className="mt-6 flex justify-between">
          <button 
            onClick={() => setStep(prev => Math.max(0, prev - 1))}
            className="text-teal-700 font-semibold disabled:opacity-30"
            disabled={step === 0}
          >Previous</button>
          <button 
            onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
            className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold hover:bg-teal-700 disabled:opacity-30 shadow-lg"
            disabled={step === steps.length - 1}
          >
            {step === steps.length - 1 ? "Done" : "Next Step"}
          </button>
       </div>
    </div>
  );
};

const Tools: React.FC = () => {
  return (
    <div className="p-4 space-y-8 h-full overflow-y-auto pb-24">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Coping Tools</h2>
        <p className="text-gray-500">Quick exercises to center yourself during a craving.</p>
      </div>
      <BreathingTool />
      <GroundingTool />
    </div>
  );
};

export default Tools;
