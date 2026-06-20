"use client";

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { supabase } from "@/lib/supabase";
import { ChevronDown, FileCode, Play, Settings } from "lucide-react";

// Define the languages you want to support
const SUPPORTED_LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
];

export default function LiveEditor({
  initialCode,
  roomId,
  roomCode,
  prompt,
  onCodeChange,
  onLanguageChange,
}: {
  initialCode: string | null;
  roomId: string;
  roomCode: string;
  prompt: string;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
}) {
  const [code, setCode] = useState(
    initialCode || "// Write your logic here...",
  );
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [outputHeight, setOutputHeight] = useState(150);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const isLocalChange = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  useEffect(() => {
    // Subscribe to real-time changes on the sessions table for this specific room
    const channel = supabase
      .channel(`room-${roomCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "sessions",
          filter: `id=eq.${roomId}`, // Listen only to this specific session row
        },
        (payload) => {
           // 1. Cast the payload to explicitly declare it has a 'code' string
           const newData = payload.new as { code: string };
           
           // 2. Use our safely typed newData variable instead
           if (newData.code !== code && !isLocalChange.current) {
             setCode(newData.code);
             onCodeChange?.(newData.code);
           }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, roomCode, code, onCodeChange]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
    isLocalChange.current = true; // Flag that WE made this change

    // Debounce the database update by 400ms to avoid spamming the database
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from("sessions")
        .update({ code: newCode })
        .eq("id", roomId);

      if (error) console.error("Error syncing code:", error);
      isLocalChange.current = false; // Reset flag after syncing
    }, 400);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.error) {
          // If there's an execution error, display it prominently
          setOutput(`ERROR:\n${result.error}\n${result.output || ''}`);
        } else {
          // Otherwise, display the output
          setOutput(result.output || "No output.");
        }
      } else {
        // Handle HTTP errors from our API route
        setOutput(`API Error: ${result.error || response.statusText}`);
      }
    } catch (e: any) {
      setOutput(`Error executing code: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = outputHeight;

    const doDrag = (e: MouseEvent) => {
      const newHeight = startHeight - (e.clientY - startY);
      setOutputHeight(Math.max(50, Math.min(window.innerHeight - 300, newHeight)));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e]">
      {/* Editor Toolbar */}
      <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center justify-between px-2 shrink-0">
        <div className="flex items-center">
          {/* Mock Tabs */}
          <div className="flex items-center h-full">
            <div className="flex items-center gap-2 px-4 h-10 bg-[#1e1e1e] border-t border-t-blue-500 text-gray-200 text-xs font-medium cursor-default">
              <FileCode size={14} className="text-blue-400" />
              solution.{language === "javascript" ? "js" : language === "python" ? "py" : language === "cpp" ? "cpp" : "java"}
            </div>
            <div className="flex items-center gap-2 px-4 h-10 text-gray-500 text-xs font-medium hover:bg-[#2a2d2e] cursor-pointer transition-colors border-r border-[#333]">
              tests.js
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                onLanguageChange?.(e.target.value);
              }}
              className="appearance-none bg-[#2d2d2d] text-gray-300 text-[10px] font-bold uppercase tracking-wider pl-3 pr-8 py-1 rounded border border-[#444] hover:bg-[#37373d] transition-colors cursor-pointer outline-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1 rounded bg-[#2d2d2d] hover:bg-green-600/20 text-green-500 text-[10px] font-bold uppercase tracking-wider transition-all border border-[#444] hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <svg className="animate-spin h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Play size={12} fill="currentColor" />
            )}
            {isRunning ? "Running..." : "Run"}
          </button>
          
          <button className="p-1.5 text-gray-500 hover:text-gray-300 rounded hover:bg-[#37373d] transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex flex-col flex-1">
        <Editor
          height={`calc(100% - ${outputHeight}px)`}
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            padding: { top: 20 },
            fontFamily: "'Geist Mono', monospace",
            lineHeight: 22,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            selectionHighlight: true,
            occurrencesHighlight: "multiFile"
          }}
        />
        <div 
          className="w-full h-2 cursor-ns-resize bg-[#2d2d2d] hover:bg-blue-500/50 transition-colors"
          onMouseDown={handleMouseDown}
        ></div>
        <div 
          style={{ height: outputHeight }} 
          className="bg-[#0e0e0e] text-white p-4 text-xs font-mono overflow-auto custom-scrollbar flex-shrink-0"
        >
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}

