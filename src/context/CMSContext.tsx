"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CMSContent {
  sections: { [key: string]: any[] };
  [key: string]: any;
}

interface CMSContextType {
  isEditorMode: boolean;
  setIsEditorMode: (mode: boolean) => void;
  content: CMSContent;
  updateContent: (id: string, value: any) => void;
  saveChanges: () => void;
  activePageId: string | null;
  setActivePageId: (id: string | null) => void;
  addItem: (sectionId: string, item: any) => void;
  removeItem: (sectionId: string, index: number) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [content, setContent] = useState<CMSContent>({ sections: {} });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lumina_cms_content");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.sections) parsed.sections = {};
        setContent(parsed);
      } catch (e) {
        console.error("Failed to parse CMS content", e);
      }
    }
  }, []);

  const updateContent = (id: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addItem = (sectionId: string, item: any) => {
    setContent((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: [...(prev.sections[sectionId] || []), item],
      },
    }));
  };

  const removeItem = (sectionId: string, index: number) => {
    setContent((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: (prev.sections[sectionId] || []).filter((_, i) => i !== index),
      },
    }));
  };

  const saveChanges = () => {
    localStorage.setItem("lumina_cms_content", JSON.stringify(content));
    alert("Changes saved locally!");
  };

  return (
    <CMSContext.Provider 
      value={{ 
        isEditorMode, 
        setIsEditorMode, 
        content, 
        updateContent, 
        saveChanges,
        activePageId,
        setActivePageId,
        addItem,
        removeItem
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
