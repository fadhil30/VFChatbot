"use client";

import { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { WebsiteDialogProps } from "@/types";

type ActiveTab = "crawl" | "sitemap" | "individual";

export function WebsiteDialog({
  isOpen,
  onClose,
  onAddWebsite,
}: WebsiteDialogProps) {
  const [protocol, setProtocol] = useState("https://");
  const [domain, setDomain] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("crawl");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = () => {
    if (domain.trim()) {
      onAddWebsite(`${protocol}${domain}`);
      setDomain("");
      onClose();
    }
  };

  const tabs = [
    { id: "crawl" as const, label: "Crawl links" },
    { id: "sitemap" as const, label: "Sitemap" },
    { id: "individual" as const, label: "Individual link" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 pr-16">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Website
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Crawl web pages or submit sitemaps to update your AI with the latest
            content.
          </p>
          <button className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Info className="w-4 h-4" />
            Learn more
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <CollapsibleSection title="Add links">
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  URL
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
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="www.example.com"
                    className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Links found during crawling or sitemap retrieval may be
                  updated if new links are discovered or some links are invalid.
                </p>
              </div>

              {/* Advanced Options */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
              >
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                Advanced options
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Include only paths
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: blog/* , dev/*"
                      className="w-full px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Exclude paths
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: blog/* , dev/*"
                      className="w-full px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <input type="checkbox" className="rounded" />
                      Slow scraping
                      <Info className="w-3 h-3" />
                    </label>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!domain.trim()}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium disabled:cursor-not-allowed transition-colors"
                >
                  Fetch links
                </button>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </Modal>
  );
}
