import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TrainingSource } from "@/types";

interface CreateFromWebsiteInput {
  websiteUrl: string;
  useCase: string;
}

interface CreateManualInput {
  sources: TrainingSource[];
}

interface CreateChatbotResponse {
  success: boolean;
  chatbotId: string;
}

async function createFromWebsite(
  input: CreateFromWebsiteInput
): Promise<CreateChatbotResponse> {
  const response = await fetch("/api/onboarding/create-from-website", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create chatbot");
  }
  return response.json();
}

async function createManual(
  input: CreateManualInput
): Promise<CreateChatbotResponse> {
  const response = await fetch("/api/onboarding/create-manual", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create chatbot");
  }
  return response.json();
}

export function useCreateChatbotFromWebsite() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createFromWebsite,
    onSuccess: () => {
      // Invalidate chatbots and stats queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["chatbots"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      router.push("/dashboard");
    },
  });
}

export function useCreateChatbotManual() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createManual,
    onSuccess: () => {
      // Invalidate chatbots and stats queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["chatbots"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      router.push("/dashboard");
    },
  });
}
