"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgentSelectionForm } from "@/components/onboarding/agent-selection/AgentSelectionForm";
import { AgentConnectionPreview } from "@/components/onboarding/agent-selection/AgentConnectionPreview";

export default function AgentSelectionPage() {
  const router = useRouter();
  const [model, setModel] = useState("gpt-5.1");
  const [instructions, setInstructions] = useState(
    "### Role\n- Primary Function: You are an AI agent who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times."
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
        const response = await fetch("/api/onboarding/complete", {
            method: "POST",
        });

        if (response.ok) {
            router.push("/onboarding/plans");
        }
    } catch (error) {
        console.error("Error completing setup:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex">
      {/* Left Panel: Configuration */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md">
          <AgentSelectionForm
            model={model}
            instructions={instructions}
            onModelChange={setModel}
            onInstructionsChange={setInstructions}
          />

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Confirm settings"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100/50 dark:bg-[#111] relative overflow-hidden">
        {/* Decorative dots background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #ddd 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Connection Preview */}
        <div className="relative z-10 w-full h-full p-12">
            <AgentConnectionPreview model={model} />
        </div>
      </div>
    </div>
  );
}
