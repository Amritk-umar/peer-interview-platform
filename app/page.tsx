"use client";

import Link from 'next/link'
import { Code2, Zap, Brain, Users, ArrowRight, Sparkles, MousePointer2, Terminal, ShieldCheck, Cpu } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-blue-500/30 font-sans tracking-tight">
      {/* Global Sci-Fi Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Space Plasma */}
        <div className="absolute top-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/[0.07] blur-[160px] animate-pulse opacity-60" />
        <div className="absolute bottom-[-20%] right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/[0.07] blur-[160px] animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
        
        {/* Animated Perspective Grid (The 'Floor') */}
        <div className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            perspective: '1000px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-20%)',
            maskImage: 'linear-gradient(to top, white, transparent)'
          }} 
        />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%'
          }}
        />

        {/* Global Grain/Noise Overlay */}
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.04] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Moving Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-scan z-[60]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 lg:pt-48 lg:pb-56">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5 backdrop-blur-2xl shadow-2xl text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles size={12} className="animate-pulse" />
              <span>The Gold Standard for Peer Prep</span>
            </div>
            
            <h1 className="text-7xl lg:text-[7.5rem] font-black leading-[0.85] mb-10 tracking-[-0.06em] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Interviewing <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">is an art form.</span>
                <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" />
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Experience the world's most sophisticated collaborative IDE for technical candidates. High-fidelity sync, AI-driven feedback, and production-grade tools.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Link 
                href="/sign-up" 
                className="relative group overflow-hidden bg-white text-black px-12 py-6 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative flex items-center gap-3">
                  Start Practicing
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/dashboard" 
                className="group px-12 py-6 rounded-2xl font-black text-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all active:scale-95 flex items-center gap-3 backdrop-blur-md"
              >
                View Dashboard
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
              </Link>
            </div>
          </div>

          {/* Advanced Mock Editor */}
          <div className="max-w-6xl mx-auto relative animate-in fade-in zoom-in duration-1000 delay-700">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-20 bg-blue-500/5 blur-[120px] rounded-full opacity-50" />
            
            <div className="relative group p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 via-white/5 to-white/5 overflow-hidden">
              <div className="relative bg-[#080808] rounded-[3rem] shadow-[0_48px_128px_-16px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Editor Header */}
                <div className="bg-[#111] px-8 py-5 flex items-center justify-between border-b border-white/[0.03]">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-black/20 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/20 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-black/20 shadow-inner"></div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                    <Terminal size={14} className="text-blue-400" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">
                      interview-session.js
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-black">JS</div>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-10 font-mono text-sm leading-[1.8] min-h-[400px] relative">
                  <div className="flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-slate-700 select-none text-right w-6">1</span>
                    <span className="text-purple-400 font-bold italic">import</span> <span className="text-white">&#123;</span> <span className="text-blue-400">engine</span> <span className="text-white">&#125;</span> <span className="text-purple-400 font-bold italic">from</span> <span className="text-orange-400">"@peerprep/core"</span>;
                  </div>
                  <div className="flex gap-6 mt-4">
                    <span className="text-slate-700 select-none text-right w-6">2</span>
                    <span className="text-purple-400 font-bold">async function</span> <span className="text-blue-400 font-black tracking-wider">initSession</span>(candidate) &#123;
                  </div>
                  <div className="flex gap-6">
                    <span className="text-slate-700 select-none text-right w-6">3</span>
                    <span className="pl-6 text-slate-600">// Establishing secure peer connection...</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-slate-700 select-none text-right w-6">4</span>
                    <span className="pl-6 text-purple-400 font-bold">const</span> status = <span className="text-yellow-400">await</span> engine.<span className="text-blue-400">verify</span>(candidate.id);
                  </div>
                  <div className="flex gap-6 relative group/line">
                    <span className="text-slate-700 select-none text-right w-6">5</span>
                    <span className="pl-6 text-white flex items-center">
                      <span className="text-purple-400 font-bold">return</span> status.active ? <span className="text-green-400">"SUCCESS"</span> : <span className="text-red-400">"RETRY"</span>;
                      <span className="w-[2px] h-6 bg-blue-500 ml-1 shadow-[0_0_15px_#3b82f6] animate-caret" />
                    </span>
                    
                    {/* Floating Collaborator Pointer */}
                    <div className="absolute left-[75%] top-4 flex flex-col items-start animate-float">
                      <div className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md flex items-center gap-2 shadow-2xl shadow-blue-500/40">
                        <MousePointer2 size={8} fill="white" />
                        SARAH (LEAD)
                      </div>
                      <div className="mt-2 bg-blue-600/10 backdrop-blur-md border border-blue-600/30 px-3 py-1.5 rounded-xl text-[9px] font-bold text-blue-400 max-w-[140px] leading-tight">
                        Nice logic! Let's check the edge cases here.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 mt-2 opacity-50">
                    <span className="text-slate-700 select-none text-right w-6">6</span>
                    <span>&#125;</span>
                  </div>

                  {/* AI Pulse Effect Overlay */}
                  <div className="absolute bottom-10 right-10 group/ai">
                    <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-2xl group-hover/ai:bg-purple-500/40 transition-all duration-700 animate-pulse" />
                    <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.6)] max-w-[280px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-500 blur-md opacity-50 animate-pulse" />
                          <Brain size={20} className="text-purple-400 relative" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-purple-400">AI Intelligence</span>
                      </div>
                      <p className="text-[12px] text-slate-300 leading-[1.6] font-medium italic">
                        "Your <span className="text-blue-400 font-black">O(N)</span> approach is solid. I suggest adding a cache layer for repeated candidate lookups."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Linear Style */}
      <section className="relative z-10 py-48 border-t border-white/[0.03]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center mb-32">
            <div className="lg:col-span-5">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Capabilities
              </div>
              <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-[-0.04em] leading-tight">
                Every detail <br />
                <span className="text-white/40">engineered.</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                We've obsessed over every pixel and millisecond to create an environment that disappears so you can focus on the code.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Zap size={24} className="text-blue-400" />,
                  title: "Low Latency",
                  desc: "Sub-50ms sync times for a 'live' feel."
                },
                {
                  icon: <ShieldCheck size={24} className="text-green-400" />,
                  title: "Persistence",
                  desc: "Sessions are saved automatically in real-time."
                },
                {
                  icon: <Cpu size={24} className="text-purple-400" />,
                  title: "AI Analysis",
                  desc: "Deep complexity modeling via Gemini."
                },
                {
                  icon: <Users size={24} className="text-orange-400" />,
                  title: "Multiplayer",
                  desc: "Unlimited peers per interview session."
                }
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="mb-6 bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles for Keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-caret {
          animation: caret 1s infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  )
}




