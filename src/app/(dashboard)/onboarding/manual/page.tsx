"use client";

import { useState } from "react";
import { FileText, Type, Globe, HelpCircle, Plus } from "lucide-react";
import { FileDialog } from "@/components/features/onboarding/FileDialog";
import { TextDialog } from "@/components/features/onboarding/TextDialog";
import { WebsiteDialog } from "@/components/features/onboarding/WebsiteDialog";
import { QnADialog } from "@/components/features/onboarding/QnADialog";
import { SourcesList } from "@/components/features/onboarding/SourcesList";
import { useCreateChatbotManual } from "@/hooks/mutations/useCreateChatbot";
import { TrainingSource, SourceType, SourceTypeConfig } from "@/types";
import Link from "next/link";

const SOURCE_TYPES: SourceTypeConfig[] = [
  { type: "FILE", label: "File", icon: FileText },
  { type: "TEXT", label: "Text", icon: Type },
  { type: "WEBSITE", label: "Website", icon: Globe },
  { type: "QNA", label: "Q&A", icon: HelpCircle },
];

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ManualOnboardingPage() {
  const [sources, setSources] = useState<TrainingSource[]>([]);
  const [openDialog, setOpenDialog] = useState<SourceType | null>(null);

  const createChatbot = useCreateChatbotManual();

  const totalSize = sources.reduce(
    (acc, s) => acc + (s.fileSize || s.content.length),
    0
  );

  const handleAddFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSources((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "FILE",
            content: reader.result as string,
            fileName: file.name,
            fileSize: file.size,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddText = (title: string, content: string) => {
    setSources((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "TEXT",
        title,
        content,
      },
    ]);
  };

  const handleAddWebsite = (url: string) => {
    setSources((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "WEBSITE",
        content: url,
      },
    ]);
  };

  const handleAddQnA = (title: string, question: string, answer: string) => {
    setSources((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "QNA",
        title,
        content: "",
        question,
        answer,
      },
    ]);
  };

  const removeSource = (id: string) => {
    setSources(sources.filter((s) => s.id !== id));
  };

  const handleSubmit = async () => {
    if (sources.length === 0) return;
    createChatbot.mutate({ sources });
  };

  return (
    <>
      {/* Dialogs */}
      <FileDialog
        isOpen={openDialog === "FILE"}
        onClose={() => setOpenDialog(null)}
        onAddFiles={handleAddFiles}
      />
      <TextDialog
        isOpen={openDialog === "TEXT"}
        onClose={() => setOpenDialog(null)}
        onAddText={handleAddText}
      />
      <WebsiteDialog
        isOpen={openDialog === "WEBSITE"}
        onClose={() => setOpenDialog(null)}
        onAddWebsite={handleAddWebsite}
      />
      <QnADialog
        isOpen={openDialog === "QNA"}
        onClose={() => setOpenDialog(null)}
        onAddQnA={handleAddQnA}
      />

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Add training sources
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            You can add multiple sources to train your Agent, let&apos;s start
            with a{" "}
            <span className="text-blue-600 dark:text-blue-400">file</span> or a{" "}
            <span className="text-blue-600 dark:text-blue-400">
              link to your site
            </span>
            .
          </p>
        </div>

        {/* Source Types List */}
        <div className="space-y-1">
          {SOURCE_TYPES.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => setOpenDialog(type)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {label}
                </span>
              </div>
              <Plus className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Error message */}
        {createChatbot.error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {createChatbot.error.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={sources.length === 0 || createChatbot.isPending}
          className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createChatbot.isPending ? "Training..." : "Train & continue"}
        </button>

        {/* Back link */}
        <Link
          href="/onboarding"
          className="block w-full text-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
        >
          ← Back to quick setup
        </Link>

        {/* Sources Panel */}
        <SourcesList
          sources={sources}
          onRemoveSource={removeSource}
          totalSize={totalSize}
          maxSize={MAX_SIZE}
        />
      </div>
    </>
  );
}
