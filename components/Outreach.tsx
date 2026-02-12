import React, { useState } from 'react';
import { Icons } from '../constants';

interface ImpactPackage {
  id: string;
  title: string;
  cost: string;
  description: string;
  icon: string;
  items: string[];
}

const DONATION_PACKAGES: ImpactPackage[] = [
  {
    id: 'p1',
    title: 'Dignity Kit',
    cost: '$15',
    description: 'Provides essential hygiene and personal care for one person struggling on the streets.',
    icon: '🧼',
    items: ['New Socks', 'Toothbrush/Paste', 'Sanitizer', 'Deodorant', 'Clean Wipes']
  },
  {
    id: 'p2',
    title: 'Anchor Meal Pack',
    cost: '$25',
    description: 'A hot nutritious meal, clean water, and a snack for a street outreach circuit.',
    icon: '🍱',
    items: ['Warm Entrée', 'Protein Bars', 'Fresh Fruit', 'Bottled Water', 'Gospel Tract']
  },
  {
    id: 'p3',
    title: 'Safe Harbor Placement',
    cost: '$75',
    description: 'Emergency placement in a secure, Christ-centered sanctuary for a vulnerable person.',
    icon: '🏠',
    items: ['Safe Bed', 'Shower Access', 'Clean Clothes', 'Intake Counselor Support']
  }
];

const MISSION_STEPS = [
  { title: "Street Engagement", desc: "We meet them where they are—under bridges, in tents, and in alleyways.", icon: "🤝" },
  { title: "Safe Placement", desc: "Pulling them into secure 'Safe Harbor' spaces with 24/7 care and food.", icon: "🛡️" },
  { title: "Sober Transformation", desc: "A 12-step, faith-driven program for long-term spiritual and physical recovery.", icon: "🕊️" }
];

const RECENT_MIRACLES = [
  "Brother Mark found sanctuary last night after 3 years on the street.",
  "12 Dignity Kits distributed in the downtown circuit this morning.",
  "Sister Elena celebrated 30 days sober in our Safe Harbor program."
];

const Outreach: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate secure payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const selectedPackage = DONATION_PACKAGES.find(p => p.id === selectedId);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto pb-32 text-white">
      <div className="p-8 text-center bg-emerald-900 relative overflow-hidden border-b border-emerald-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-10"><span className="text-9xl font-black">⚓</span></div>
        <h2 className="text-3xl font-black uppercase tracking-tight glow-text mb-2">Safe Harbor Mission</h2>
        <p className="text-emerald-200 text-sm font-scriptural italic">"For I was hungry and you gave me something to eat..." — Matthew 25:35</p>
      </div>

      {/* Impact Ticker */}
      <div className="bg-emerald-950/50 py-3 px-6 border-b border-emerald-900 flex items-center overflow-hidden">
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest shrink-0 mr-4">Recent Miracles:</span>
        <div className="flex animate-marquee whitespace-nowrap space-x-8">
           {RECENT_MIRACLES.map((m, i) => (
             <span key={i} className="text-[10px] text-emerald-200/60 font-medium italic">"{m}"</span>
           ))}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {showSuccess ? (
          <div className="bg-emerald-900/40 border border-emerald-500/50 rounded-[40px] p-10 text-center space-y-6 animate-in zoom-in duration-500 shadow-2xl">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl mx-auto shadow-lg shadow-emerald-500/20">
              🙌
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight">God Bless You!</h3>
              <p className="text-emerald-200 text-sm italic">"Inasmuch as you did it for one of the least of these brothers of Mine, you did it for Me."</p>
            </div>
            <p className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest">Transaction Successful • Impact Underway</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-emerald-500 text-white font-black py-4 px-8 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-emerald-950 transition-all"
            >
              Continue Mission
            </button>
          </div>
        ) : (
          <>
            <section className="bg-slate-900 rounded-[40px] p-8 border border-emerald-900/30 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center space-x-3">
                    <div className="bg-emerald-900/50 p-3 rounded-2xl text-emerald-400"><Icons.Heart /></div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Fund the Rescue</h3>
                 </div>
                 <div className="text-emerald-500 animate-pulse"><Icons.Sparkles /></div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Founded by Sister Jill Demoran, we pull people off the streets and into sanctuary. Every dollar provides safe harbor and spiritual renewal.
              </p>
              
              <div className="space-y-4">
                {DONATION_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedId(pkg.id)}
                    className={`w-full text-left bg-slate-950/50 rounded-[32px] p-6 border-2 transition-all flex flex-col space-y-4 group ${
                      selectedId === pkg.id ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-800 hover:border-emerald-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${selectedId === pkg.id ? 'bg-emerald-500 text-white' : 'bg-emerald-900/20 text-emerald-500'}`}>
                          {pkg.icon}
                        </div>
                        <div>
                          <h4 className="font-black text-white group-hover:text-emerald-400 transition-colors">{pkg.title}</h4>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{pkg.cost} Donation</p>
                        </div>
                      </div>
                      {selectedId === pkg.id && <div className="text-emerald-500"><Icons.Check /></div>}
                    </div>
                    
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">"{pkg.description}"</p>
                    
                    {selectedId === pkg.id && (
                      <div className="pt-4 border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">What's inside:</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.items.map((item, i) => (
                            <span key={i} className="bg-emerald-900/30 text-emerald-400 text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleDonate}
                  disabled={!selectedId || isProcessing}
                  className={`w-full py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${
                    isProcessing ? 'bg-emerald-800 opacity-70 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Icons.Heart />
                      <span>Donate {selectedPackage?.cost || 'Now'}</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[8px] text-slate-600 uppercase font-bold tracking-widest mt-4">Secure & Encrypted Contribution</p>
              </div>
            </section>

            <section className="bg-slate-900/50 rounded-[40px] p-8 border border-slate-800 space-y-6">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center">
                <span className="w-8 h-px bg-slate-800 mr-2"></span> How it Works
              </h4>
              <div className="grid grid-cols-1 gap-6">
                {MISSION_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="text-2xl mt-1">{step.icon}</span>
                    <div>
                      <h4 className="font-black text-white text-[10px] uppercase tracking-widest">{step.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Outreach;
