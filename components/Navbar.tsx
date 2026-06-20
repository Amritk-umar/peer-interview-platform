"use client";

import Link from "next/link";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { Code2 } from "lucide-react";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed top-0 z-[100] w-full border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-all group"
          >
            <div className="bg-white p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Code2 className="text-black" size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase">
              PeerPrep
            </span>
          </Link>

          {isLoaded && isSignedIn && (
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse"></div>
          ) : !isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="bg-white text-black hover:bg-slate-200 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
              >
                Get Started
              </Link>
            </>
          ) : (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border border-white/10",
                },
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
