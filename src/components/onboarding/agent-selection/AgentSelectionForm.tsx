"use client";

import { useState } from "react";
import { ChevronDown, Search, ArrowUpCircle, X } from "lucide-react";

interface AgentSelectionFormProps {
  model: string;
  instructions: string;
  onModelChange: (model: string) => void;
  onInstructionsChange: (instructions: string) => void;
}

const MODELS = [
  { id: "gpt-5.1", name: "GPT-5.1", provider: "OpenAI" },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI" },
  { id: "gpt-5.2", name: "GPT-5.2", provider: "OpenAI" },
  { id: "gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI" },
];

const TEMPLATES = [
  {
    id: "general",
    label: "General AI agent",
    text: "### Role\n- Primary Function: You are an AI agent who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times. Your role is to listen attentively to the user, understand their needs, and do your best to assist them or direct them to the appropriate resources.",
  },
  {
    id: "support",
    label: "Customer support agent",
    text: "### Role\n- Primary Function: You are a customer support specialist. Be polite, patient, and solution-oriented. Prioritize resolving user issues efficiently.",
  },
  {
    id: "sales",
    label: "Sales agent",
    text: "### Role\n- Primary Function: You are a sales representative. Your goal is to understand customer needs and recommend the best products. Be persuasive but helpful, not pushy.",
  },
];

export function AgentSelectionForm({
  model,
  instructions,
  onModelChange,
  onInstructionsChange,
}: AgentSelectionFormProps) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateLabel, setSelectedTemplateLabel] = useState("General AI agent");

  const filteredModels = MODELS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateSelect = (template: typeof TEMPLATES[0]) => {
    onInstructionsChange(template.text);
    setSelectedTemplateLabel(template.label);
    setIsTemplateOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Agent&apos;s personality
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select a prompt, customize the instructions, and choose your model.
        </p>
      </div>

      <div className="space-y-6">
        {/* Model Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model
          </label>
          <div
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="w-full p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#0a0a0a] cursor-pointer flex items-center justify-between hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-[10px] font-bold">
                 OpenAI
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {MODELS.find((m) => m.id === model)?.name || model}
              </span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {/* Upgrade Banner (Visual only) */}
           <div className="mt-2 p-3 bg-pink-50 dark:bg-pink-900/10 rounded-xl flex items-center justify-between">
              <div className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white block">Upgrade for more</span>
                  <span className="text-pink-600 dark:text-pink-400">advanced models</span>
              </div>
              <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium transition-colors">
                      <ArrowUpCircle className="w-4 h-4" />
                      Upgrade
                  </button>
                  <button className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded">
                      <X className="w-4 h-4 text-gray-400" />
                  </button>
              </div>
           </div>

          {/* Model Dropdown */}
          {isModelOpen && (
            <div className="absolute top-[80px] left-0 right-0 z-50 mt-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-[#111] rounded-lg">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Models..."
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-900 dark:text-white placeholder-gray-400"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto p-1">
                {filteredModels.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onModelChange(m.id);
                      setIsModelOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left ${
                      model === m.id
                        ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111]"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[8px]">
                        AI
                    </div>
                    {m.name}
                    {model === m.id && (
                        <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instructions
          </label>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#0a0a0a] overflow-hidden">
            {/* Template Dropdown Trigger */}
            <div 
                onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                className="w-full px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#111] transition-colors border-b border-gray-100 dark:border-gray-800"
            >
                <span className="font-medium text-gray-900 dark:text-white">
                    {selectedTemplateLabel}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Dropdown Menu */}
            {isTemplateOpen && (
                <div className="absolute top-[80px] left-0 right-0 z-50 mt-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-1">
                        {TEMPLATES.map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleTemplateSelect(t)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left ${
                                    selectedTemplateLabel === t.label
                                    ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111]"
                                }`}
                            >
                                {t.label}
                                {selectedTemplateLabel === t.label && (
                                    <span className="text-blue-600">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Instruction Textarea */}
            <div className="p-4 bg-gray-50 dark:bg-[#111]/50">
              <textarea
                value={instructions}
                onChange={(e) => onInstructionsChange(e.target.value)}
                rows={8}
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700 dark:text-gray-300 resize-none font-mono leading-relaxed placeholder-gray-400"
                placeholder="Enter instructions..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
