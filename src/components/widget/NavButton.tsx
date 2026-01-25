
export function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1.5 transition ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}
