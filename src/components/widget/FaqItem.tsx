import { ChevronRight } from "lucide-react";

export function FaqItem({ text, isLast }: { text: string, isLast?: boolean }) {
    return (
        <div className={`p-4 flex justify-between items-start cursor-pointer hover:bg-[#363636] transition group ${!isLast ? 'border-b border-gray-700' : ''}`}>
            <span className="text-sm font-medium text-gray-200 pr-4 leading-tight">{text}</span>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-gray-300" />
        </div>
    )
}
