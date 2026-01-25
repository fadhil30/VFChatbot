"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgentAppearanceForm } from "@/components/onboarding/agent-setup/AgentAppearanceForm";
import { ChatPreview } from "@/components/onboarding/agent-setup/ChatPreview";

export default function AgentSetupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B81F6");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: Save agent settings to database
    // For now, simple simulation since we don't have the API yet
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex">
      {/* Left Panel: Configuration */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md">
          <AgentAppearanceForm
            name={name}
            primaryColor={primaryColor}
            theme={theme}
            onNameChange={setName}
            onColorChange={setPrimaryColor}
            onThemeChange={setTheme}
          />

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Looks good"}
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

        {/* Preview Content */}
        <div className="relative z-10 scale-90 lg:scale-100 transition-transform">
          <ChatPreview 
            name={name || "Agent"} 
            primaryColor={primaryColor} 
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
