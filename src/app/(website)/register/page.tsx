"use client";

import { useState, useTransition } from "react";
import { registerUser } from "@/actions/register";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatDemo } from "@/components/ChatDemo";

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setSuccess("");

    // Extract values from form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      // Call Server Action
      const data = await registerUser({ name, email, password });

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.success);
        // Redirect to login after 1.5 seconds
        setTimeout(() => router.push("/login"), 1500);
      }
    });
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-20 lg:max-w-xl">

        {/* Back Button */}
        <Link href="/" className="flex items-center text-gray-500 hover:text-white mb-6 text-sm transition">
            <ArrowLeft size={16} className="mr-1" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-400 text-sm">Get started with your custom AI chatbot</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
            <input
              name="name"
              type="text"
              required
              disabled={isPending}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition placeholder-gray-600"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              disabled={isPending}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition placeholder-gray-600"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              required
              disabled={isPending}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition placeholder-gray-600"
              placeholder="••••••••"
            />
          </div>

          {/* Messages */}
          {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm text-center border border-red-500/20">{error}</div>}
          {success && <div className="p-3 rounded-lg bg-green-500/10 text-green-400 text-sm text-center border border-green-500/20">{success}</div>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline transition">
            Log in
          </Link>
        </div>
      </div>

      <div className="hidden lg:block flex-1 bg-[#0a0a0a] border-l border-white/5 relative">
        <ChatDemo />
      </div>
    </div>
  );
}
