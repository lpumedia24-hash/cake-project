"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/context/CMSContext";
import { Pencil, Check, X } from "lucide-react";

interface EditableTextProps {
  id: string;
  defaultContent: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

export const EditableText = ({ id, defaultContent, className = "", as = "span", style = {} }: EditableTextProps) => {
  const { isEditorMode, content, updateContent } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(content[id] || defaultContent);

  useEffect(() => {
    setTempValue(content[id] || defaultContent);
  }, [content, id, defaultContent]);

  const currentContent = content[id] || defaultContent;

  const renderContent = (val: string) => {
    return val.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < val.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!isEditorMode) {
    const Tag = as;
    return <Tag className={className} style={style}>{renderContent(currentContent)}</Tag>;
  }

  const handleSave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    updateContent(id, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTempValue(currentContent);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative z-[200] min-w-[150px] w-full" onClick={(e) => e.stopPropagation()}>
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className={`w-full bg-white text-[#3E2723] border-2 border-[#C5A059] rounded-lg p-3 outline-none shadow-2xl ${className}`}
          rows={Math.max(2, tempValue.split('\n').length)}
          autoFocus
        />
        <div className="absolute -top-12 right-0 flex gap-2 z-[210]">
          <button 
            onClick={handleSave} 
            className="p-2.5 bg-[#C5A059] text-white rounded-full shadow-lg hover:bg-[#B38E48] transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCancel} 
            className="p-2.5 bg-white text-[#3E2723] border border-[#3E2723]/10 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const Tag = as;
  return (
    <div 
      className={`relative group/item cursor-pointer hover:ring-2 hover:ring-[#C5A059] hover:ring-offset-2 rounded transition-all duration-300 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      style={style}
    >
      <Tag className="w-full h-full block">{renderContent(currentContent)}</Tag>
      <div className="absolute top-0 right-0 opacity-0 group-hover/item:opacity-100 transition-all bg-[#C5A059] text-white p-1.5 rounded-bl-lg z-[50] shadow-sm flex items-center gap-1">
        <Pencil className="w-3 h-3" />
        <span className="text-[8px] font-bold uppercase tracking-widest px-1">Edit</span>
      </div>
    </div>
  );
};
