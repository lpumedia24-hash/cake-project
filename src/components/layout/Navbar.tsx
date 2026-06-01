"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, User, Bell, Shield, ChevronDown, Check, Clock, BookOpen, Award, Instagram, Facebook, Phone, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { EditableText } from "@/components/admin/EditableText";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Order Dispatched",
      description: "Your artisanal sourdough loaves are fresh out of the oven and on their way.",
      time: "20m ago",
      type: "order",
      read: false,
    },
    {
      id: "2",
      title: "New Academy Masterclass",
      description: "French Viennoiserie & Croissant Crafting is now open for enrollment.",
      time: "2h ago",
      type: "academy",
      read: false,
    },
    {
      id: "3",
      title: "Royalty Reward Unlocked",
      description: "You have received the 'Sourdough Artisan' badge and 150 loyalty points.",
      time: "1d ago",
      type: "reward",
      read: false,
    },
  ]);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const { user, role } = useAuth();
  const totalItems = useCartStore((state) => state.totalItems());
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 25 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 18 
      } 
    },
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Only show cart badge after client mount
  const cartCount = mounted ? totalItems : 0;

  const navLinks = [
    { id: "home", name: "Home", href: "/" },
    { id: "boutique", name: "Boutique", href: "/shop" },
    { id: "academy", name: "Academy", href: "/academy" },
    { id: "about", name: "About Us", href: "/about" },
  ];

  const isHomePage = pathname === "/";
  const shouldBeTransparent = isHomePage && !isScrolled;

  return (
    <>
      <Toaster position="top-center" expand={false} richColors />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldBeTransparent 
            ? "py-6 bg-transparent border-transparent" 
            : "py-3 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className={`flex items-center gap-3 transition-colors duration-500 ${shouldBeTransparent ? "text-white" : "text-[#3E2723]"}`}>
              <div className="w-12 h-12">
                <Logo circleColor="#C5A059" className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-serif font-bold tracking-tight leading-none">PRINCESS</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">BAKERY</span>
              </div>
            </Link>


            {/* Central Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 ${
                    pathname === link.href 
                      ? "text-[#C5A059]" 
                      : shouldBeTransparent 
                        ? "text-white/70 hover:text-white"
                        : "text-[#3E2723]/60 hover:text-[#3E2723]" 
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {role === "admin" && (
                <Link
                  href="/admin"
                  className={`px-6 py-2.5 rounded-full border transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.25em] ${
                    shouldBeTransparent 
                      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                      : "border-[#F5EFE6] bg-[#FDFBF7] text-[#3E2723] hover:bg-[#F5EFE6]" 
                  }`}
                >
                  Admin
                </Link>
              )}
              
              <Link
                href="/contact"
                className={`hidden md:block text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-500 ${
                  shouldBeTransparent ? "text-white/70 hover:text-white" : "text-[#3E2723]/60 hover:text-[#3E2723]"
                }`}
              >
                Contact Us
              </Link>

              <div className="flex items-center space-x-4 relative" ref={notificationsRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`relative p-2 transition-colors duration-500 ${
                    isNotificationsOpen 
                      ? "text-[#C5A059]" 
                      : shouldBeTransparent 
                        ? "text-white/60 hover:text-white" 
                        : "text-[#3E2723]/40 hover:text-[#3E2723]"
                  }`}
                >
                  <Bell className="w-5 h-5" strokeWidth={1.5} />
                  {mounted && unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C5A059] text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-12 w-80 sm:w-96 bg-white/95 backdrop-blur-md border border-[#F5EFE6] rounded-[24px] shadow-[0_20px_50px_rgba(62,39,35,0.15)] p-5 z-[100] origin-top-right font-sans"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-serif font-bold text-[#3E2723]">Notifications</h4>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-bold rounded-full uppercase tracking-wider">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059] hover:text-[#3E2723] transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      {/* Notification List */}
                      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center">
                            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" strokeWidth={1} />
                            <p className="text-xs text-gray-400 font-light">No new alerts at this time.</p>
                          </div>
                        ) : (
                          notifications.map((item) => (
                            <div 
                              key={item.id}
                              onClick={() => markAsRead(item.id)}
                              className={`group/notif flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                                item.read 
                                  ? "bg-transparent opacity-60 hover:opacity-90" 
                                  : "bg-[#FDFBF7] hover:bg-[#F9F5EE] border border-[#F5EFE6]/50"
                              }`}
                            >
                              {/* Left Icon */}
                              <div className="shrink-0">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover/notif:scale-105 duration-300 ${
                                  item.type === "order" 
                                    ? "bg-[#C5A059]/10 text-[#C5A059]" 
                                    : item.type === "academy" 
                                      ? "bg-[#3E2723]/5 text-[#3E2723]" 
                                      : "bg-[#8D6E63]/10 text-[#8D6E63]"
                                }`}>
                                  {item.type === "order" && <ShoppingBag className="w-4 h-4" strokeWidth={2} />}
                                  {item.type === "academy" && <BookOpen className="w-4 h-4" strokeWidth={2} />}
                                  {item.type === "reward" && <Award className="w-4 h-4" strokeWidth={2} />}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                  <p className={`text-xs font-semibold truncate transition-colors ${
                                    item.read ? "text-[#3E2723]/70" : "text-[#3E2723]"
                                  }`}>
                                    {item.title}
                                  </p>
                                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                                    <Clock className="w-3.5 h-3.5 text-gray-300" />
                                    <span className="text-[9px] text-gray-400 font-medium">{item.time}</span>
                                  </div>
                                </div>
                                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                                  {item.description}
                                </p>
                              </div>

                              {/* Status Dot */}
                              {!item.read && (
                                <div className="shrink-0 flex items-center">
                                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full shadow-[0_0_8px_#C5A059]" />
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-gray-100 mt-4 text-center">
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-[#C5A059] transition-colors"
                        >
                          Clear All Alerts
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className={`p-2 transition-colors duration-500 ${shouldBeTransparent ? "text-white/60 hover:text-white" : "text-[#3E2723]/40 hover:text-[#3E2723]"}`}
                >
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                </button>

                <Link 
                  href={user ? (role === "student" ? "/academy/student" : "/dashboard") : "/login"}
                  className={`p-2 transition-colors duration-500 ${shouldBeTransparent ? "text-white/60 hover:text-white" : "text-[#3E2723]/40 hover:text-[#3E2723]"}`}
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-2 transition-colors duration-500 ${shouldBeTransparent ? "text-white" : "text-[#3E2723]"}`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>



      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Fading Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#3E2723]/30 backdrop-blur-md" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />

            {/* Sliding Drawer Container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-[#FAF8F5] shadow-2xl p-8 flex flex-col justify-between z-50 border-l border-[#F5EFE6]"
            >
              <div>
                {/* Header with Updated Logo */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#3E2723]/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 text-[#C5A059]">
                      <Logo circleColor="#C5A059" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[12px] font-serif font-bold tracking-tight text-[#3E2723] leading-none">PRINCESS</span>
                      <span className="text-[8px] font-bold tracking-[0.2em] text-[#3E2723] uppercase opacity-70">BAKERY</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#3E2723]/5 flex items-center justify-center text-[#3E2723] hover:bg-[#C5A059] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <motion.nav 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col space-y-3"
                >
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.id} variants={itemVariants}>
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between py-3 px-4 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? "bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/10" 
                              : "text-[#3E2723]/70 hover:text-[#3E2723] hover:bg-[#3E2723]/5"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-[11px] uppercase tracking-[0.25em] font-bold">{link.name}</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isActive 
                              ? "text-white opacity-100 translate-x-0" 
                              : "text-[#C5A059] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {role === "admin" && (
                    <motion.div variants={itemVariants}>
                      <Link
                        href="/admin"
                        className="flex items-center justify-between py-3 px-4 rounded-2xl bg-[#3E2723]/5 text-[#C5A059] hover:bg-[#3E2723] hover:text-white transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold">Admin Center</span>
                        <Shield className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  )}
                </motion.nav>
              </div>

              {/* Drawer Bottom Info */}
              <div className="mt-auto pt-6 border-t border-[#3E2723]/5 space-y-6">
                {/* Account Quicklink */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F5EFE6] shadow-[0_4px_12px_rgba(62,39,35,0.02)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider leading-none mb-1">
                        {user ? user.displayName || "My Account" : "Welcome"}
                      </p>
                      <p className="text-[9px] text-[#3E2723]/40 font-medium">
                        {user ? (role ? `${role} portal` : "Signed In") : "Artisanal Bakery & Academy"}
                      </p>
                    </div>
                  </div>
                  <Link 
                    href={user ? (role === "student" ? "/academy/student" : "/dashboard") : "/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 bg-[#C5A059] text-white text-[8px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#3E2723] transition-colors"
                  >
                    {user ? "Portal" : "Login"}
                  </Link>
                </div>

                {/* Social & Contact info */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[#3E2723]/10 flex items-center justify-center text-[#3E2723]/60 hover:text-[#C5A059] hover:border-[#C5A059] transition-all hover:scale-105 shadow-sm">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[#3E2723]/10 flex items-center justify-center text-[#3E2723]/60 hover:text-[#C5A059] hover:border-[#C5A059] transition-all hover:scale-105 shadow-sm">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="tel:+9112345678" className="w-8 h-8 rounded-full bg-white border border-[#3E2723]/10 flex items-center justify-center text-[#3E2723]/60 hover:text-[#C5A059] hover:border-[#C5A059] transition-all hover:scale-105 shadow-sm">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#3E2723]/40 leading-none">
                    Maison Princess • New Delhi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
