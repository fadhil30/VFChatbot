"use client";

import { RotateCcw, Sun, Moon, Upload } from "lucide-react";

interface AgentAppearanceFormProps {
  name: string;
  primaryColor: string;
  theme: "light" | "dark";
  onNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
  onThemeChange: (theme: "light" | "dark") => void;
}

export function AgentAppearanceForm({
  name,
  primaryColor,
  theme,
  onNameChange,
  onColorChange,
  onThemeChange,
}: AgentAppearanceFormProps) {
  // Predefined colors for quick selection
  const colors = [
    "#3B81F6", // Blue
    "#10B981", // Emerald
    "#8B5CF6", // Violet
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
    "#111827", // Gray/Black
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Agent&apos;s UI</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Style your agent to match your brand. You can customize it further in the settings later.
        </p>
      </div>

      <div className="space-y-6">
        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Agent name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="e.g. Sales Assistant"
          />
        </div>

        {/* Appearance (Theme) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Appearance
          </label>
          <div className="flex bg-gray-100 dark:bg-[#1a1a1a] rounded-lg p-1 w-fit">
            <button
              onClick={() => onThemeChange("light")}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                theme === "light"
                  ? "bg-white dark:bg-[#2d2d2d] shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                theme === "dark"
                  ? "bg-white dark:bg-[#2d2d2d] shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary color
          </label>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a]">
              <div
                className="w-6 h-6 rounded-md border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: primaryColor }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-20 bg-transparent border-none text-sm text-gray-900 dark:text-white focus:outline-none uppercase"
              />
              <button
                onClick={() => onColorChange("#3B81F6")} // Reset to default blue
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-500"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            {/* Color Swatches */}
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    primaryColor === color
                      ? "border-black dark:border-white ring-2 ring-offset-2 ring-transparent"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile picture
          </label>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-[#111] transition-colors text-sm font-medium text-gray-700 dark:text-white">
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Supports JPG, PNG, and SVG up to 1MB
          </p>
        </div>
      </div>
    </div>
  );
}
