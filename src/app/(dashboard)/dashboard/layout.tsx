"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { History, BookOpen, CircleHelp } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white dark:bg-[#0a0a0a]">
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="hover:text-gray-900 cursor-pointer">User</span>
              <span>/</span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1a1a1a] rounded text-gray-900 dark:text-white font-medium">
                Melissa <span className="text-xs text-gray-400 font-normal ml-1">Agent</span>
              </span>
           </div>

           {/* Utility Icons */}
           <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <History className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <BookOpen className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <CircleHelp className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-black">
                  U
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
            {children}
        </main>
      </div>
    </div>
  );
}
