import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Check if user has completed onboarding
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { chatbots: true },
  });

  if (!user?.hasCompletedOnboarding) {
    redirect("/onboarding");
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 mt-2">Overview of your chatbot performance</p>
          </div>
          <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg font-medium text-sm">
            + New Chatbot
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Conversations" value="0" />
          <StatCard label="Avg. Response Time" value="--" />
          <StatCard label="Leads Captured" value="0" />
        </div>

        {/* Chatbots List or Empty State */}
        {user.chatbots.length === 0 ? (
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">🤖</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No chatbots created yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Create your first AI chatbot to start engaging with visitors on your website.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.chatbots.map((chatbot) => (
              <div key={chatbot.id} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-lg">🤖</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{chatbot.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{chatbot.useCase.replace(/_/g, " ").toLowerCase()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
  );
}