"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const USE_CASES = [
  { value: "GENERAL_AI_AGENT", label: "General AI agent" },
  { value: "CUSTOMER_SUPPORT", label: "Customer support" },
  { value: "SALES_AGENT", label: "Sales agent" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [protocol, setProtocol] = useState("https://");
  const [useCase, setUseCase] = useState(USE_CASES[0].value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);

    // If no URL is provided, just proceed to agent setup (skip training)
    if (!url) {
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push("/onboarding/agent-setup");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch("/api/onboarding/create-from-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: `${protocol}${url}`,
          useCase,
        }),
      });

      if (response.ok) {
        router.push("/onboarding/agent-setup");
      }
    } catch (error) {
      console.error("Error creating chatbot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Let&apos;s start with a link
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          We&apos;ll use this to train your Agent on what your website is about.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Link to website
          </label>
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-[#0a0a0a] focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white focus-within:border-transparent">
            <div className="relative">
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="h-full px-3 py-2 bg-gray-50 dark:bg-[#111] border-r border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm appearance-none pr-8 cursor-pointer focus:outline-none"
              >
                <option value="https://">https://</option>
                <option value="http://">http://</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="www.example.com"
              className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Use Case Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What will be the primary use-case?
          </label>
          <div className="relative">
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              {USE_CASES.map((uc) => (
                <option key={uc.value} value={uc.value}>
                  {uc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Continue"}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-[#0a0a0a] text-gray-500">OR</span>
          </div>
        </div>

        {/* Manual Setup Button */}
        <button
          type="button"
          onClick={() => router.push("/onboarding/manual")}
          className="w-full py-3 px-4 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-[#111] transition-colors"
        >
          Set up manually with other sources
        </button>
      </form>
    </div>
  );
}
