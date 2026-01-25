
export function SocialButton({ color, icon }: { color: string, icon: string }) {
    return (
        <div className={`${color} w-12 h-full rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition`}>
            <span className="text-white text-xs font-bold">{icon}</span>
        </div>
    )
}
