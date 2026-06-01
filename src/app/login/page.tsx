"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Chrome, Mail, ArrowRight, Lock } from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";
import Link from "next/link";

export default function LoginPage() {
  const { user, loginWithGoogle, loginWithEmail, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      await loginWithEmail(formData.email, formData.password);
    } catch (err: any) {
      console.error("Login error:", err);
      // Make firebase auth errors human readable
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email address or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/user-disabled") {
        setError("This account has been disabled.");
      } else {
        setError(err.message || "An error occurred during sign-in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#050505] selection:bg-[#C5A059]/30 font-sans flex flex-col overflow-hidden">
      
      {/* ── Compact Padding for Fixed Navbar ────────────────────────────── */}
      <div className="h-24 lg:h-32 shrink-0" />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 lg:px-10 pb-8 flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* ── Left Section: Editorial Image ────────────────────────────────── */}
        <section className="relative flex-1 min-h-0 bg-[#111] rounded-[40px] lg:rounded-[60px] overflow-hidden group">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2000&auto=format&fit=crop" 
              alt="Artisanal Bakery" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-[#C5A059] font-bold text-[9px] uppercase tracking-[0.5em] mb-3">
                <EditableText id="login:hero:meta" defaultContent="The Artisan Heritage" />
              </p>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
                <EditableText id="login:hero:title1" defaultContent="Crafting" />
                <br />
                <span className="text-[#C5A059] italic font-dancing">
                  <EditableText id="login:hero:title2" defaultContent="Excellence" />
                </span>
              </h2>
              <p className="text-white/40 text-[13px] lg:text-sm font-light leading-relaxed max-w-sm mb-6">
                <EditableText 
                  id="login:hero:desc" 
                  defaultContent="Experience the pinnacle of gourmet baking. Sign in to continue your journey with Lumina." 
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Right Section: Login Form ───────────────────────────────────── */}
        <section className="flex-1 min-h-0 bg-[#0D0D0D] rounded-[40px] lg:rounded-[60px] border border-white/10 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden group/form">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C5A059]/[0.05] rounded-full blur-[120px] pointer-events-none group-hover/form:bg-[#C5A059]/[0.08] transition-colors duration-1000" />
          
          <div className="w-full max-w-sm relative z-10 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Decorative Accent */}
              <div className="flex justify-center mb-8 lg:mb-12">
                 <div className="relative">
                    <div className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-[0_0_20px_#C5A059]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-[#C5A059]/20 rounded-full animate-ping opacity-30" />
                 </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
                <EditableText id="login:form:title" defaultContent="Welcome Back" />
              </h1>

              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-[1px] w-10 bg-white/20" />
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/40">Royal Heritage</span>
                <div className="h-[1px] w-10 bg-white/20" />
              </div>

              <p className="text-white/60 text-[14px] mb-12 font-light leading-relaxed max-w-[300px] mx-auto">
                <EditableText id="login:form:desc" defaultContent="Sign in to your Lumina account to continue your journey into artisanal baking." />
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs tracking-wider uppercase rounded-2xl mb-4 text-center font-semibold"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Google button */}
                <motion.button
                  type="button"
                  whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center space-x-5 border border-white/10 bg-white/[0.02] px-8 py-5 rounded-2xl transition-all duration-500 group/btn"
                >
                  <Chrome className="w-5 h-5 text-white/60 group-hover/btn:text-white transition-colors" />
                  <span className="text-white/80 text-[14px] font-medium tracking-wide group-hover/btn:text-white transition-colors">Continue with Google</span>
                </motion.button>

                {/* Refined Divider */}
                <div className="flex items-center gap-6 py-8">
                  <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">OR</span>
                  <div className="flex-1 h-[0.5px] bg-gradient-to-l from-transparent via-white/20 to-white/20" />
                </div>

                {/* Email and Password inputs */}
                <div className="space-y-5 text-left">
                   <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors">
                      <Mail className="w-full h-full" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-[14px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                    />
                  </div>

                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors">
                      <Lock className="w-full h-full" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-[14px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={submitting ? {} : { scale: 1.01, backgroundColor: "#B08D57", boxShadow: "0 20px 40px -10px rgba(176,141,87,0.4)" }}
                    whileTap={submitting ? {} : { scale: 0.99 }}
                    className={`w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#C5A059] to-[#D4B376] text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.35em] shadow-2xl shadow-black/80 transition-all duration-500 group/submit mt-4 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span>{submitting ? "Signing in..." : "Continue with Email"}</span>
                    {!submitting && <ArrowRight className="w-4 h-4 group-hover/submit:translate-x-2 transition-transform" />}
                  </motion.button>
                </div>

                <div className="pt-10">
                  <p className="text-[11px] text-white/40 font-medium tracking-[0.1em]">
                    Don't have an account? <Link href="/register" className="text-[#C5A059] hover:text-white transition-all underline decoration-[#C5A059]/40 underline-offset-8">Create one</Link>
                  </p>
                </div>
              </form>

              {/* Security Badge */}
              <div className="mt-16 lg:mt-24 flex items-center justify-center space-x-4 opacity-30">
                <Lock className="w-3.5 h-3.5 text-white" />
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white">Enterprise Grade Security</p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
