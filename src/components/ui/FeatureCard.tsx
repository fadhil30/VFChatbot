import { FeatureCardProps } from "@/types";

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition group">
      <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
