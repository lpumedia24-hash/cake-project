"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { getProducts, Product } from "@/lib/db/products";
import {
  ShoppingBag, Star, Search, Plus, LayoutGrid, List,
  ChevronDown, Package, Cake, Cookie, Gift, Wheat,
  Sparkles, ShieldCheck, RefreshCw
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";

// ─── Category icons ───────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { icon: React.ReactNode; label: string }> = {
  All:         { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: "All" },
  Cakes:       { icon: <Cake className="w-3.5 h-3.5" />, label: "Cakes" },
  Pastries:    { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Pastries" },
  Cookies:     { icon: <Cookie className="w-3.5 h-3.5" />, label: "Cookies" },
  Desserts:    { icon: <Star className="w-3.5 h-3.5" />, label: "Desserts" },
  Chocolates:  { icon: <Package className="w-3.5 h-3.5" />, label: "Chocolates" },
  Bread:       { icon: <Wheat className="w-3.5 h-3.5" />, label: "Bread" },
  "Gift Hampers": { icon: <Gift className="w-3.5 h-3.5" />, label: "Gift Hampers" },
};

const CATEGORIES = Object.keys(CATEGORY_META);

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Newest"];

// ─── Extended mock products for a richer grid ─────────────────────────────────
const EXTRA_MOCK: Product[] = [
  {
    id: "x1", name: "Dark Chocolate Truffle Cake", description: "Layers of 70% Valrhona dark chocolate mousse.", price: 55.00,
    category: "Cakes", images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800"],
    stock: 8, isFeatured: true, rating: 4.9, reviewsCount: 124, createdAt: new Date(),
  },
  {
    id: "x2", name: "Golden Honey Pistachio Macarons", description: "Hand-painted gold shells filled with pistachio ganache.", price: 24.00,
    category: "Pastries", images: ["https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800"],
    stock: 50, isFeatured: true, rating: 4.8, reviewsCount: 98, createdAt: new Date(),
  },
  {
    id: "x3", name: "Artisanal Sourdough Bread", description: "36-hour slow fermentation using ancient grains.", price: 12.00,
    category: "Bread", images: ["https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=800"],
    stock: 20, isFeatured: false, rating: 4.7, reviewsCount: 76, createdAt: new Date(),
  },
  {
    id: "x4", name: "Berry Cheesecake", description: "Creamy NY-style cheesecake with mixed berry compote.", price: 42.00,
    category: "Desserts", images: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800"],
    stock: 12, isFeatured: true, rating: 4.9, reviewsCount: 110, createdAt: new Date(),
  },
  {
    id: "x5", name: "Butter Croissant", description: "Classic French-style buttery, flaky croissant.", price: 8.00,
    category: "Pastries", images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800"],
    stock: 30, isFeatured: false, rating: 4.8, reviewsCount: 203, createdAt: new Date(),
  },
  {
    id: "x6", name: "Fudgy Brownie Box", description: "Rich, dense brownies with a crackly top.", price: 18.00,
    category: "Desserts", images: ["https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=800"],
    stock: 25, isFeatured: false, rating: 4.7, reviewsCount: 88, createdAt: new Date(),
  },
  {
    id: "x7", name: "Chocolate Chip Cookies", description: "Soft-baked cookies loaded with chocolate chips.", price: 14.00,
    category: "Cookies", images: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800"],
    stock: 60, isFeatured: false, rating: 4.6, reviewsCount: 156, createdAt: new Date(),
  },
  {
    id: "x8", name: "Luxury Truffle Box", description: "Handcrafted Belgian truffles in a premium gift box.", price: 65.00,
    category: "Chocolates", images: ["https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800"],
    stock: 15, isFeatured: true, rating: 4.9, reviewsCount: 72, createdAt: new Date(),
  },
];

// ─── Parallax Hero Component ─────────────────────────────────────────────────
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Background moves at 40% of scroll speed — creates genuine parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={ref} className="relative overflow-hidden text-center" style={{ paddingTop: "7rem", paddingBottom: "3rem" }}>

      {/* ── Parallax background image ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <EditableImage
          id="shop:hero:bg"
          defaultSrc="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1800"
          alt="Bakery background"
          className="w-full h-full opacity-[0.12]"
        />
      </motion.div>

      {/* Cream overlay gradient ── fades photo into page bg */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(250,248,245,0.55) 0%, rgba(250,248,245,0.75) 60%, rgba(250,248,245,1) 100%)"
        }}
      />

      {/* Botanical leaf decorations */}
      <div className="absolute left-0 top-0 w-72 h-72 opacity-20 pointer-events-none z-10">
        <EditableImage
          id="shop:hero:decor:left"
          defaultSrc="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400"
          alt=""
          className="w-full h-full"
          style={{ maskImage: "radial-gradient(circle, white 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, white 20%, transparent 70%)" }}
        />
      </div>
      <div className="absolute right-0 top-0 w-72 h-72 opacity-20 pointer-events-none z-10 scale-x-[-1]">
        <EditableImage
          id="shop:hero:decor:right"
          defaultSrc="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400"
          alt=""
          className="w-full h-full"
          style={{ maskImage: "radial-gradient(circle, white 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, white 20%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <EditableText
            id="shop:hero:subline"
            defaultContent="The Gourmet Boutique"
            as="p"
            className="text-[11px] font-bold uppercase tracking-[0.4em]"
            style={{ color: "#C5A059" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold" style={{ color: "#3E2723" }}>
            <EditableText id="shop:hero:title:part1" defaultContent="Exquisite " as="span" />
            <EditableText id="shop:hero:title:part2" defaultContent="Creations" as="span" className="italic text-[#C5A059]" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <EditableText 
            id="shop:hero:description"
            defaultContent="Indulge in our collection of artisanal desserts, crafted\nwith the finest ingredients and boundless passion."
            as="p"
            className="text-[15px] leading-relaxed"
            style={{ color: "#3E2723", opacity: 0.6 }}
          />
        </motion.div>

        {/* Decorative diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
          className="flex justify-center mt-6"
        >
          <div className="w-2 h-2 rotate-45 border" style={{ borderColor: "#C5A059" }} />
        </motion.div>
      </div>
    </div>
  );
}

function getBadge(product: Product): { label: string; color: string } | null {
  if (product.reviewsCount > 150) return { label: "Bestseller", color: "#C5A059" };
  if (product.id.startsWith("x5") || product.id.startsWith("x6")) return { label: "New", color: "#3E2723" };
  return null;
}

// Chef's Pick product (Internal reference, but UI will use EditableText/Image)
const CHEFS_PICK_DEFAULT: Product = {
  id: "cp1", name: "Hazelnut Lava Cake", description: "Warm chocolate cake with a molten hazelnut centre.", price: 49.00,
  category: "Desserts", images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800"],
  stock: 6, isFeatured: true, rating: 4.9, reviewsCount: 86, createdAt: new Date(),
};

// ─── Stars renderer ────────────────────────────────────────────────────────────
function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-[#C5A059] text-[#C5A059]" : "text-[#C5A059]/30"}`} />
      ))}
      <span className="text-[11px] text-[#3E2723]/50 ml-1">({count})</span>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("featured") === "true") setShowFeaturedOnly(true);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getProducts(selectedCategory === "All" ? undefined : selectedCategory);
      // Merge with extras for a richer grid
      const merged = [...data, ...EXTRA_MOCK].reduce<Product[]>((acc, p) => {
        if (!acc.find(x => x.name === p.name)) acc.push(p);
        return acc;
      }, []);
      setProducts(merged);
      setLoading(false);
    };
    fetch();
  }, [selectedCategory]);

  const filtered = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFeatured = showFeaturedOnly ? p.isFeatured : true;
      return matchSearch && matchFeatured;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Top Rated") return b.rating - a.rating;
      return b.isFeatured ? 1 : -1;
    });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>

      {/* ── Hero Header with Parallax Background ──────────────────────────── */}
      <ParallaxHero />


      {/* ── Filters Bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-[63px] md:top-[96px] z-30 border-b shadow-sm" style={{ backgroundColor: "white", borderColor: "rgba(62,39,35,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const active = selectedCategory === cat && !showFeaturedOnly;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowFeaturedOnly(false); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-200 border"
                  style={{
                    backgroundColor: active ? "#C5A059" : "white",
                    color: active ? "white" : "#3E2723",
                    borderColor: active ? "#C5A059" : "rgba(62,39,35,0.15)",
                    boxShadow: active ? "0 4px 12px rgba(197,160,89,0.3)" : "none",
                  }}
                >
                  {meta.icon}
                  {meta.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative shrink-0 w-56">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#3E2723", opacity: 0.4 }} />
            <input
              type="text"
              placeholder="Search desserts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full text-[12px] outline-none border transition-all"
              style={{ borderColor: "rgba(62,39,35,0.15)", backgroundColor: "white", color: "#3E2723" }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">

        {/* Left: Products */}
        <div className="flex-1 min-w-0">

          {/* Toolbar: count + sort + view toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[12px]" style={{ color: "#3E2723", opacity: 0.5 }}>
              Showing 1–{Math.min(filtered.length, 12)} of {filtered.length} products
            </p>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg text-[12px] font-medium border outline-none cursor-pointer"
                  style={{ borderColor: "rgba(62,39,35,0.15)", backgroundColor: "white", color: "#3E2723" }}
                >
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#3E2723", opacity: 0.4 }} />
              </div>

              {/* View toggles */}
              <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: "rgba(62,39,35,0.15)" }}>
                {([["grid", LayoutGrid], ["list", List]] as const).map(([mode, Icon]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="p-2 transition-colors"
                    style={{
                      backgroundColor: viewMode === mode ? "#C5A059" : "white",
                      color: viewMode === mode ? "white" : "#3E2723",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border" style={{ borderColor: "rgba(62,39,35,0.06)" }}>
                    <div className="h-48 bg-gray-100" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-32 text-center">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4" style={{ color: "#C5A059", opacity: 0.3 }} />
                <p className="font-serif text-xl" style={{ color: "#3E2723", opacity: 0.4 }}>No masterpieces found here…yet.</p>
              </div>
            ) : (
              <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {filtered.map((product, i) => {
                  const badge = getBadge(product);
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`bg-white rounded-2xl overflow-hidden group border transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(62,39,35,0.1)] ${viewMode === "list" ? "flex gap-4" : "flex flex-col"}`}
                      style={{ borderColor: "rgba(62,39,35,0.07)" }}
                    >
                      {/* Image */}
                      <div className={`relative overflow-hidden shrink-0 ${viewMode === "list" ? "w-36 h-36 rounded-xl m-3" : "h-48"}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Category badge top-right */}
                        <span
                          className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(250,248,245,0.92)", color: "#C5A059", backdropFilter: "blur(4px)" }}
                        >
                          {product.category}
                        </span>

                        {/* New / Bestseller badge bottom-left */}
                        {badge && (
                          <span
                            className="absolute bottom-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: badge.color }}
                          >
                            {badge.label}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <Stars rating={product.rating} count={product.reviewsCount} />
                        <h3 className="font-serif font-bold text-[14px] mt-1.5 mb-3 leading-snug line-clamp-1" style={{ color: "#3E2723" }}>
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-[15px] font-bold" style={{ color: "#3E2723" }}>
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => { addItem(product); toast.success(`${product.name} added to cart`); }}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border hover:scale-110"
                            style={{ borderColor: "rgba(62,39,35,0.2)", color: "#3E2723", backgroundColor: "white" }}
                            title="Add to cart"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right Sidebar ──────────────────────────────────────────────────── */}
        <aside className="hidden xl:flex flex-col gap-0 w-64 shrink-0">
          <div className="sticky top-[132px]">

            {/* Chef's Picks Card */}
            <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: "white", borderColor: "rgba(62,39,35,0.07)" }}>
              {/* Header */}
              <div className="text-center pt-6 pb-3 px-4">
                <EditableText id="shop:sidebar:brand" defaultContent="Princess Bakery" as="p" className="text-[10px] font-bold uppercase tracking-[0.35em] mb-1" style={{ color: "#C5A059" }} />
                <EditableText id="shop:sidebar:title" defaultContent="Chef's Picks" as="h3" className="font-serif text-xl font-bold" style={{ color: "#3E2723" }} />
                <EditableText 
                  id="shop:sidebar:desc"
                  defaultContent="Handpicked delights\njust for you."
                  as="p"
                  className="text-[11px] mt-0.5"
                  style={{ color: "#3E2723", opacity: 0.45 }}
                />
              </div>

              {/* Product Image */}
              <div className="relative mx-3 rounded-xl overflow-hidden h-44 shadow-sm">
                <EditableImage
                  id="shop:sidebar:cp:img"
                  defaultSrc={CHEFS_PICK_DEFAULT.images[0]}
                  alt="Chef's Pick"
                  className="w-full h-full"
                />
              </div>

              {/* Product Info */}
              <div className="px-4 py-4">
                <EditableText id="shop:sidebar:cp:name" defaultContent={CHEFS_PICK_DEFAULT.name} as="h4" className="font-serif font-bold text-[15px] mb-1" style={{ color: "#3E2723" }} />
                <Stars rating={CHEFS_PICK_DEFAULT.rating} count={CHEFS_PICK_DEFAULT.reviewsCount} />
                <div className="flex items-center gap-1 mt-2 mb-4">
                  <span className="text-[15px] font-bold" style={{ color: "#3E2723" }}>$</span>
                  <EditableText id="shop:sidebar:cp:price" defaultContent={CHEFS_PICK_DEFAULT.price.toFixed(2)} as="span" className="text-[15px] font-bold" style={{ color: "#3E2723" }} />
                </div>

                <button
                  onClick={() => { addItem(CHEFS_PICK_DEFAULT); toast.success(`${CHEFS_PICK_DEFAULT.name} added to cart`); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 hover:scale-[1.02] shadow-md shadow-[#C5A059]/20"
                  style={{ backgroundColor: "#C5A059" }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <EditableText id="shop:sidebar:cp:btn" defaultContent="Add to Cart" as="span" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t px-4 py-4 space-y-3" style={{ borderColor: "rgba(62,39,35,0.07)" }}>
                {[
                  { id: "fresh", icon: RefreshCw, title: "Made Fresh Daily", desc: "Every product is crafted with care each day." },
                  { id: "premium", icon: Sparkles, title: "Premium Ingredients", desc: "We use only the finest and natural ingredients." },
                  { id: "secure", icon: ShieldCheck, title: "Secure Packaging", desc: "Delivered to you with love and care." },
                ].map(({ id, icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border" style={{ borderColor: "rgba(197,160,89,0.3)", backgroundColor: "rgba(197,160,89,0.06)" }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: "#C5A059" }} />
                    </div>
                    <div>
                      <EditableText id={`shop:sidebar:badge:${id}:title`} defaultContent={title} as="p" className="text-[11px] font-bold leading-tight" style={{ color: "#3E2723" }} />
                      <EditableText id={`shop:sidebar:badge:${id}:desc`} defaultContent={desc} as="p" className="text-[10px] leading-relaxed mt-0.5" style={{ color: "#3E2723", opacity: 0.5 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
