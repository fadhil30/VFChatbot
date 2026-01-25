"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { RichTextToolbar } from "@/components/ui/RichTextToolbar";
import { TextDialogProps } from "@/types";

export function TextDialog({ isOpen, onClose, onAddText }: TextDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onAddText(title, content);
      setTitle("");
      setContent("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 pr-16">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Text snippets
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add text snippets to your knowledge base that the agent gets trained
            on.
          </p>
          <button className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Info className="w-4 h-4" />
            Learn more
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <CollapsibleSection title="Add text snippet">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Refund requests"
                  className="w-full px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {/* Rich text editor */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <RichTextToolbar />
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your text content..."
                    rows={8}
                    className="w-full px-3 py-3 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none"
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {content.length} B
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium disabled:cursor-not-allowed transition-colors"
                >
                  Add text snippet
                </button>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </Modal>
  );
}
