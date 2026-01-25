import { LucideIcon } from "lucide-react";

// ============ TRAINING SOURCE TYPES ============
export type SourceType = "FILE" | "TEXT" | "WEBSITE" | "QNA";

export interface TrainingSource {
  id: string;
  type: SourceType;
  content: string;
  title?: string;
  fileName?: string;
  fileSize?: number;
  question?: string;
  answer?: string;
}

export interface SourceTypeConfig {
  type: SourceType;
  label: string;
  icon: LucideIcon;
}

// ============ COMPONENT PROPS ============
export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface StatCardProps {
  label: string;
  value: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

// ============ DIALOG PROPS ============
export interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFiles: (files: FileList) => void;
}

export interface TextDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddText: (title: string, content: string) => void;
}

export interface WebsiteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWebsite: (url: string) => void;
}

export interface QnADialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQnA: (title: string, question: string, answer: string) => void;
}

export interface SourcesListProps {
  sources: TrainingSource[];
  onRemoveSource: (id: string) => void;
  totalSize: number;
  maxSize: number;
}
