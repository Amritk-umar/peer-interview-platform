"use client";

import { useCompletion } from "@ai-sdk/react";
import { Bot, Sparkles, Loader2, Info } from "lucide-react";

export default function AiReviewer({
  currentCode,
  interviewPrompt,
}: {
  currentCode: string;
  interviewPrompt: string;
}) {
  const { complete, completion, isLoading, error } = useCompletion({
    api: "/api/review",
    streamProtocol: "text",
  });

  const handleReviewRequest = () => {
    complete("Review my code", {
      body: {
        code: currentCode,
        prompt: interviewPrompt,
      },
    });
  };

  const isInitialState = !completion && !isLoading && !error;

  return (
    <div className="flex flex-col h-full bg-[#080808]">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.05] bg-[#030303] shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Bot size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">AI Co-Interviewer</span>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <Loader2 size={12} className="animate-spin" />
              Analyzing...
            </div>
          )}
        </div>
        
        <button
          onClick={handleReviewRequest}
          disabled={
            isLoading ||
            currentCode.trim() === "" ||
            currentCode.includes("// Write your logic here...")
          }
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 disabled:text-slate-500 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20 active:scale-95"
        >
          <Sparkles size={14} />
          {isLoading ? "Reviewing..." : "Request Review"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#080808]">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-400 text-xs rounded-xl flex gap-3">
            <div className="shrink-0 mt-0.5">⚠️</div>
            <div>
              <p className="font-bold mb-1">Analysis Failed</p>
              <p className="opacity-80">{error.message}</p>
            </div>
          </div>
        )}

        {isInitialState ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 bg-[#030303] rounded-2xl flex items-center justify-center mb-6 text-slate-700">
              <Bot size={32} />
            </div>
            <h3 className="text-sm font-bold text-slate-300 mb-2">Ready for feedback?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click the button above and I'll analyze your code's complexity and suggest optimizations.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 w-full text-left">
              {[
                "Time Complexity Analysis",
                "Space Complexity Analysis",
                "Optimization Suggestions"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600/30"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-medium text-sm">
              {completion}
              {isLoading && (
                <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse align-middle"></span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/[0.05] bg-[#030303] shrink-0">
        <div className="flex items-start gap-3 text-slate-500">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p className="text-[10px] leading-relaxed italic">
            AI feedback is experimental and may contain inaccuracies. Use it as a guide to improve your technical communication.
          </p>
        </div>
      </div>
    </div>
  );
}
