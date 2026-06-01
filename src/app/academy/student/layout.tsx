"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GraduationCap, BookOpen, Video, FileText, Award, HelpCircle, Layout } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "My Learning", href: "/academy", icon: <Layout className="w-5 h-5" /> },
    { name: "All Courses", href: "/academy/courses", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Live Classes", href: "/academy/live", icon: <Video className="w-5 h-5" /> },
    { name: "Resources", href: "/academy/resources", icon: <FileText className="w-5 h-5" /> },
    { name: "My Certificates", href: "/academy/certificates", icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <ProtectedRoute allowedRoles={["student", "admin"]}>
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-72 glass border-r border-border/50 sticky top-0 md:h-screen z-40 overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-12">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-luxury">Academy</h1>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Student Portal</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                        : "text-muted-foreground hover:bg-white hover:text-primary"
                    }`}
                  >
                    {item.icon}
                    <span className="font-bold text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-12 p-6 rounded-3xl bg-accent/5 border border-accent/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <HelpCircle className="w-8 h-8 text-accent mb-4" />
              <h4 className="text-sm font-bold mb-1">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-4">Contact our chef instructors for guidance.</p>
              <button className="text-xs font-bold text-accent hover:underline">Chat with Support</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
