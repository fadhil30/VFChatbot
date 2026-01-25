"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Type,
  Globe,
  HelpCircle,
  Plus,
  X,
} from "lucide-react";
import { FileDialog } from "@/components/onboarding/manual/FileDialog";
import { TextDialog } from "@/components/onboarding/manual/TextDialog";
import { WebsiteDialog } from "@/components/onboarding/manual/WebsiteDialog";
import { QnADialog } from "@/components/onboarding/manual/QnADialog";

type SourceType = "FILE" | "TEXT" | "WEBSITE" | "QNA";

interface TrainingSource {
  id: string;
  type: SourceType;
  content: string;
  title?: string;
  fileName?: string;
  fileSize?: number;
  question?: string;
  answer?: string;
}

const SOURCE_TYPES = [
  { type: "FILE" as const, label: "File", icon: FileText },
  { type: "TEXT" as const, label: "Text", icon: Type },
  { type: "WEBSITE" as const, label: "Website", icon: Globe },
  { type: "QNA" as const, label: "Q&A", icon: HelpCircle },
];

export default function ManualOnboardingPage() {
  const router = useRouter();
  const [sources, setSources] = useState<TrainingSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState<SourceType | null>(null);

  const totalSize = sources.reduce((acc, s) => acc + (s.fileSize || s.content.length), 0);
  const maxSize = 10 * 1024 * 1024; // 10 MB

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
    setIsLoading(true);

    // If no sources are provided, just proceed to agent setup (skip training)
    if (sources.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push("/onboarding/agent-setup");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch("/api/onboarding/create-manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sources }),
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

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            You can add multiple sources to train your Agent, let&apos;s start with a{" "}
            <span className="text-blue-600 dark:text-blue-400">file</span> or a{" "}
            <span className="text-blue-600 dark:text-blue-400">link to your site</span>.
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
                <span className="font-medium text-gray-900 dark:text-white">{label}</span>
              </div>
              <Plus className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Training..." : "Train & continue"}
        </button>

        {/* Back link */}
        <button
          type="button"
          onClick={() => router.push("/onboarding")}
          className="w-full text-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
        >
          ← Back to quick setup
        </button>

        {/* Sources Panel */}
        {sources.length > 0 && (
          <div className="mt-8 p-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sources</h3>
            <div className="space-y-2 mb-4">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg"
                >
                  <div className="flex items-center gap-2 text-sm">
                    {source.type === "FILE" && <FileText className="w-4 h-4 text-gray-500" />}
                    {source.type === "TEXT" && <Type className="w-4 h-4 text-gray-500" />}
                    {source.type === "WEBSITE" && <Globe className="w-4 h-4 text-gray-500" />}
                    {source.type === "QNA" && <HelpCircle className="w-4 h-4 text-gray-500" />}
                    <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                      {source.fileName || source.title || source.content.slice(0, 30) || source.question}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSource(source.id)}
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
        )}
      </div>
    </>
  );
}

