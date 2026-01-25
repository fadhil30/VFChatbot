import { X } from "lucide-react";

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SourceModal({ isOpen, onClose, children }: SourceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {children}
      </div>
    </div>
  );
}
