"use client";

import { ChatPreview } from "@/components/onboarding/agent-setup/ChatPreview";
// import { Zap } from "lucide-react"; // Removed unused import

interface AgentConnectionPreviewProps {
    model: string;
}

export function AgentConnectionPreview({ model }: AgentConnectionPreviewProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      
      {/* 1. The "Brain" (Model) */}
      <div className="relative z-20 mb-12 animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-linear-to-br from-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl p-[2px]">
            <div className="w-full h-full bg-white dark:bg-black rounded-xl flex items-center justify-center">
                 {/* Placeholder for OpenAI logo or selected model logo */}
                 <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-pink-500 to-orange-400">
                    {/* Display model initials or AI */}
                    {model ? "AI" : "AI"}
                 </span>
            </div>
        </div>
        {/* Connection node point */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-100 dark:border-[#111]" />
      </div>

      {/* 2. The Connection Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[300px] -z-10 bg-linear-to-b from-orange-400 via-blue-500 to-blue-600 opacity-50">
           {/* Animated particle flow */}
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 dark:bg-white/50 blur-[2px] animate-[flow_2s_infinite]" />
      </div>

      {/* 3. The "Body" (Agent UI) */}
      <div className="relative z-10 scale-90 lg:scale-100 transition-all duration-500">
         {/* Connection node point */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-gray-100 dark:border-[#111] z-30" />
        
        {/* We reuse the specific preview component but pass default/saved props since this step is about personality, not UI */}
        <ChatPreview 
            name="Melissa"
            primaryColor="#3B81F6"
            theme="light"
        />
      </div>

      {/* Style for custom animation - in production convert to tailwind config */}
      <style jsx global>{`
        @keyframes flow {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
