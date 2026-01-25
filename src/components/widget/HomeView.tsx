import { Search } from "lucide-react";
import { SocialButton } from "./SocialButton";
import { FaqItem } from "./FaqItem";

const ACCENT_COLOR = "bg-[#2d2d2d]";

export function HomeView() {
    return (
        <div className="space-y-6">
            {/* Greeting Card */}
            <div className={`${ACCENT_COLOR} p-5 rounded-xl border border-gray-800`}>
                <h2 className="text-base font-normal mb-2 text-gray-200 leading-relaxed">
                    Hello 👋 I&apos;m Beanie, here to help you with all things coffee! How can I make your coffee experience better today?
                </h2>
            </div>

            {/* Contact Section */}
            <div>
                 <h3 className="text-sm font-bold text-white mb-3 ml-1">Contact us</h3>
                 <div className={`${ACCENT_COLOR} p-3 rounded-xl flex gap-3`}>
                    <button className="flex-1 bg-white text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition text-sm">
                        <span>Send us a message</span>
                    </button>
                    {/* Social Icons Placeholders */}
                    <div className="flex gap-2">
                        <SocialButton color="bg-[#25D366]" icon="WA" /> {/* WhatsApp Green */}
                        <SocialButton color="bg-yellow-500" icon="EM" />
                        <SocialButton color="bg-pink-600" icon="IG" />
                    </div>
                 </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search for help"
                    className={`w-full ${ACCENT_COLOR} text-white pl-12 pr-4 py-3.5 rounded-xl border border-transparent focus:border-gray-600 focus:outline-none placeholder-gray-500 text-sm font-medium`}
                />
            </div>

            {/* FAQ Links */}
            <div className={`${ACCENT_COLOR} rounded-xl overflow-hidden`}>
                <FaqItem text="How do I sign up for a subscription to your coffee beans?" />
                <FaqItem text="Is self-pickup available?" />
                <FaqItem text="Do you offer shipping within Malaysia and internationally?" isLast />
            </div>
        </div>
    )
}
