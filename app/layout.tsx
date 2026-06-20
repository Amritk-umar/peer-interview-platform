"use client";

import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { Code2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isRoomPage = pathname?.startsWith('/room/');

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-[#030303] text-white antialiased font-sans selection:bg-blue-500/30">
          {!isRoomPage && <Navbar />}
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {!isRoomPage && (
            <footer className="w-full py-24 border-t border-white/[0.03] bg-[#030303] mt-auto">
              <div className="container mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="bg-white/5 p-2 rounded-xl group-hover:bg-white transition-all group-hover:rotate-12">
                      <Code2 className="text-slate-500 group-hover:text-black transition-colors" size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-white transition-colors">PeerPrep</span>
                  </div>
                  
                  <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                  
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                    Developed by <span className="text-slate-300">Amrit Kumar</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-12">
                  <a 
                    href="https://github.com/Amritk-umar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/amritkumar985/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          )}
        </body>
      </html>
    </ClerkProvider>
  )
}