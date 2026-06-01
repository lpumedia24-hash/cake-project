"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutGrid, 
  Users, 
  ShoppingBag, 
  BookOpen, 
  BarChart3,
  Home,
  Layers,
  GraduationCap,
  Info,
  Mail,
  ChevronUp,
  Circle
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { name: "Overview", href: "/admin", icon: <LayoutGrid className="w-5 h-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Products", href: "/admin/products", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Courses", href: "/admin/courses", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const sitePages = [
    { name: "Home Page", href: "/admin/pages/home", icon: <Home className="w-4 h-4" /> },
    { name: "Boutique", href: "/admin/pages/shop", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Academy", href: "/admin/pages/academy", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "About Us", href: "/admin/pages/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact Us", href: "/admin/pages/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <aside className="w-[300px] bg-white border-r border-gray-100 sticky top-0 h-screen hidden md:flex flex-col">
          <div className="p-10 flex-1 overflow-y-auto scrollbar-hide">
            {/* Logo */}
            <Link href="/" className="block mb-16">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#C5A059]">
                      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" opacity="0.8"/>
                    </svg>
                  </div>
                  <span className="text-[20px] font-serif font-bold tracking-tight text-[#3E2723]">LUMINA</span>
                </div>
                <span className="text-[8px] font-bold tracking-[0.4em] text-[#3E2723]/30 uppercase pl-1">Gourmet Bakehouse</span>
              </div>
            </Link>

            <nav className="space-y-12">
              {/* Management */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 mb-6 pl-4">Management</p>
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? "bg-[#F5EFE6] text-[#C5A059]" 
                            : "text-gray-400 hover:text-[#C5A059]"
                        }`}
                      >
                        <div className={`${isActive ? "text-[#C5A059]" : "text-gray-300"}`}>
                          {item.icon}
                        </div>
                        <span className="font-bold text-[14px]">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Pages to Edit */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 mb-6 pl-4">Pages to Edit</p>
                <div className="space-y-1">
                  {sitePages.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? "bg-[#F5EFE6] text-[#C5A059]" 
                            : "text-gray-400 hover:text-[#C5A059]"
                        }`}
                      >
                        <div className={`${isActive ? "text-[#C5A059]" : "text-gray-300"}`}>
                          {item.icon}
                        </div>
                        <span className="font-bold text-[14px]">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-8 space-y-6">
            {/* System Status */}
            <div className="p-5 rounded-[2rem] bg-[#FDFBF7] border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">System Status</p>
                <Circle className="w-1.5 h-1.5 fill-[#22c55e] text-[#22c55e]" />
              </div>
              <p className="text-[12px] font-bold text-gray-400 mb-4">All systems operational</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-[#3E2723]">Live Platform</p>
                  <p className="text-[10px] text-gray-300 font-medium">v2.0.4</p>
                </div>
                <p className="text-[9px] text-gray-300 text-right">Last updated<br/>15 May 2026, 10:20 AM</p>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-white font-bold text-sm">
                  {user?.displayName?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#3E2723]">{user?.displayName || "Nathalie Admin"}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Super Admin</p>
                </div>
              </div>
              <ChevronUp className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#FDFBF7] p-8 md:p-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
