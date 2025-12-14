// src/components/ChatDemo.tsx
"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ChatDemo() {
  // Use our custom hook to get the current typed text
  const typedText = useTypewriter();

  return (
    <div className="h-full flex flex-col justify-center items-center p-8 relative overflow-hidden bg-black">
      {/* Subtle background gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="max-w-2xl w-full z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ask anything.
          </span>
        </h2>

        {/* The Prompt Box (Gemini Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-1 flex items-center shadow-2xl relative group"
        >
          {/* Colorful Icon */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3.5 rounded-2xl m-1">
             <Sparkles className="text-white h-6 w-6" />
          </div>

          {/* Typing Area */}
          <div className="flex-1 pl-4 pr-6 py-4 text-left">
            <p className="text-xl text-gray-300 font-medium">
              {typedText}
              {/* Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-0.5 h-6 ml-1 bg-blue-500 align-middle"
              ></motion.span>
            </p>
          </div>

          {/* Send Button Placeholder */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-gray-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        </motion.div>

        <p className="text-gray-500 mt-6 text-sm">
          Experience the natural, human-like conversations of our AI.
        </p>
      </div>
    </div>
  );
}