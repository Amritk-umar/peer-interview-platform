'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { nanoid } from 'nanoid'
import { supabase } from '@/lib/supabase'
import { Plus, X, Sparkles, Check, Info } from 'lucide-react'

export default function CreateRoomButton() {
  const { user } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCreateRoom = async () => {
    if (!user) return
    setIsLoading(true)
    
    const roomCode = nanoid(6).toLowerCase()
    
    const { error } = await supabase
      .from('sessions')
      .insert([
        { 
          host_id: user.id, 
          room_code: roomCode, 
          prompt: prompt || 'Write a function to solve the problem.' 
        }
      ])

    if (!error) {
      // Copy to clipboard
      await navigator.clipboard.writeText(`${window.location.origin}/room/${roomCode}`)
      setIsCopied(true)
      
      setTimeout(() => {
        router.push(`/room/${roomCode}`)
      }, 1500)
    } else {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black transition-all shadow-2xl shadow-blue-200 active:scale-95 group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
        <span>Create New Room</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500 fill-mode-both">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3.5 rounded-2xl">
                    <Sparkles className="text-blue-600 animate-pulse" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-[900] text-slate-900 tracking-tight">New Session</h2>
                    <p className="text-slate-500 text-sm font-medium">Set up your interview environment.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors group"
                >
                  <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Interview Prompt
                    </label>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                      <Info size={10} />
                      Supports Markdown
                    </div>
                  </div>
                  <textarea 
                    className="w-full border-2 border-slate-50 rounded-[2rem] p-6 min-h-[200px] text-slate-800 text-lg font-medium focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 bg-slate-50/50 resize-none"
                    placeholder="e.g., Design a function to find the longest palindromic substring in a given string..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <button 
                    onClick={handleCreateRoom}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-[2rem] font-black text-xl disabled:opacity-50 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-100 active:scale-95 group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Finalizing...</span>
                      </>
                    ) : isCopied ? (
                      <>
                        <Check size={28} className="animate-in zoom-in" />
                        <span>Link Copied! Joining...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Create & Copy Invite Link</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 text-slate-400 hover:text-slate-600 font-black text-sm uppercase tracking-widest transition-colors"
                  >
                    I&apos;ll do it later
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Invite link will be copied automatically
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
