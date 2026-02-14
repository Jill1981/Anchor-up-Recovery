
import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '../constants';

interface VideoCallProps {
  onEnd: () => void;
  peerName: string;
  peerTitle: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ onEnd, peerName, peerTitle }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected'>('connecting');
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        
        // Simulate peer connecting
        setTimeout(() => setCallStatus('connected'), 3000);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Camera access is required for fellowship calls.");
        onEnd();
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let timer: number;
    if (callStatus === 'connected') {
      timer = window.setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-in fade-in duration-500">
      {/* Remote View (Simulated) */}
      <div className="relative flex-1 bg-slate-900 flex items-center justify-center overflow-hidden">
        {callStatus === 'connecting' ? (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-4xl animate-pulse">
              {peerName[0]}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Connecting to {peerName}...</h2>
              <p className="text-sky-400 text-xs font-black uppercase tracking-widest">Safe Harbor Fellowship</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* Simulation Placeholder for Peer */}
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
               <div className="text-center">
                 <div className="w-32 h-32 rounded-full bg-indigo-900 mx-auto flex items-center justify-center text-5xl mb-4 border-4 border-indigo-500/20">
                   {peerName[0]}
                 </div>
                 <h3 className="text-xl font-black text-white uppercase">{peerTitle} {peerName}</h3>
                 <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Steady Ground Volunteer</p>
                 <p className="mt-8 text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">Fellowship Active</p>
               </div>
            </div>
          </div>
        )}

        {/* Local Preview */}
        <div className="absolute bottom-32 right-6 w-32 h-44 bg-black rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl z-20">
          <video 
            ref={localVideoRef} 
            autoPlay 
            muted 
            playsInline 
            className={`w-full h-full object-cover mirror ${isVideoOff ? 'hidden' : ''}`} 
          />
          {isVideoOff && (
            <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white/20">
              <Icons.Mic />
            </div>
          )}
        </div>

        {/* Call Info Overlay */}
        <div className="absolute top-12 left-6 z-20 flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{formatTime(callTime)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-950/80 backdrop-blur-xl p-8 pb-12 flex justify-center items-center space-x-8 border-t border-white/5">
        <button 
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          ) : (
            <Icons.Mic />
          )}
        </button>

        <button 
          onClick={onEnd}
          className="w-20 h-20 bg-red-600 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-red-600/20 hover:bg-red-500 transition-all transform active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="rotate-[135deg]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>

        <button 
          onClick={toggleVideo}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isVideoOff ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16-3.515-3.515A2 2 0 0 0 11 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.35"/><path d="m2 2 20 20"/><path d="M15 9h1a2 2 0 0 1 2 2v1.4"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
