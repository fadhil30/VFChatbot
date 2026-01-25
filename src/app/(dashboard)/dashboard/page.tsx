"use client";

import { redirect } from "next/navigation";
import { useChatbots } from "@/hooks/queries/useChatbots";
import { useDashboardStats } from "@/hooks/queries/useDashboardStats";
import { StatCard } from "@/components/ui/StatCard";
import { Chatbot } from "@prisma/client";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const {
    data: chatbotsData,
    isLoading: chatbotsLoading,
    error: chatbotsError,
  } = useChatbots();

  const {
    data: statsData,
    isLoading: statsLoading,
  } = useDashboardStats();

  // Redirect if not onboarded (after data loads)
  if (chatbotsData && !chatbotsData.hasCompletedOnboarding) {
    redirect("/onboarding");
  }

  if (chatbotsLoading) {
    return <LoadingState />;
  }

  if (chatbotsError) {
    return <ErrorState message="Failed to load dashboard" />;
  }

  const chatbots = chatbotsData?.chatbots || [];

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Overview of your chatbot performance
            </p>
          </div>
          <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg font-medium text-sm">
            + New Chatbot
          </button>
        </div>

        {/* Stats Grid - with real data from API */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Conversations"
            value={
              statsLoading
                ? "..."
                : String(statsData?.totalConversations || 0)
            }
          />
          <StatCard
            label="Avg. Response Time"
            value="--"
          />
          <StatCard
            label="Leads Captured"
            value={
              statsLoading ? "..." : String(statsData?.leadsCount || 0)
            }
          />
        </div>

        {/* Chatbots List or Empty State */}
        {chatbots.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatbotGrid chatbots={chatbots} />
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">
        🤖
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        No chatbots created yet
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Create your first AI chatbot to start engaging with visitors on your
        website.
      </p>
    </div>
  );
}

function ChatbotGrid({ chatbots }: { chatbots: Chatbot[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chatbots.map((chatbot) => (
        <div
          key={chatbot.id}
          className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {chatbot.name}
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            {chatbot.useCase.replace(/_/g, " ").toLowerCase()}
          </p>
        </div>
      ))}
    </div>
  );
}
