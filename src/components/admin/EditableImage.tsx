"use client";

import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { ImageIcon, Link as LinkIcon, Check, X } from "lucide-react";

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

export const EditableImage = ({ id, defaultSrc, alt, className = "" }: EditableImageProps) => {
  const { isEditorMode, content, updateContent } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(content[id] || defaultSrc);

  const src = content[id] || defaultSrc;

  if (!isEditorMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateContent(id, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(src);
    setIsEditing(false);
  };

  return (
    <div className={`relative group/img-edit ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      <div 
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/img-edit:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        <div className="bg-white/90 p-3 rounded-full shadow-xl">
          <ImageIcon className="w-5 h-5 text-[#3E2723]" />
        </div>
      </div>

      {isEditing && (
        <div className="absolute inset-0 z-50 bg-[#3E2723]/95 p-4 flex flex-col justify-center items-center text-center">
          <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-4">Update Image URL</p>
          <div className="flex w-full gap-2 mb-4">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
              <input 
                type="text" 
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-[#C5A059]"
                placeholder="https://images.unsplash.com/..."
                autoFocus
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-[#C5A059] text-white rounded-lg text-[10px] font-bold uppercase flex items-center gap-2">
              <Check className="w-3 h-3" /> Apply
            </button>
            <button onClick={handleCancel} className="px-4 py-2 bg-white/10 text-white rounded-lg text-[10px] font-bold uppercase">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
