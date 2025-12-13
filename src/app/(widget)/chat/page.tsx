"use client";

import { useState } from "react";
import { MessageCircle, Home, Truck, HelpCircle, Search, ChevronRight } from "lucide-react";

// Colors derived from your screenshot
const THEME_BG = "bg-[#1a1a1a]"; // Main dark background
const ACCENT_COLOR = "bg-[#2d2d2d]"; // Slightly lighter for cards

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

// ============================
// --- SUB-COMPONENTS ---
// ============================

// The content for the first tab (Screenshot 1)
function HomeView() {
    return (
        <div className="space-y-6">
            {/* Greeting Card */}
            <div className={`${ACCENT_COLOR} p-5 rounded-xl border border-gray-800`}>
                <h2 className="text-base font-normal mb-2 text-gray-200 leading-relaxed">
                    Hello 👋 I'm Beanie, here to help you with all things coffee! How can I make your coffee experience better today?
                </h2>
            </div>

            {/* Contact Section */}
            <div>
                 <h3 className="text-sm font-bold text-white mb-3 ml-1">Contact us</h3>
                 <div className={`${ACCENT_COLOR} p-3 rounded-xl flex gap-3`}>
                    <button className="flex-1 bg-white text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition text-sm">
                        <span>Send us a message</span>
                    </button>
                    {/* Social Icons Placeholders */}
                    <div className="flex gap-2">
                        <SocialButton color="bg-[#25D366]" icon="WA" /> {/* WhatsApp Green */}
                        <SocialButton color="bg-yellow-500" icon="EM" />
                        <SocialButton color="bg-pink-600" icon="IG" />
                    </div>
                 </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search for help"
                    className={`w-full ${ACCENT_COLOR} text-white pl-12 pr-4 py-3.5 rounded-xl border border-transparent focus:border-gray-600 focus:outline-none placeholder-gray-500 text-sm font-medium`}
                />
            </div>

            {/* FAQ Links */}
            <div className={`${ACCENT_COLOR} rounded-xl overflow-hidden`}>
                <FaqItem text="How do I sign up for a subscription to your coffee beans?" />
                <FaqItem text="Is self-pickup available?" />
                <FaqItem text="Do you offer shipping within Malaysia and internationally?" isLast />
            </div>
        </div>
    )
}

// The content for the second tab (Screenshot 2)
function MessageView() {
    return (
        <div className="space-y-4">
             <div className={`${ACCENT_COLOR} p-5 rounded-xl text-gray-200 text-sm`}>
                <p className="mb-4">Please enter your email to stay updated with our replies.</p>
                {/* We will connect these forms to the database later */}
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full mt-2 bg-[#3d3d3d] border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white focus:outline-none transition"
                />
                 <input
                    type="text"
                    placeholder="Phone number (+60)"
                    className="w-full mt-3 bg-[#3d3d3d] border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white focus:outline-none transition"
                />
                <button className="w-full mt-4 bg-white text-black font-bold py-3.5 rounded-lg hover:bg-gray-200 transition">
                    Start chat
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                    By sending a message, you agree to our privacy policy.
                </p>
             </div>
        </div>
    )
}

// ============================
// --- HELPER COMPONENTS ---
// ============================

// A reusable button for the bottom navigation
function NavButton({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1.5 transition ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}

// A reusable button for social media links
function SocialButton({ color, icon }: any) {
    return (
        <div className={`${color} w-12 h-full rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition`}>
            <span className="text-white text-xs font-bold">{icon}</span>
        </div>
    )
}

// A reusable list item for the FAQ section
function FaqItem({ text, isLast }: any) {
    return (
        <div className={`p-4 flex justify-between items-start cursor-pointer hover:bg-[#363636] transition group ${!isLast ? 'border-b border-gray-700' : ''}`}>
            <span className="text-sm font-medium text-gray-200 pr-4 leading-tight">{text}</span>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-gray-300" />
        </div>
    )
}