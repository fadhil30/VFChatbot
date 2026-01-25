"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCreateChatbotFromWebsite } from "@/hooks/mutations/useCreateChatbot";
import Link from "next/link";

const USE_CASES = [
  { value: "GENERAL_AI_AGENT", label: "General AI agent" },
  { value: "CUSTOMER_SUPPORT", label: "Customer support agent" },
  { value: "SALES_AGENT", label: "Sales agent" },
] as const;

export default function OnboardingPage() {
  const [protocol, setProtocol] = useState("https://");
  const [domain, setDomain] = useState("");
  const [useCase, setUseCase] = useState<string>("GENERAL_AI_AGENT");
  const [isUseCaseOpen, setIsUseCaseOpen] = useState(false);

  const createChatbot = useCreateChatbotFromWebsite();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    createChatbot.mutate({
      websiteUrl: `${protocol}${domain}`,
      useCase,
    });
  };

  const selectedUseCase = USE_CASES.find((uc) => uc.value === useCase);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Let&apos;s start with a link
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Share your website link, and we&apos;ll automatically build an AI
          agent trained on your content.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Website URL Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your website URL
          </label>
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-[#1a1a1a] focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white focus-within:border-transparent">
            {/* Protocol selector */}
            <div className="relative">
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="h-full px-3 py-3 bg-gray-50 dark:bg-[#111] border-r border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm appearance-none pr-8 cursor-pointer focus:outline-none"
              >
                <option value="https://">https://</option>
                <option value="http://">http://</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {/* Domain input */}
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-1 px-3 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Use-case Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Use-case
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUseCaseOpen(!isUseCaseOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg text-left text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <span>{selectedUseCase?.label}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isUseCaseOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isUseCaseOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc.value}
                    type="button"
                    onClick={() => {
                      setUseCase(uc.value);
                      setIsUseCaseOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-[#222] transition-colors ${
                      useCase === uc.value ? "bg-gray-50 dark:bg-[#222]" : ""
                    }`}
                  >
                    <span className="text-gray-900 dark:text-white">
                      {uc.label}
                    </span>
                    {useCase === uc.value && (
                      <svg
                        className="w-5 h-5 text-gray-900 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error message */}
        {createChatbot.error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {createChatbot.error.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!domain.trim() || createChatbot.isPending}
          className="w-full py-3 px-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
        >
          {createChatbot.isPending ? "Creating..." : "Continue"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Manual Setup Link */}
      <Link
        href="/onboarding/manual"
        className="block w-full py-3 px-4 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-[#222] transition-colors text-center"
      >
        Set up manually with other sources
      </Link>
    </div>
  );
}
