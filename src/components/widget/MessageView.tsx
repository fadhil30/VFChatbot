
const ACCENT_COLOR = "bg-[#2d2d2d]";

export function MessageView() {
    return (
        <div className="space-y-4">
             <div className={`${ACCENT_COLOR} p-5 rounded-xl text-gray-200 text-sm`}>
                <p className="mb-4">Please enter your email to stay updated with our replies.</p>
                {/* We will connect these forms to the database later */}
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full mt-2 bg-[#3d3d3d] border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white focus:outline-none transition"
                />
                 <input
                    type="text"
                    placeholder="Phone number (+60)"
                    className="w-full mt-3 bg-[#3d3d3d] border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white focus:outline-none transition"
                />
                <button className="w-full mt-4 bg-white text-black font-bold py-3.5 rounded-lg hover:bg-gray-200 transition">
                    Start chat
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                    By sending a message, you agree to our privacy policy.
                </p>
             </div>
        </div>
    )
}
