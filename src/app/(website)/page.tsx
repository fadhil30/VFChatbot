import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">

      {/* Navbar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <span>Chatty</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition">Log in</Link>
          <Link href="/register" className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition">
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New: GPT-4o Integration
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          The Customer Support AI <br /> You Actually Want.
        </h1>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
          Train a custom chatbot on your website data in minutes. Embed it anywhere.
          Capture leads and answer questions 24/7 automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition flex items-center justify-center gap-2">
            Create Your Bot <ArrowRight size={18} />
          </Link>
          <Link href="/chat" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
            View Demo Widget
          </Link>
        </div>

        {/* Feature Grid (Visual Filler) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full text-left">
           <FeatureCard
             icon={<Zap size={24} className="text-yellow-400"/>}
             title="Instant Setup"
             desc="Just enter your website URL. We scrape it and train the AI instantly."
           />
           <FeatureCard
             icon={<MessageSquare size={24} className="text-blue-400"/>}
             title="Natural Chat"
             desc="Uses the latest LLMs to understand context, tone, and nuance."
           />
           <FeatureCard
             icon={<ShieldCheck size={24} className="text-green-400"/>}
             title="Secure & Private"
             desc="Your data is encrypted and isolated. We value privacy first."
           />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        &copy; 2024 Chatty AI Inc. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition group">
            <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}
