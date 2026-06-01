"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  Settings, 
  LogOut,
  ChevronRight,
  Gift,
  User,
  Star,
  LayoutDashboard,
  CreditCard,
  Bell,
  HelpCircle,
  Truck,
  Shield
} from "lucide-react";
import Link from "next/link";
import { EditableText } from "@/components/admin/EditableText";

const PRIMARY = "#C5A059";
const ESPRESSO = "#3E2723";
const CREAM = "#FAF8F5";
const LIGHT_PEACH = "#F9F3EB";

export default function CustomerDashboard() {
  const { user, logout, role } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "My Orders", icon: <Package className="w-4 h-4" /> },
    { name: "Wishlist", icon: <Heart className="w-4 h-4" /> },
    { name: "Addresses", icon: <MapPin className="w-4 h-4" /> },
    { name: "Loyalty Points", icon: <Gift className="w-4 h-4" /> },
    { name: "Payment Methods", icon: <CreditCard className="w-4 h-4" /> },
    { name: "Account Settings", icon: <Settings className="w-4 h-4" /> },
    { name: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { name: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // Add Admin option if role is admin
  if (role === "admin") {
    sidebarItems.push({ 
      name: "Admin Center", 
      icon: <Shield className="w-4 h-4" /> 
    });
  }

  const stats = [
    { id: "orders", name: "My Orders", icon: <Package className="w-5 h-5" />, value: "2", sub: "Active Orders" },
    { id: "wishlist", name: "Wishlist", icon: <Heart className="w-5 h-5" />, value: "5", sub: "Saved Items" },
    { id: "addresses", name: "Addresses", icon: <MapPin className="w-5 h-5" />, value: "2", sub: "Saved Addresses" },
    { id: "loyalty", name: "Loyalty Points", icon: <Gift className="w-5 h-5" />, value: "450", sub: "Available Points" },
  ];

  const recentOrders = [
    {
      id: "LMN-1021",
      name: "Dark Chocolate Ganache",
      date: "Oct 24, 2024",
      price: "$45.00",
      status: "DELIVERED",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200"
    },
    {
      id: "LMN-1022",
      name: "Dark Chocolate Ganache",
      date: "Oct 24, 2024",
      price: "$45.00",
      status: "DELIVERED",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200"
    }
  ];

  return (
    <ProtectedRoute allowedRoles={["customer", "student", "admin"]}>
      <div className="min-h-screen pt-40 pb-16" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          {/* Profile Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 px-4">
            <div className="flex items-center space-x-10">
              <div className="w-28 h-28 rounded-full bg-[#F3EDE4] flex items-center justify-center text-4xl font-serif font-bold text-[#3E2723] relative shrink-0 shadow-sm border-4 border-white">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover rounded-full shadow-inner" />
                ) : (
                  user?.displayName?.charAt(0) || "D"
                )}
                {role === "admin" && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: PRIMARY }}>
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-5xl font-serif font-medium text-[#3E2723]">
                    <EditableText id="dashboard:header:welcome" defaultContent="Welcome back," as="span" /> 
                    <span style={{ color: PRIMARY }}> {user?.displayName?.split(' ')[0] || "Deep"}</span>
                  </h1>
                  {role === "admin" && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full border border-primary/20" style={{ color: PRIMARY }}>
                      Admin Access
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4" style={{ color: PRIMARY, fill: PRIMARY }} />
                  <EditableText id="dashboard:header:membership" defaultContent="Premium Member since 2024" as="span" className="text-[13px] font-medium text-[#3E2723] opacity-80 tracking-wide" />
                </div>
                <EditableText id="dashboard:header:sub" defaultContent="We're delighted to have you with us." as="p" className="text-[14px] text-[#3E2723] opacity-60" />
              </div>
            </div>
            
            <div className="flex gap-4">
              {role === "admin" && (
                <Link 
                  href="/admin"
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-[11px] uppercase tracking-[0.15em] hover:opacity-90 transition-all flex items-center gap-2.5 shadow-lg shadow-primary/20"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              <button className="px-6 py-3.5 rounded-xl border border-[#3E2723]/10 font-bold text-[11px] uppercase tracking-[0.15em] text-[#3E2723] hover:bg-[#F9F3EB] transition-all flex items-center gap-2.5 outline-none focus:ring-2 focus:ring-[#C5A059]/20">
                <Settings className="w-4 h-4 opacity-60" />
                Account Settings
              </button>
              <button 
                onClick={logout}
                className="px-8 py-3.5 rounded-xl bg-[#2D1B18] text-white font-bold text-[11px] uppercase tracking-[0.15em] hover:opacity-90 transition-all flex items-center gap-2.5"
                style={{ backgroundColor: "#2D1B18" }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-[#F9F3EB]/40 rounded-3xl p-2 border border-[#3E2723]/5">
                {sidebarItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-4 px-6 py-4.5 rounded-2xl text-[13px] font-bold transition-all ${
                      activeTab === item.name 
                        ? "shadow-sm" 
                        : "text-[#3E2723]/50 hover:bg-[#F9F3EB]/60 hover:text-[#3E2723]"
                    }`}
                    style={{
                      backgroundColor: activeTab === item.name ? "#F9F3EB" : "transparent",
                      color: activeTab === item.name ? PRIMARY : "inherit",
                      paddingTop: '1.1rem',
                      paddingBottom: '1.1rem'
                    }}
                  >
                    <span style={{ color: activeTab === item.name ? PRIMARY : "inherit" }} className="opacity-80">
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                ))}
                <div className="h-px bg-[#3E2723]/5 my-4 mx-4" />
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-6 py-4.5 rounded-2xl text-[13px] font-bold text-[#3E2723]/50 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <LogOut className="w-4 h-4 opacity-80" />
                  Logout
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-8">
              
              {/* Dynamic Tab Content */}
              {activeTab === "Dashboard" ? (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat) => (
                      <div 
                        key={stat.name}
                        onClick={() => setActiveTab(stat.name)}
                        className="bg-white rounded-3xl p-6 border border-[#3E2723]/5 flex items-center gap-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#F9F3EB] flex items-center justify-center text-[#B28B47]">
                          {stat.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-serif font-bold text-[#3E2723]">{stat.value}</span>
                            <ChevronRight className="w-4 h-4 text-[#3E2723]/20 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <EditableText id={`dashboard:stats:${stat.id}:name`} defaultContent={stat.name} as="h3" className="text-[12px] font-bold text-[#3E2723] mb-0.5" />
                          <EditableText id={`dashboard:stats:${stat.id}:sub`} defaultContent={stat.sub} as="p" className="text-[10px] text-[#3E2723]/40 font-bold uppercase tracking-wider" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Recent Orders Section */}
                    <div className="xl:col-span-2 bg-[#F9F3EB]/10 rounded-[2.5rem] p-10 border border-[#3E2723]/5 shadow-sm">
                      <div className="flex justify-between items-center mb-10">
                        <EditableText id="dashboard:orders:title" defaultContent="Recent Orders" as="h2" className="text-2xl font-serif font-bold text-[#3E2723]" />
                        <button 
                          onClick={() => setActiveTab("My Orders")}
                          className="text-[12px] font-bold text-primary hover:underline flex items-center gap-1.5" style={{ color: PRIMARY }}>
                          <EditableText id="dashboard:orders:btn" defaultContent="View All Orders" as="span" /> <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="space-y-8">
                        {recentOrders.map((order, i) => (
                          <div key={i} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-6">
                              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[#3E2723]/5 shadow-sm">
                                <img src={order.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="text-[16px] font-bold text-[#3E2723] mb-1.5">{order.name}</h4>
                                <p className="text-[13px] text-[#3E2723]/40 font-medium">Order #{order.id}</p>
                                <p className="text-[13px] text-[#3E2723]/40 font-medium mb-2.5">Delivered on {order.date}</p>
                                <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[10px] font-bold text-[#2E7D32] rounded-md tracking-wider">
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-2xl font-serif font-bold" style={{ color: PRIMARY }}>{order.price}</span>
                              <ChevronRight className="w-5 h-5 text-[#3E2723]/20" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Track Order Utility */}
                      <div className="mt-12 bg-white rounded-3xl p-6 flex items-center justify-between border border-[#3E2723]/5 shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-full bg-[#F9F3EB] flex items-center justify-center text-[#B28B47]">
                            <Truck className="w-6 h-6" />
                          </div>
                          <div>
                            <EditableText id="dashboard:track:title" defaultContent="Track your order" as="h4" className="text-[15px] font-bold text-[#3E2723] mb-1" />
                            <EditableText id="dashboard:track:desc" defaultContent="Get real-time updates on your orders" as="p" className="text-[13px] text-[#3E2723]/40 font-medium" />
                          </div>
                        </div>
                        <button className="text-[12px] font-bold text-primary flex items-center gap-1.5" style={{ color: PRIMARY }}>
                          <EditableText id="dashboard:track:btn" defaultContent="Track Order" as="span" /> <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Side Cards */}
                    <div className="space-y-8">
                      
                      {/* Loyalty Card */}
                      <div className="bg-[#FBF7F1] rounded-[2.5rem] p-10 border border-[#3E2723]/5 relative overflow-hidden group shadow-sm min-h-[420px] flex flex-col cursor-pointer" onClick={() => setActiveTab("Loyalty Points")}>
                        {/* Cake Illustration with gradient fade mask */}
                        <div 
                          className="absolute top-0 right-[-10%] w-64 h-64 pointer-events-none opacity-80 group-hover:scale-105 transition-transform duration-700"
                          style={{ 
                            WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 20%, transparent 70%)', 
                            maskImage: 'radial-gradient(circle at 60% 40%, black 20%, transparent 70%)' 
                          }}
                        >
                          <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" alt="" className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        
                        <div className="relative z-10 flex-1">
                          <div className="mb-6">
                            <EditableText id="dashboard:loyalty:badge" defaultContent="Member Only" as="span" className="inline-block px-3 py-1.5 rounded-lg bg-[#C5A059]/10 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C5A059]" />
                          </div>
                          <EditableText id="dashboard:loyalty:title" defaultContent="Your Loyalty,\nOur Thanks" as="h3" className="text-3xl font-serif font-bold text-[#3E2723] mb-4 leading-tight max-w-[200px]" />
                          <EditableText id="dashboard:loyalty:desc" defaultContent="Redeem your loyalty points for exclusive rewards and offers." as="p" className="text-[#3E2723]/60 text-[14px] leading-relaxed mb-10 max-w-[220px]" />
                          
                          <div className="flex gap-4 mb-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-[#3E2723]/5">
                            <div className="flex-1 border-r border-[#3E2723]/5 pr-2">
                              <EditableText id="dashboard:loyalty:stats:pts:label" defaultContent="Your Points" as="p" className="text-[10px] font-bold text-[#3E2723]/40 uppercase tracking-[0.15em] mb-2" />
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-4xl font-bold text-[#3E2723]">450</span>
                                <span className="text-[12px] font-bold text-[#3E2723]/40 uppercase tracking-widest">pts</span>
                              </div>
                            </div>
                            <div className="flex-1 pl-4">
                              <EditableText id="dashboard:loyalty:stats:needed:label" defaultContent="Points Needed" as="p" className="text-[10px] font-bold text-[#3E2723]/40 uppercase tracking-[0.15em] mb-2" />
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-4xl font-bold text-[#3E2723]">100</span>
                                <span className="text-[12px] font-bold text-[#3E2723]/40 uppercase tracking-widest">pts</span>
                              </div>
                            </div>
                          </div>

                          <button 
                            className="w-full py-4.5 rounded-2xl text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-[#2D1B18]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 mt-auto"
                            style={{ backgroundColor: "#2D1B18" }}
                          >
                            <EditableText id="dashboard:loyalty:btn" defaultContent="Redeem Points" as="span" /> <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Support Card */}
                      <div className="bg-white rounded-[2.5rem] p-10 border border-[#3E2723]/5 shadow-sm overflow-hidden group relative cursor-pointer" onClick={() => setActiveTab("Help & Support")}>
                        <div 
                          className="absolute right-[-10%] top-4 w-48 h-48 pointer-events-none opacity-80 group-hover:rotate-6 transition-transform duration-500"
                          style={{ 
                            WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 20%, transparent 70%)', 
                            maskImage: 'radial-gradient(circle at 60% 40%, black 20%, transparent 70%)' 
                          }}
                        >
                           <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400" alt="" className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        
                        <div className="relative z-10">
                          <EditableText id="dashboard:support:title" defaultContent="Need Help?" as="h3" className="text-2xl font-serif font-bold text-[#3E2723] mb-1" />
                          <EditableText id="dashboard:support:sub" defaultContent="We're here to assist you" as="p" className="text-[13px] text-[#3E2723]/40 font-medium mb-10" />
                          
                          <button className="px-8 py-3.5 rounded-xl border border-[#3E2723]/10 font-bold text-[11px] uppercase tracking-[0.15em] text-[#3E2723] hover:bg-[#F9F3EB] transition-all flex items-center gap-2.5 bg-white/50 backdrop-blur-sm">
                            <EditableText id="dashboard:support:btn" defaultContent="Contact Support" as="span" /> <ChevronRight className="w-4 h-4 opacity-60" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-16 border border-[#3E2723]/5 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-[#F9F3EB] flex items-center justify-center text-[#B28B47] mb-6">
                    {sidebarItems.find(i => i.name === activeTab)?.icon}
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-[#3E2723] mb-4">{activeTab}</h2>
                  <p className="text-[#3E2723]/50 text-[15px] max-w-md">
                    This section is currently under development. You will soon be able to manage your {activeTab.toLowerCase()} here.
                  </p>
                  <button 
                    onClick={() => setActiveTab("Dashboard")}
                    className="mt-8 px-8 py-3.5 rounded-xl border border-[#3E2723]/10 font-bold text-[11px] uppercase tracking-[0.15em] text-[#3E2723] hover:bg-[#F9F3EB] transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
