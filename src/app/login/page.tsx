"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#0A0F1C] py-8 px-4 overflow-y-auto">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0D99FF]/8 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00C2FF]/6 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1E3A5F]/10 blur-[100px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md my-auto">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-3 mb-3">
            {/* ForgeWeb Logo Mark */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0D99FF] to-[#00C2FF] flex items-center justify-center shadow-lg shadow-[#0D99FF]/25">
              <span className="text-white font-extrabold text-base sm:text-lg">FW</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide leading-none">
                ForgeWeb
              </h1>
              <p className="text-[9px] sm:text-[10px] font-bold text-[#0D99FF] uppercase tracking-[0.2em] mt-1">
                Lead Manager
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-3 p-3.5 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={18} className="text-red-400 shrink-0" />
                <p className="text-xs sm:text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@forgeweb.in"
                  required
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-550 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/40 focus:border-[#0D99FF]/40 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-11 py-3 sm:py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-550 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/40 focus:border-[#0D99FF]/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0D99FF] to-[#00C2FF] hover:from-[#0080E6] hover:to-[#00A8E6] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0D99FF]/20 hover:shadow-[#0D99FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-750/40 text-center">
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-relaxed">
              Protected access for authorized team members only.
            </p>
          </div>
        </div>

        {/* Bottom Attribution */}
        <p className="text-center mt-6 sm:mt-8 text-[10px] sm:text-[11px] text-slate-650 font-medium">
          © {new Date().getFullYear()} ForgeWeb. All rights reserved.
        </p>
      </div>
    </div>
  );
}
