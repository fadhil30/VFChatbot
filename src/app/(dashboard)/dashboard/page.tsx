"use client";

import { useState } from "react";
import { ArrowUpCircle, ChevronDown, RotateCcw } from "lucide-react";

export default function DashboardPlayground() {
  // const [model, setModel] = useState("gpt-5.1");
  const [instructions, setInstructions] = useState(
    "### Role\n- Primary Function: You are an AI agent who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times."
  );

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Panel: Configuration (Scrollable) */}
      <div className="w-full lg:w-[400px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex flex-col h-full overflow-y-auto">
        
        <div className="p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Playground</h1>
            </div>

            {/* Status */}
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium text-sm text-green-700 dark:text-green-400">Trained</span>
                </div>
                <div className="text-xs text-gray-500">
                    Last trained 3 hours ago • 2 KB
                </div>
            </div>

            {/* Compare */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compare AI models</span>
                <button className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-[#111] transition-colors">
                    Compare
                </button>
            </div>

            {/* Config Form (Reusing components logic but rendering inline for specific layout adjustments if needed, 
               or just reusing AgentSelectionForm if it fits well. 
               The screenshot shows slightly different layout so I'll compose it here for precision) */}
             
             {/* Model Selector */}
             <div className="space-y-2">
                 <div className="flex justify-between">
                    <label className="text-xs font-medium text-gray-500">Model</label>
                 </div>
                 <div className="relative">
                    <div className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#0a0a0a] flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-[8px] font-bold">
                                OpenAI
                             </div>
                             <span className="font-medium">GPT-5.1</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                 </div>

                 <div className="mt-2 p-2 bg-pink-50 dark:bg-pink-900/10 rounded-lg flex items-center justify-between">
                    <div className="text-xs">
                        <span className="text-gray-900 dark:text-white font-medium">Upgrade for more</span>
                        <span className="text-pink-600 dark:text-pink-400 block">advanced models</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm text-xs font-bold hover:bg-gray-50 dark:hover:bg-[#111]">
                        <ArrowUpCircle className="w-3 h-3" />
                        Upgrade
                    </button>
                 </div>
             </div>

             {/* AI Actions */}
             <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">AI Actions</label>
                <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-[#111] cursor-pointer transition-colors">
                    Add your first action
                </div>
             </div>

             {/* Instructions */}
             <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-500">Instructions (System prompt)</label>
                    <button className="text-gray-400 hover:text-gray-600">
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-[#111] flex items-center justify-between text-xs font-medium">
                        <span>Base Instructions</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                    <textarea 
                        className="w-full p-3 text-sm min-h-[200px] resize-none focus:outline-none bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 leading-relaxed font-mono"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>
             </div>
        </div>

      </div>

      {/* Right Panel: Preview Area */}
      <div className="flex-1 bg-gray-50 dark:bg-[#111] relative overflow-hidden flex flex-col">
          {/* Dotted Background */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                backgroundImage: `radial-gradient(circle, #ddd 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
                }}
            />
         </div>

         {/* Chat Canvas */}
         <div className="flex-1 flex items-center justify-center p-8">
             <div className="w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-[600px] relative z-10">
                 {/* Chat Header */}
                 <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-[#3B81F6] text-white rounded-t-2xl flex items-center justify-between">
                     <span className="font-semibold">Melissa</span>
                     <RotateCcw className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
                 </div>

                 {/* Messages */}
                 <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center text-xs">
                            🤖
                         </div>
                         <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-800 dark:text-gray-200">
                             <div className="text-xs font-bold mb-1 opacity-50">Melissa</div>
                             Hi! What can I help you with?
                         </div>
                    </div>
                 </div>

                 {/* Disclaimer */}
                 <div className="px-4 py-2 flex justify-center">
                     <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-300 rounded-sm inline-block"></span>
                        Powered by Chatbase
                     </div>
                 </div>

                 {/* Input */}
                 <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Message..."
                            className="w-full pl-4 pr-10 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all shadow-sm"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        </button>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}