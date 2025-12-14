"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function NewVerificationPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Verifying your email</h1>
        
        <div className="flex items-center justify-center mb-6">
          {!success && !error && (
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          )}
          
          {success && (
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400 text-sm">
              {success}
            </div>
          )}
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <Link 
          href="/login"
          className="text-blue-400 hover:underline text-sm"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}