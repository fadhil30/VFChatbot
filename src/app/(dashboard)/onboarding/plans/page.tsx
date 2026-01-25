"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star, Zap, Shield, Sparkles } from "lucide-react";

export default function PricingPlansPage() {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const tiers = [
    {
      name: "Hobby",
      price: billingInterval === "monthly" ? 32 : 26,
      description: "Everything in Free plus",
      features: ["Advanced models", "Integrations", "1.5k monthly credits"],
      highlight: false,
      color: "blue",
      icon: Star
    },
    {
      name: "Standard",
      price: billingInterval === "monthly" ? 120 : 96,
      description: "Everything in Hobby plus",
      features: ["10k monthly credits", "2x agent storage size", "Auto retrain"],
      highlight: true,
      popular: true,
      color: "orange",
      icon: Zap
    },
    {
      name: "Pro",
      price: billingInterval === "monthly" ? 400 : 320,
      description: "Everything in Standard plus",
      features: ["40k monthly credits", "Advanced analytics", "Sources suggestions", "Tickets as a source"],
      highlight: false,
      color: "pink",
      icon: Sparkles
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
             <div className="max-w-xl">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Select a paid plan to connect integrations and deploy for production use
                 </h1>
             </div>
             
             <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#111] p-1 rounded-full border border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => setBillingInterval("yearly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        billingInterval === "yearly" 
                        ? "bg-white dark:bg-[#222] shadow text-gray-900 dark:text-white" 
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                    Yearly
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">✨ 20% off</span>
                </button>
                <button
                    onClick={() => setBillingInterval("monthly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        billingInterval === "monthly" 
                        ? "bg-white dark:bg-[#222] shadow text-gray-900 dark:text-white" 
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                    Monthly
                </button>
             </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
                <div 
                    key={tier.name}
                    className={`relative bg-white dark:bg-[#0a0a0a] rounded-3xl border p-8 flex flex-col hover:shadow-lg transition-shadow duration-300 ${
                        tier.highlight 
                        ? "border-black dark:border-white shadow-md ring-1 ring-black dark:ring-white" 
                        : "border-gray-100 dark:border-gray-800"
                    }`}
                >
                    {tier.popular && (
                        <div className="absolute top-8 right-8 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Popular
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                        <tier.icon className={`w-5 h-5 ${
                            tier.color === 'blue' ? 'text-blue-500' : 
                            tier.color === 'orange' ? 'text-orange-500' : 'text-pink-500'
                        }`} fill="currentColor" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                    </div>

                    <p className="text-sm text-gray-500 mb-6">{tier.description}</p>
                    
                    {/* Features Grid */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tier.features.map(feature => (
                           <div key={feature} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                               {/* Use specific icons based on text content for variety, logically mapped */}
                               {feature.includes("models") && <span className="text-gray-400">🤖</span>}
                               {feature.includes("Integrations") && <span className="text-blue-400">⚡</span>}
                               {feature.includes("credits") && <span className="text-gray-400">💬</span>}
                               {/* Default check icon or specialized icon if available in your icon set */}
                               <span>{feature}</span>
                           </div> 
                        ))}
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                            <span className="text-gray-500 font-medium">/m</span>
                            {billingInterval === "yearly" && (
                                <span className="text-xs text-gray-400 ml-auto select-none">
                                    ${tier.price * 12} billed annually
                                </span>
                            )}
                        </div>

                        <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                            tier.highlight
                            ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                            : "bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#111]"
                        }`}>
                            Subscribe
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Enterprise Card */}
        <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 text-red-500">
                    <Shield className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Enterprise</h3>
                </div>
                <p className="text-sm text-gray-500">For companies with custom needs</p>
                <div className="flex flex-wrap gap-3">
                     {["Team access controls", "SSO", "Audit logs", "Onboarding support", "SLAs", "Custom data retention & agreements"].map(f => (
                         <div key={f} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                             <Shield className="w-3 h-3 opacity-50" />
                             {f}
                         </div>
                     ))}
                </div>
            </div>
            <button className="whitespace-nowrap px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90">
                Schedule a call
            </button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 items-center pt-4">
             <button
               onClick={() => router.back()} 
               className="text-gray-500 hover:text-gray-900 text-sm font-medium"
             >
                 Back
             </button>
             <button
                onClick={handleSkip}
                className="px-6 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#222] transition-colors"
             >
                Skip for now
             </button>
        </div>

      </div>
    </div>
  );
}
