"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Chrome, Mail, ArrowRight, Lock, User, Key } from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";
import Link from "next/link";

export default function RegisterPage() {
  const { user, loginWithGoogle, registerWithEmail, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    // Simple validation
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await registerWithEmail(formData.email, formData.password, formData.name);
    } catch (err: any) {
      console.error("Registration error:", err);
      // Make firebase auth errors human readable
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password registration is disabled in Firebase Console. Please enable it.");
      } else {
        setError(err.message || "An error occurred during registration. Please try again.");
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop" 
              alt="Artisanal Bakery" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              <p className="text-[#C5A059] font-bold text-[10px] uppercase tracking-[0.5em] mb-5">
                <EditableText id="register:hero:meta" defaultContent="The Artisan Heritage" />
              </p>
              <h2 className="text-4xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-tight">
                <EditableText id="register:hero:title1" defaultContent="Join Our" />
                <br />
                <span className="text-[#C5A059] italic font-dancing text-5xl lg:text-8xl normal-case tracking-normal">
                  <EditableText id="register:hero:title2" defaultContent="Legacy" />
                </span>
              </h2>
              <div className="w-12 h-[1px] bg-[#C5A059]/40 mb-8" />
              <p className="text-white/50 text-sm lg:text-lg font-light leading-relaxed max-w-md mb-8">
                <EditableText 
                  id="register:hero:desc" 
                  defaultContent="Create an account to join the Lumina family and begin your journey into the art of artisanal baking." 
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Right Section: Registration Form ────────────────────────────── */}
        <section className="flex-1 min-h-0 bg-[#0D0D0D] rounded-[40px] lg:rounded-[60px] border border-white/10 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden group/form">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C5A059]/[0.05] rounded-full blur-[120px] pointer-events-none group-hover/form:bg-[#C5A059]/[0.08] transition-colors duration-1000" />
          
          <div className="w-full max-w-md relative z-10 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Decorative Accent */}
              <div className="flex justify-center mb-6 lg:mb-8">
                 <div className="relative">
                    <div className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-[0_0_20px_#C5A059]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-[#C5A059]/20 rounded-full animate-ping opacity-30" />
                 </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6 tracking-tight">
                <EditableText id="register:form:title" defaultContent="Create Account" />
              </h1>

              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-[1px] w-10 bg-white/20" />
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/40">Royal Heritage</span>
                <div className="h-[1px] w-10 bg-white/20" />
              </div>

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
                {/* Google Button */}
                <motion.button
                  type="button"
                  whileHover={{ y: -1, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center space-x-5 border border-white/10 bg-white/[0.02] px-8 py-4 rounded-2xl transition-all duration-500 group/btn"
                >
                  <Chrome className="w-5 h-5 text-white/60 group-hover/btn:text-white transition-colors" />
                  <span className="text-white/80 text-[14px] font-medium tracking-wide group-hover/btn:text-white transition-colors">Sign up with Google</span>
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-6 py-4">
                  <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">OR</span>
                  <div className="flex-1 h-[0.5px] bg-gradient-to-l from-transparent via-white/20 to-white/20" />
                </div>

                {/* Registration Fields */}
                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative group/input">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[13px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                      />
                    </div>
                    {/* Email */}
                    <div className="relative group/input">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors" />
                      <input 
                        type="email" 
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[13px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="relative group/input">
                      <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors" />
                      <input 
                        type="password" 
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[13px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                      />
                    </div>
                    {/* Confirm Password */}
                    <div className="relative group/input">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-[#C5A059] transition-colors" />
                      <input 
                        type="password" 
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[13px] outline-none focus:border-[#C5A059]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={submitting ? {} : { scale: 1.01, backgroundColor: "#B08D57", boxShadow: "0 20px 40px -10px rgba(176,141,87,0.4)" }}
                    whileTap={submitting ? {} : { scale: 0.99 }}
                    className={`w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#C5A059] to-[#D4B376] text-white py-4 rounded-2xl font-bold text-[11px] uppercase tracking-[0.35em] shadow-2xl shadow-black/80 transition-all duration-500 group/submit mt-4 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span>{submitting ? "Creating Account..." : "Create Account"}</span>
                    {!submitting && <ArrowRight className="w-4 h-4 group-hover/submit:translate-x-2 transition-transform" />}
                  </motion.button>
                </div>

                <div className="pt-6">
                  <p className="text-[11px] text-white/40 font-medium tracking-[0.1em]">
                    Already have an account? <Link href="/login" className="text-[#C5A059] hover:text-white transition-all underline decoration-[#C5A059]/40 underline-offset-8">Sign in</Link>
                  </p>
                </div>
              </form>

              {/* Security Badge */}
              <div className="mt-12 flex items-center justify-center space-x-4 opacity-30">
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
