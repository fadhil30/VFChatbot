import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalConversations: number;
  totalMessages: number;
  leadsCount: number;
  chatbotCount: number;
}

async function fetchStats(): Promise<DashboardStats> {
  const response = await fetch("/api/user/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
    // Refetch stats every 30 seconds for real-time dashboard
    refetchInterval: 30 * 1000,
  });
}
