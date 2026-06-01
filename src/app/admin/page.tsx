"use client";

import React from "react";
import { motion } from "framer-motion";
import { seedDatabase } from "@/lib/db/seed";
import { toast } from "sonner";
import { 
  DollarSign, 
  ShoppingBag, 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  Package 
} from "lucide-react";

export default function AdminDashboard() {
  const [isSeeding, setIsSeeding] = React.useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success("Gourmet products seeded successfully!");
    } catch (error) {
      toast.error("Failed to seed database.");
    } finally {
      setIsSeeding(false);
    }
  };

  const stats = [
    { name: "Total Revenue", value: "$12,450", change: "+12.5%", icon: <DollarSign className="w-6 h-6" />, color: "bg-blue-500" },
    { name: "Total Orders", value: "148", change: "+8.2%", icon: <ShoppingBag className="w-6 h-6" />, color: "bg-amber-500" },
    { name: "New Students", value: "32", change: "+15.3%", icon: <BookOpen className="w-6 h-6" />, color: "bg-emerald-500" },
    { name: "Active Users", value: "1,240", change: "+4.1%", icon: <Users className="w-6 h-6" />, color: "bg-violet-500" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#3E2723] mb-2 tracking-tight">Command Center</h1>
          <p className="text-[#3E2723]/60 font-medium">Monitor your boutique and academy performance in real-time.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="px-6 py-2.5 bg-white border border-[#3E2723]/10 rounded-xl text-xs font-bold uppercase tracking-widest text-[#3E2723] hover:bg-[#FAF8F5] transition-all flex items-center space-x-2"
          >
            {isSeeding ? "Seeding..." : "Seed Products"}
          </button>
          <button className="px-6 py-2.5 bg-[#C5A059] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B28B47] transition-all shadow-lg shadow-[#C5A059]/20">
            View Shop
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2rem] p-8 border border-[#3E2723]/5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                {stat.change}
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
            <p className="text-[11px] text-[#3E2723]/40 font-bold uppercase tracking-[0.2em] mb-1">{stat.name}</p>
            <h3 className="text-3xl font-serif font-bold text-[#3E2723]">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Orders */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-[#3E2723]/5 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-serif font-bold text-[#3E2723]">Recent Orders</h3>
            <button className="text-[11px] text-[#C5A059] font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((order) => (
              <div key={order} className="flex items-center justify-between py-6 border-b border-[#3E2723]/5 last:border-0 hover:bg-[#FAF8F5]/50 transition-colors rounded-xl px-4 -mx-4">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] flex items-center justify-center border border-[#3E2723]/5">
                    <Package className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E2723]">Order #892{order}</p>
                    <p className="text-[12px] text-[#3E2723]/50">Sarah Jenkins • 2 items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif font-bold text-lg text-[#3E2723]">$84.00</p>
                  <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full tracking-widest">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / CMS */}
        <div className="space-y-8">
          <div className="bg-[#3E2723] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Quick CMS</h3>
            <p className="text-white/60 text-[13px] leading-relaxed mb-8 relative z-10">Update your homepage hero section or featured announcements instantly.</p>
            <button className="w-full py-4 bg-[#C5A059] text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#B28B47] transition-all shadow-lg shadow-[#C5A059]/20 relative z-10">
              Edit Home Hero
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-[#3E2723]/5 shadow-sm">
            <h3 className="text-2xl font-serif font-bold mb-8 text-[#3E2723]">Academy Growth</h3>
            <div className="h-40 flex items-end justify-between space-x-3">
              {[40, 70, 45, 90, 65, 80, 95].map((val, i) => (
                <div 
                  key={i} 
                  className="w-full bg-[#C5A059]/10 rounded-t-xl transition-all duration-700 hover:bg-[#C5A059]/30 cursor-pointer"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[0.3em] text-[#3E2723]/40 font-bold">
              <span>Mon</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
