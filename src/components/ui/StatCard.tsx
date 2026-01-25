import { StatCardProps } from "@/types";

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </p>
    </div>
  );
}
