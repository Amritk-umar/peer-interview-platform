import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CreateRoomButton from './CreateRoomButton'
import { Clock, Calendar, ChevronRight, Code2, Search, Filter, LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Fetch past sessions created by this user
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('host_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#020202] relative overflow-hidden text-white font-sans tracking-tight">
      {/* Global Sci-Fi Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Space Plasma */}
        <div className="absolute top-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/[0.05] blur-[160px] animate-pulse opacity-60" />
        <div className="absolute bottom-[-20%] right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/[0.05] blur-[160px] animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
        
        {/* Animated Perspective Grid */}
        <div className="absolute inset-0 opacity-[0.1]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            perspective: '1000px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-20%)',
            maskImage: 'linear-gradient(to top, white, transparent)'
          }} 
        />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%'
          }}
        />

        {/* Global Grain/Noise Overlay */}
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Moving Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan z-[60]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Clock size={12} />
              <span>Identity Verified</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-[-0.04em] mb-4">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user.firstName || 'Developer'}</span>
            </h1>
            <p className="text-slate-400 font-medium text-xl leading-relaxed">
              You have <span className="text-white font-black">{sessions?.length || 0}</span> session{sessions?.length !== 1 ? 's' : ''} ready for review.
            </p>
          </div>
          <CreateRoomButton />
        </div>

        {/* Filters & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6 bg-white/[0.03] backdrop-blur-2xl p-3 rounded-3xl border border-white/[0.05] shadow-2xl">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter sessions by ID or prompt..." 
              className="w-full bg-black/40 border border-white/[0.05] rounded-2xl py-3.5 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-600 font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-slate-300 text-sm font-black uppercase tracking-widest hover:bg-white/[0.08] transition-all active:scale-95">
              <Filter size={16} />
              Filter
            </button>
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block mx-2"></div>
            <div className="flex items-center bg-black/40 p-1.5 rounded-xl border border-white/[0.05]">
              <button className="p-2 bg-white/10 shadow-2xl rounded-lg text-white">
                <LayoutGrid size={20} />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sessions?.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-40 bg-white/[0.02] backdrop-blur-3xl border-2 border-dashed border-white/10 rounded-[4rem] text-center px-10 group transition-all hover:border-blue-500/30 hover:bg-blue-500/[0.02]">
              <div className="bg-blue-500/10 p-10 rounded-[2.5rem] mb-10 group-hover:scale-110 transition-transform duration-700 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <Code2 className="text-blue-400" size={56} />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">No active sessions</h3>
              <p className="text-slate-500 max-w-sm mb-12 leading-relaxed text-xl font-medium">
                Initiate your first technical interview environment and invite a peer.
              </p>
              <CreateRoomButton />
            </div>
          ) : (
            sessions?.map((session, i) => (
              <Link 
                key={session.id} 
                href={`/room/${session.room_code}`}
                style={{ animationDelay: `${i * 100}ms` }}
                className="group relative p-[1px] rounded-[3rem] bg-gradient-to-b from-white/10 via-transparent to-transparent hover:from-blue-500/40 transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
              >
                <div className="bg-[#080808] rounded-[3rem] p-10 h-full flex flex-col relative overflow-hidden">
                  {/* Subtle Card Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700" />
                  
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="bg-white/5 text-slate-400 text-[10px] font-black px-5 py-2.5 rounded-full border border-white/10 font-mono tracking-[0.2em] uppercase group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                      {session.room_code}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Calendar size={14} className="text-slate-600" />
                      {new Date(session.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="mb-10 relative z-10">
                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Prompt Analysis</div>
                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors line-clamp-3 leading-[1.3] tracking-tight">
                      {session.prompt}
                    </h3>
                  </div>

                  <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/[0.03] group-hover:border-blue-500/20 transition-all relative z-10">
                    <div className="flex items-center gap-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                      <span>Enter Interface</span>
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#080808] bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-2xl uppercase">
                        {user.firstName?.[0] || 'D'}
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-[#080808] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-2xl">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
