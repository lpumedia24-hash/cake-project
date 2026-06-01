"use client";

import React from "react";
import { useCMS } from "@/context/CMSContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditableListProps<T> {
  id: string;
  defaultItems: T[];
  renderItem: (item: T, index: number, isEditing: boolean) => React.ReactNode;
  newItemTemplate: T;
  className?: string;
}

export function EditableList<T>({ 
  id, 
  defaultItems, 
  renderItem, 
  newItemTemplate,
  className = "" 
}: EditableListProps<T>) {
  const { isEditorMode, content, addItem, removeItem } = useCMS();
  
  const items = content.sections[id] || defaultItems;

  return (
    <div className={`relative ${className || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}`}>
      <AnimatePresence mode="popLayout">
        {items.map((item: any, index: number) => (
          <motion.div 
            key={index} 
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative group/list-item"
          >
            {renderItem(item, index, isEditorMode)}
            
            {isEditorMode && (
              <button
                onClick={() => removeItem(id, index)}
                className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/list-item:opacity-100 transition-opacity z-50 shadow-lg hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {isEditorMode && (
        <motion.button
          layout
          onClick={() => addItem(id, newItemTemplate)}
          className="border-2 border-dashed border-[#C5A059]/30 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-[#C5A059]/5 transition-colors group min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-[#C5A059]" />
          </div>
          <p className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest">Add New Item</p>
        </motion.button>
      )}
    </div>
  );
}
