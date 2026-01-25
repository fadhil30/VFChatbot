"use client";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex">
      {/* Left Panel - Form Content */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Panel - Sources Preview */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100/50 dark:bg-[#111] relative overflow-hidden">
        {/* Decorative dots background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #ddd 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Sources Card */}
        <div className="relative z-10 w-72">
          {/* Gradient border effect behind the card */}
          <div className="absolute -inset-4 rounded-2xl opacity-60 pointer-events-none"
               style={{
                 background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
                 filter: 'blur(20px)',
               }}
          />
          
          <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sources
            </h3>
            
            {/* Size info box */}
            <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total size</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  0 B / 10 MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
