"use client";

import { FileText, Type, Globe, HelpCircle, X } from "lucide-react";
import { SourcesListProps, TrainingSource } from "@/types";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getSourceIcon(type: TrainingSource["type"]) {
  switch (type) {
    case "FILE":
      return <FileText className="w-4 h-4 text-gray-500" />;
    case "TEXT":
      return <Type className="w-4 h-4 text-gray-500" />;
    case "WEBSITE":
      return <Globe className="w-4 h-4 text-gray-500" />;
    case "QNA":
      return <HelpCircle className="w-4 h-4 text-gray-500" />;
  }
}

function getSourceLabel(source: TrainingSource): string {
  return (
    source.fileName ||
    source.title ||
    source.content.slice(0, 30) ||
    source.question ||
    ""
  );
}

export function SourcesList({
  sources,
  onRemoveSource,
  totalSize,
  maxSize,
}: SourcesListProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-8 p-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
        Sources
      </h3>
      <div className="space-y-2 mb-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg"
          >
            <div className="flex items-center gap-2 text-sm">
              {getSourceIcon(source.type)}
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                {getSourceLabel(source)}
              </span>
            </div>
            <button
              onClick={() => onRemoveSource(source.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Total size</span>
        <span>
          {formatSize(totalSize)} / {formatSize(maxSize)}
        </span>
      </div>
      {/* Progress bar */}
      <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white transition-all"
          style={{ width: `${Math.min((totalSize / maxSize) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
