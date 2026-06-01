"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCMS } from "@/context/CMSContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Save, Eye, EyeOff, ArrowLeft, Plus, Trash2, Layout } from "lucide-react";
import HomePage from "@/app/page";
import ShopPage from "@/app/shop/page";
import AcademyPage from "@/app/academy/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import AcademyDashboard from "@/app/academy/student/page";
import CustomerDashboard from "@/app/dashboard/page";

const PAGE_MAP: { [key: string]: React.ComponentType } = {
  home: HomePage,
  shop: ShopPage,
  academy: AcademyPage,
  about: AboutPage,
  contact: ContactPage,
  student: AcademyDashboard,
  dashboard: CustomerDashboard,
};

export default function VisualPageEditor() {
  const { pageId } = useParams();
  const router = useRouter();
  const { isEditorMode, setIsEditorMode, saveChanges, setActivePageId } = useCMS();

  useEffect(() => {
    if (pageId) {
      setActivePageId(pageId as string);
      setIsEditorMode(true);
    }
    return () => {
      setIsEditorMode(false);
      setActivePageId(null);
    };
  }, [pageId, setIsEditorMode, setActivePageId]);

  const SelectedPage = PAGE_MAP[pageId as string] || (() => <div>Page not found</div>);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex flex-col h-full bg-[#FDFBF7]">
        {/* Editor Toolbar */}
        <div className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[#3E2723]/10 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push("/admin")}
              className="p-2 hover:bg-[#FAF8F5] rounded-full transition-colors text-[#3E2723]/60"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#3E2723] capitalize">
                Editing: {pageId} Page
              </h2>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">
                Visual Editor Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#3E2723]/5">
              <button 
                onClick={() => setIsEditorMode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${isEditorMode ? "bg-white shadow-sm text-[#C5A059]" : "text-[#3E2723]/40"}`}
              >
                <Layout className="w-4 h-4" /> Edit Mode
              </button>
              <button 
                onClick={() => setIsEditorMode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${!isEditorMode ? "bg-white shadow-sm text-[#C5A059]" : "text-[#3E2723]/40"}`}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>
            
            <button 
              onClick={saveChanges}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#3E2723] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#3E2723]/20"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        {/* The Actual Page Content */}
        <div className="flex-1 overflow-auto relative">
          {/* Overlay to catch interactions when in editor mode if needed, 
              but we want direct interaction with Editable components */}
          <div className={`${isEditorMode ? "editor-active" : ""}`}>
            <SelectedPage />
          </div>
        </div>

        {/* Bottom Floating Actions */}
        {isEditorMode && (
          <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[150]">
            <button className="p-4 bg-[#C5A059] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group">
              <Plus className="w-6 h-6" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-[#3E2723] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Add New Section
              </span>
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
