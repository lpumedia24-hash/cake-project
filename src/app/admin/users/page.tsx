"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, 
  Shield, 
  UserCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  GraduationCap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  ShieldOff
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "student" | "customer";
  status: "active" | "inactive" | "pending";
  lastActive: string;
  photoURL?: string;
  createdAt?: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Set up Real-time listener for authentic data only
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id,
          status: doc.data().status || "active",
          lastActive: doc.data().lastActive || "Just now",
          createdAt: doc.data().createdAt?.toDate?.()?.toLocaleDateString() || doc.data().createdAt || "N/A"
        }) as UserData);
        
        setUsers(usersData);
        setLoading(false);
        setError(null);
      },
      (err: any) => {
        console.error("Firestore Error:", err);
        if (err.code === "permission-denied") {
          setError("Access Restricted: Your current Firebase Security Rules are blocking user list retrieval. Please allow read access for administrators in the Firebase Console.");
        } else {
          setError("An unexpected error occurred while connecting to live data.");
        }
        setUsers([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateRole = async (uid: string, newRole: UserData["role"]) => {
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      toast.success("Role updated successfully in Firestore");
    } catch (err: any) {
      toast.error(err.code === "permission-denied" ? "Insufficient permissions to update roles." : "Failed to update role.");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    { label: "Total Users", value: users.length.toString(), sub: "Live data from platform", icon: <Users className="w-5 h-5" />, color: "text-[#C5A059]", bg: "bg-[#FDFBF7]" },
    { label: "Admins", value: users.filter(u => u.role === "admin").length.toString(), sub: "Executive access level", icon: <Shield className="w-5 h-5" />, color: "text-[#C5A059]", bg: "bg-[#FDFBF7]" },
    { label: "Students", value: users.filter(u => u.role === "student").length.toString(), sub: "Academy active learners", icon: <GraduationCap className="w-5 h-5" />, color: "text-[#C5A059]", bg: "bg-[#FDFBF7]" },
  ];

  return (
    <div className="space-y-12 pb-20" onClick={() => setActiveMenu(null)}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-[12px] font-bold text-gray-300 uppercase tracking-widest mb-4">
            <span className="hover:text-[#C5A059] cursor-pointer">Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C5A059]">Users</span>
          </nav>
          <h1 className="text-[32px] font-serif font-bold text-[#3E2723] mb-2 tracking-tight">User Management</h1>
          <p className="text-gray-400 text-[14px] font-medium">Manage roles, permissions, and student access for your platform.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] text-white rounded-xl font-bold text-[13px] shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] transition-all">
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Permission Warning Banner */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-start gap-6"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-red-900 mb-1">Security Rule Notification</h3>
            <p className="text-[13px] text-red-700/80 font-medium leading-relaxed mb-3">{error}</p>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-xl border border-red-100 w-fit">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-900/40">Tech Tip</span>
              <p className="text-[11px] font-bold text-red-900/60">Update your Firestore Rules to allow 'read' on the 'users' collection for authenticated admins.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
            <div>
              <p className="text-[32px] font-serif font-bold text-[#3E2723] mb-1">{stat.value}</p>
              <p className="text-[11px] font-bold text-gray-400">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#C5A059] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-100 bg-white text-[14px] focus:ring-2 focus:ring-[#C5A059]/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-44">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full appearance-none px-6 py-4 rounded-2xl border border-gray-100 bg-white text-[13px] font-bold text-[#3E2723] outline-none shadow-sm cursor-pointer hover:border-[#C5A059]/30 transition-colors"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="customer">Customer</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
          </div>

          <div className="relative flex-1 lg:w-44">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none px-6 py-4 rounded-2xl border border-gray-100 bg-white text-[13px] font-bold text-[#3E2723] outline-none shadow-sm cursor-pointer hover:border-[#C5A059]/30 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-[13px] text-[#3E2723] shadow-sm hover:bg-[#FDFBF7] transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">User</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300 text-center">Role</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Status</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Joined</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Last Active</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-10 py-24 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A059] mx-auto" />
                  </td>
                </tr>
              ) : filteredUsers.map((u) => (
                <tr key={u.uid} className="hover:bg-[#FDFBF7]/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C5A059] font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
                        {u.displayName?.substring(0, 2).toUpperCase() || u.email.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[14px] text-[#3E2723]">{u.displayName || "Anonymous"}</p>
                        <p className="text-[11px] text-gray-300 font-medium">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                      u.role === "admin" ? "bg-[#C5A059]/10 text-[#C5A059]" : 
                      u.role === "student" ? "bg-[#3E2723]/10 text-[#3E2723]" : 
                      "bg-gray-50 text-gray-400"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <Circle className={`w-1.5 h-1.5 fill-current ${
                        u.status === "active" ? "text-green-500" : u.status === "pending" ? "text-orange-400" : "text-red-400"
                      }`} />
                      <span className={`text-[12px] font-bold capitalize ${
                        u.status === "active" ? "text-green-500" : u.status === "pending" ? "text-orange-400" : "text-red-400"
                      }`}>{u.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-[13px] font-bold text-gray-400">{u.createdAt}</td>
                  <td className="px-10 py-6 text-[13px] font-bold text-gray-400">{u.lastActive}</td>
                  <td className="px-10 py-6 text-right relative">
                    <div className="flex justify-end gap-2">
                      {/* Quick Toggle Student Access */}
                      {u.uid !== currentUser?.uid && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const newRole = u.role === "student" ? "customer" : "student";
                            updateRole(u.uid, newRole);
                            toast.success(`${u.displayName || 'User'} is now a ${newRole}`);
                          }}
                          className="p-2.5 text-gray-300 hover:text-[#C5A059] hover:bg-[#F5EFE6] rounded-xl transition-all"
                          title="Toggle Student Access"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                      )}

                      {/* More Options Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveMenu(activeMenu === u.uid ? null : u.uid); 
                          }}
                          className={`p-2.5 rounded-xl transition-all ${
                            activeMenu === u.uid ? 'bg-[#3E2723] text-white shadow-lg' : 'text-gray-300 hover:text-[#3E2723] hover:bg-gray-50'
                          }`}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeMenu === u.uid && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden py-2 text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Set User Role</p>
                            </div>
                            
                            {[
                              { role: 'admin', label: 'Make Admin', icon: <Shield className="w-4 h-4" color="#C5A059" /> },
                              { role: 'student', label: 'Make Student', icon: <Users className="w-4 h-4" /> },
                              { role: 'customer', label: 'Demote to Customer', icon: <ShieldOff className="w-4 h-4" />, danger: true }
                            ].map((option) => (
                              <button 
                                key={option.role}
                                disabled={u.role === option.role || (option.role === 'customer' && u.uid === currentUser?.uid)}
                                onClick={() => { 
                                  updateRole(u.uid, option.role as any); 
                                  setActiveMenu(null); 
                                  toast.success(`User updated to ${option.role}`);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                  option.danger ? 'text-red-500 hover:bg-red-50' : 'text-[#3E2723] hover:bg-gray-50'
                                }`}
                              >
                                {option.icon}
                                <span>{option.label}</span>
                              </button>
                            ))}

                            {u.uid === currentUser?.uid && (
                              <p className="px-4 py-2 text-[9px] text-gray-300 italic mt-1 border-t border-gray-50 pt-2">
                                You cannot demote yourself.
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-10 py-8 bg-[#F9FAFB]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] font-bold text-gray-300">Showing 1 to {filteredUsers.length} of {users.length} users</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C5A059] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              {[1, 2, 3, 4, 5, "...", 26].map((p, i) => (
                <button 
                  key={i}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold transition-all ${
                    p === 1 ? "bg-[#C5A059] text-white shadow-lg shadow-[#C5A059]/20" : "text-gray-300 hover:text-[#C5A059]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C5A059] transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <span className="text-[13px] font-bold text-gray-300">5 per page</span>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
