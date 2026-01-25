import { useQuery } from "@tanstack/react-query";
import { Chatbot } from "@prisma/client";

interface ChatbotsResponse {
  chatbots: Chatbot[];
  hasCompletedOnboarding: boolean;
}

async function fetchChatbots(): Promise<ChatbotsResponse> {
  const response = await fetch("/api/user/chatbots");
  if (!response.ok) {
    throw new Error("Failed to fetch chatbots");
  }
  return response.json();
}

export function useChatbots() {
  return useQuery({
    queryKey: ["chatbots"],
    queryFn: fetchChatbots,
  });
}
