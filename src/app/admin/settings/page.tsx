"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Image as ImageIcon, Type, Palette, Layout, Globe, Search } from "lucide-react";

export default function CMSSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold text-luxury mb-2">CMS Settings</h1>
          <p className="text-muted-foreground">Dynamically manage website content, branding, and hero sections.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { name: "General Branding", icon: <Palette /> },
            { name: "Homepage Hero", icon: <Layout /> },
            { name: "SEO & Social", icon: <Globe /> },
            { name: "Typography", icon: <Type /> },
            { name: "Media Assets", icon: <ImageIcon /> },
          ].map((tab, i) => (
            <button
              key={tab.name}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${
                i === 0 ? "bg-white shadow-md text-primary font-bold" : "text-muted-foreground hover:bg-white hover:text-foreground"
              }`}
            >
              {React.cloneElement(tab.icon as React.ReactElement, { className: "w-5 h-5" })}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-primary" />
                Identity & Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Website Name</label>
                  <input type="text" defaultValue="Lumina Bakehouse & Academy" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tagline</label>
                  <input type="text" defaultValue="Artisanal Perfection in Every Bite" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Accent Color</label>
                  <div className="flex space-x-2">
                    <input type="color" defaultValue="#C5A059" className="h-12 w-12 rounded-lg border border-border cursor-pointer" />
                    <input type="text" defaultValue="#C5A059" className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Secondary Palette</label>
                  <div className="flex space-x-2">
                    <input type="color" defaultValue="#FDFBF7" className="h-12 w-12 rounded-lg border border-border cursor-pointer" />
                    <input type="text" defaultValue="#FDFBF7" className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                Logos & Imagery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Main Header Logo</label>
                  <div className="h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/10 group hover:bg-muted/20 transition-all cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs font-medium text-muted-foreground">Click to upload (PNG/SVG)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Favicon</label>
                  <div className="h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/10 group hover:bg-muted/20 transition-all cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs font-medium text-muted-foreground">Click to upload (ICO)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card bg-primary/5 border border-primary/20">
            <h4 className="font-bold mb-2 flex items-center text-primary">
              <Globe className="w-4 h-4 mr-2" />
              Pro Tip: Dynamic Banners
            </h4>
            <p className="text-sm text-muted-foreground">
              Changes made here are reflected instantly across the platform. Use high-resolution images (min 1920x1080) for hero sections to maintain a luxury feel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
