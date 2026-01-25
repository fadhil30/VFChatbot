"use client";

import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { RichTextToolbar } from "@/components/ui/RichTextToolbar";
import { QnADialogProps } from "@/types";

export function QnADialog({ isOpen, onClose, onAddQnA }: QnADialogProps) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (question.trim() && answer.trim()) {
      onAddQnA(title, question, answer);
      setTitle("");
      setQuestion("");
      setAnswer("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 pr-16">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Q&A
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Craft responses for key questions, ensuring your AI shares relevant
            info.
          </p>
          <button className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Info className="w-4 h-4" />
            Learn more
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <CollapsibleSection title="Add Q&A">
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

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: How do I request a refund?"
                  className="w-full px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
                <button
                  type="button"
                  className="mt-2 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <Plus className="w-4 h-4" />
                  Add question
                </button>
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Answer
                </label>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                  <RichTextToolbar />
                  <div className="relative">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      rows={6}
                      className="w-full px-3 py-3 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none"
                    />
                    <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {answer.length} B
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!question.trim() || !answer.trim()}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium disabled:cursor-not-allowed transition-colors"
                >
                  Add Q&A
                </button>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </Modal>
  );
}
