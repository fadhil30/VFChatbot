"use client";

import { MessageCircle, MoreHorizontal } from "lucide-react";

interface ChatPreviewProps {
  name: string;
  primaryColor: string;
  theme: "light" | "dark";
}

export function ChatPreview({ name, primaryColor, theme }: ChatPreviewProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Frame / Container */}
      <div
        className={`rounded-3xl overflow-hidden shadow-2xl border-8 ${
          isDark ? "border-[#2d2d2d] bg-[#1a1a1a]" : "border-white bg-white"
        }`}
        style={{ height: "600px" }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center gap-3">
            {/* Avatar Placeholder */}
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <div className="font-medium text-sm">{name}</div>
          </div>
          <button className="text-white/80 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className={`p-4 space-y-4 h-full ${isDark ? "bg-[#111]" : "bg-gray-50"}`}>
          {/* Bot Message */}
          <div className="flex gap-2">
             <div className="w-8 h-8 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs">
              🤖
            </div>
            <div
              className={`rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-sm ${
                isDark ? "bg-[#1a1a1a] text-gray-200" : "bg-white text-gray-800 shadow-sm"
              }`}
            >
              Hey, how can I help you today?
            </div>
          </div>

          {/* User Message */}
          <div className="flex flex-row-reverse gap-2">
            <div
              className="rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%] text-sm text-white ml-auto"
              style={{ backgroundColor: primaryColor }}
            >
              I like AI Agents
            </div>
          </div>
        </div>

        {/* Input Area (Mock) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
            isDark ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-100"
        }`}>
            <div className={`h-10 rounded-full px-4 flex items-center text-sm text-gray-400 ${
                isDark ? "bg-[#111]" : "bg-gray-100"
            }`}>
               Type a message...
            </div>
        </div>
      </div>

       {/* Floating Action Button Preview (Optional) */}
       <div 
         className="absolute -right-12 bottom-12 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white cursor-default"
         style={{ backgroundColor: primaryColor }}
       >
         <MessageCircle className="w-7 h-7" />
       </div>
    </div>
  );
}
