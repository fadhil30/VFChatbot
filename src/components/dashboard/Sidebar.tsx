"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Play, 
  Activity, 
  BarChart2, 
  Database, 
  Zap, 
  Users, 
  Rocket, 
  Settings,
  ArrowUpCircle
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Playground", icon: Play, href: "/dashboard" },
  { label: "Activity", icon: Activity, href: "/dashboard/activity" },
  { label: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { label: "Data sources", icon: Database, href: "/dashboard/sources" },
  { label: "Actions", icon: Zap, href: "/dashboard/actions" },
  { label: "Contacts", icon: Users, href: "/dashboard/contacts" },
  { label: "Deploy", icon: Rocket, href: "/dashboard/deploy" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex flex-col h-screen sticky top-0">
        {/* Header / Logo Area */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-900 lg:border-none">
             {/* Simple Logo Placeholder */}
             <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-xs">VF</span>
             </div>
             <span className="font-bold text-lg text-gray-900 dark:text-white">Chatbot</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive 
                            ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white" 
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#111]"
                        }`}
                    >
                        <item.icon className={`w-4 h-4 ${isActive ? "text-gray-900 dark:text-white" :  "text-gray-400"}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        {/* Credits Widget */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-900">
            <div className="bg-gray-50 dark:bg-[#111] rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Credits</span>
                    <span className="text-xs text-gray-500">0/50</span>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-black dark:bg-white w-0" />
                </div>
                
                <div className="flex flex-col gap-1">
                     <span className="text-[10px] text-gray-400">Resets on Feb 1, 2026</span>
                     <button className="flex items-center justify-center gap-2 w-full mt-2 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-[#222] transition-colors">
                        <ArrowUpCircle className="w-3 h-3" />
                        Upgrade
                     </button>
                </div>
            </div>
        </div>
    </div>
  );
}
