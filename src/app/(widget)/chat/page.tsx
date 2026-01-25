"use client";

import { useState } from "react";
import { MessageCircle, Home, Truck, HelpCircle } from "lucide-react";
import { NavButton } from "@/components/widget/NavButton";
import { HomeView } from "@/components/widget/HomeView";
import { MessageView } from "@/components/widget/MessageView";

// Colors derived from your screenshot
const THEME_BG = "bg-[#1a1a1a]"; // Main dark background

export default function ChatPage() {
  // State to handle switching between tabs
  const [activeTab, setActiveTab] = useState("home");

  return (
    // Main container: dark background, takes full screen height, hidden overflow
    <div className={`flex flex-col h-screen ${THEME_BG} text-white font-sans overflow-hidden`}>

      {/* --- HEADER (Top Bar) --- */}
      <header className={`px-5 py-4 flex justify-between items-center ${THEME_BG}`}>
        <div>
           <h1 className="text-lg font-bold tracking-wide">Bean Brothers Team</h1>
           <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
               {/* Green online indicator */ }
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               We are online
           </div>
        </div>
      </header>

      {/* --- MAIN SCROLLABLE CONTENT --- */}
      {/* flex-1 means it takes remaining vertical space. overflow-y-auto lets it scroll. */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'message' && <MessageView />}
        {/* Placeholders for later */}
        {activeTab === 'track' && <div className="text-center mt-10 text-gray-500">Tracking feature coming soon.</div>}
        {activeTab === 'help' && <div className="text-center mt-10 text-gray-500">Help center coming soon.</div>}
      </main>

      {/* --- BOTTOM NAVIGATION --- */}
      <nav className={`border-t border-gray-800 py-3 px-6 flex justify-between items-center text-[10px] text-gray-500 ${THEME_BG}`}>
        <NavButton icon={<Home size={24} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton icon={<MessageCircle size={24} />} label="Message" active={activeTab === 'message'} onClick={() => setActiveTab('message')} />
        <NavButton icon={<Truck size={24} />} label="Track" active={activeTab === 'track'} onClick={() => setActiveTab('track')} />
        <NavButton icon={<HelpCircle size={24} />} label="Help" active={activeTab === 'help'} onClick={() => setActiveTab('help')} />
      </nav>
    </div>
  );
}
