"use client";

import { useState } from "react";
import LiveEditor from "./LiveEditor";
import ChatSidebar from "./ChatSidebar";
import AiReviewer from "./AiReviewer";
import { MessageSquare, Bot, ChevronLeft, ChevronRight, Info, Settings, Share2, Code2, Terminal } from "lucide-react";
import Link from "next/link";

export default function RoomClient({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState<"chat" | "ai">("chat");
  const [isPromptExpanded, setIsPromptExpanded] = useState(true);
  const [currentCode, setCurrentCode] = useState(session.code || "");
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="h-screen flex flex-col bg-[#020202] text-slate-300 overflow-hidden font-sans tracking-tight">
      {/* Global Sci-Fi Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Space Plasma */}
        <div className="absolute top-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/[0.03] blur-[160px] animate-pulse opacity-60" />
        <div className="absolute bottom-[-20%] right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/[0.03] blur-[160px] animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
        
        {/* Animated Perspective Grid */}
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '120px 120px',
            perspective: '1000px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-20%)',
            maskImage: 'linear-gradient(to top, white, transparent)'
          }} 
        />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%'
          }}
        />

        {/* Global Grain Overlay */}
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.02] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Moving Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-scan z-[60]" />
      </div>

      {/* IDE Header */}
      <header className="h-14 border-b border-white/[0.05] bg-[#080808] flex items-center justify-between px-6 shrink-0 relative z-10">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-all group">
            <div className="bg-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Code2 className="text-black" size={18} />
            </div>
            <span className="font-black text-lg text-white tracking-tighter uppercase">PeerPrep</span>
          </Link>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest font-mono">Room: {session.room_code}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Invite link copied to clipboard!");
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl"
          >
            <Share2 size={14} />
            Invite Peer
          </button>
        </div>
      </header>

      {/* IDE Main Area */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar: Prompt (Collapsible) */}
        <div 
          className={`border-r border-white/[0.05] bg-[#080808] transition-all duration-500 flex flex-col shrink-0 ${
            isPromptExpanded ? "w-96" : "w-14"
          }`}
        >
          <div className="h-12 flex items-center justify-between px-4 border-b border-white/[0.03] shrink-0">
            {isPromptExpanded && <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Interview Context</span>}
            <button 
              onClick={() => setIsPromptExpanded(!isPromptExpanded)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
            >
              {isPromptExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isPromptExpanded ? (
              <div className="p-8">
                <div className="flex items-center gap-3 text-blue-400 mb-6">
                  <Terminal size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Requirements</span>
                </div>
                <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap font-medium">
                  {session.prompt}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 gap-6">
                <Info size={20} className="text-slate-700 hover:text-blue-500 transition-colors cursor-help" />
              </div>
            )}
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 flex flex-col bg-[#030303] min-w-0 relative">
          <LiveEditor
            initialCode={session.code}
            roomId={session.id}
            roomCode={session.room_code}
            prompt={session.prompt}
            onCodeChange={(code) => setCurrentCode(code)}
            onLanguageChange={(lang) => setLanguage(lang)}
          />
        </div>

        {/* Right Sidebar: Chat & AI */}
        <div className="w-96 border-l border-white/[0.05] bg-[#080808] flex flex-col shrink-0">
          {/* Tabs Header */}
          <div className="h-12 flex border-b border-white/[0.03] shrink-0">
            <button 
              onClick={() => setActiveTab("chat")}
              className={`flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === "chat" 
                  ? "bg-[#030303] text-blue-400 border-b-2 border-blue-500" 
                  : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <MessageSquare size={14} />
              Protocol
            </button>
            <button 
              onClick={() => setActiveTab("ai")}
              className={`flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === "ai" 
                  ? "bg-[#030303] text-purple-400 border-b-2 border-purple-500" 
                  : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <Bot size={14} />
              AI Intel
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === "chat" ? (
              <ChatSidebar roomId={session.id} />
            ) : (
              <AiReviewer currentCode={currentCode} interviewPrompt={session.prompt} />
            )}
          </div>
        </div>
      </main>

      {/* IDE Status Bar (Renamed to div to comply with 'one footer' request) */}
      <div className="h-8 bg-[#080808] border-t border-white/[0.05] flex items-center justify-between px-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] shrink-0 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-green-500">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
            <span>Real-time Sync Active</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">ID:</span>
            <span className="text-slate-400 font-mono">{session.id.slice(0, 8)}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span>Encoding: UTF-8</span>
          <span>Tab Size: 2</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${language === 'javascript' ? 'bg-yellow-400' : language === 'python' ? 'bg-blue-500' : language === 'java' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
            <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
