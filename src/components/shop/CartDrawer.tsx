"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { EditableText } from "@/components/admin/EditableText";

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-dark z-[70] p-0 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  <EditableText id="cart:header:title" defaultContent="Your Cart" />
                </h2>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                  {totalItems()} items selected
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                  </div>
                  <EditableText 
                    id="cart:empty:text" 
                    defaultContent="Your boutique cart is empty." 
                    as="p"
                    className="text-white/40 font-serif text-lg italic" 
                  />
                  <button 
                    onClick={onClose}
                    className="text-primary font-bold hover:underline"
                  >
                    <EditableText id="cart:empty:btn" defaultContent="Start Shopping" as="span" />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold text-sm line-clamp-1">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-white/20 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold text-sm mb-4">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white/10 rounded-full text-white/60"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded-full text-white/60"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-white/60 text-sm uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-white">${totalPrice().toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="group w-full flex items-center justify-center space-x-3 bg-primary text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-accent transition-all duration-300 shadow-2xl shadow-primary/20"
                >
                  <EditableText id="cart:footer:checkout:btn" defaultContent="Proceed to Checkout" as="span" />
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <EditableText 
                  id="cart:footer:packaging" 
                  defaultContent="Complimentary luxury packaging included" 
                  as="p"
                  className="text-center text-white/40 text-[10px] uppercase tracking-widest mt-6" 
                />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
