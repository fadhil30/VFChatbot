"use client";

import { Info, Upload } from "lucide-react";
import { SourceModal } from "./SourceModal";
import { CollapsibleSection } from "./CollapsibleSection";

interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFiles: (files: FileList) => void;
}

export function FileDialog({ isOpen, onClose, onAddFiles }: FileDialogProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
      onClose();
    }
  };

  return (
    <SourceModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 pr-16">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Files</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Upload documents to train your AI. Extract text from PDFs, DOCX, and TXT files.
          </p>
          <button className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Info className="w-4 h-4" />
            Learn more
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <CollapsibleSection title="Add files">
            {/* Warning */}
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                If you are uploading a PDF, make sure you can select/highlight the text.
              </p>
            </div>

            {/* Drop zone */}
            <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors bg-gray-50 dark:bg-[#0a0a0a]">
              <Upload className="w-8 h-8 text-gray-400 mb-3" />
              <span className="text-gray-600 dark:text-gray-400">
                Drag &amp; drop files here, or click to select files
              </span>
              <span className="text-sm text-gray-400 mt-1">
                Supported file types: pdf, doc, docx, txt
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </CollapsibleSection>
        </div>
      </div>
    </SourceModal>
  );
}
