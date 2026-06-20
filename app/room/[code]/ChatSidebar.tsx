'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Send, User } from 'lucide-react'

type Message = {
  id: string
  sender_id: string
  first_name: string
  body: string
}

export default function ChatSidebar({ roomId }: { roomId: string }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages?roomId=${roomId}`);
      const data = await response.json();
      if (data.messages) setMessages(data.messages);
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `session_id=eq.${roomId}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const messageText = newMessage
    setNewMessage('') 

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: roomId,
        sender_id: user.id,
        first_name: user.firstName || 'Peer',
        body: messageText
      })
    })
  }

  return (
    <div className="flex flex-col h-full bg-[#080808]">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-6">
            <MessageSquareIcon />
            <p className="text-xs font-bold uppercase tracking-widest mt-4">No messages yet</p>
            <p className="text-[10px] mt-2">Start a conversation with your peer.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = user?.id === msg.sender_id
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {!isMe && (
                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                      <User size={10} className="text-white" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {isMe ? 'You' : msg.first_name}
                  </span>
                </div>
                <div 
                  className={`max-w-[90%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                      : 'bg-[#151515] text-slate-300 rounded-tl-none border border-white/[0.05]'
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#030303] border-t border-white/[0.05]">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-blue-600 transition-all"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-600 transition-all active:scale-95"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-[9px] text-slate-700 mt-3 text-center uppercase tracking-widest font-bold">
          Press Enter to send
        </p>
      </div>
    </div>
  )
}

function MessageSquareIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}
