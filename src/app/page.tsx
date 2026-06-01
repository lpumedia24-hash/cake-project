"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Star, 
  Award,
  ArrowUpRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Video,
  ArrowLeft,
  ShoppingBag,
  Wheat,
  Utensils,
  Users,
  Heart,
  Coffee,
  MapPin,
  Image as ImageIcon,
  Store,
  Leaf,
  Phone,
  Clock,
  Gift,
  Globe 
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableList } from "@/components/admin/EditableList";
import { EditableVideo } from "@/components/admin/EditableVideo";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  


  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "#C5A059" }}>
      {/* Editorial Hero - Perfectly Replicated */}
      <section 
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#C5A059" }}
      >
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "#C5A059" }} />
        
        {/* Background Video */}
        <motion.div 
          style={{ y: y1, opacity: heroOpacity }}
          className="absolute inset-0 z-10 bg-black"
        >
          <EditableVideo 
            id="home:hero:video"
            defaultSrc="/herovid.mp4"
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        {/* Hero Content Overlay - pointer-events-none on container, auto on children to allow editing video behind */}
        <div className="container relative z-20 h-full min-h-[100svh] flex flex-col justify-between py-12 md:py-24 px-6 md:px-10 pointer-events-none">
          {/* Top Headline Section */}
          <div className="text-center pt-24 md:pt-40 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <EditableText 
                id="home:hero:availability"
                defaultContent="Open Everyday 9am - 8pm"
                as="p"
                className="text-[0.75rem] italic font-bold uppercase tracking-[0.4em]"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              />
            </motion.div>
            
            <div className="relative inline-block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10vw] md:text-[7rem] font-bold text-white uppercase tracking-[-0.05em]"
              >
                <EditableText 
                  id="home:hero:headline"
                  defaultContent="— Croissant —"
                  as="h1"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, rotate: -12, x: 20 }}
                animate={{ opacity: 1, rotate: -12, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute -bottom-6 right-0 text-4xl md:text-6xl font-dancing text-white select-none"
              >
                <EditableText 
                  id="home:hero:badge"
                  defaultContent="Freshly Baked"
                />
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20 mb-12"
            >
              <Link href="/shop" className="px-16 py-5 bg-white text-[#3E2723] rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
                <EditableText id="home:hero:cta:button" defaultContent="Order Now" as="span" />
              </Link>
              <Link href="/shop" className="px-16 py-5 bg-transparent border border-white/30 text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-center">
                See More
              </Link>
            </motion.div>
          </div>

          {/* Bottom Branding Section */}
          <div className="flex justify-between items-end border-t border-white/20 pt-10 pb-8 md:pb-0 pointer-events-auto">
            <div className="max-w-xs text-white">
              <EditableText 
                id="home:hero:branding_headline"
                defaultContent="100% Handmade & Organic"
                as="h5"
                className="font-bold text-sm uppercase tracking-[0.3em] mb-3"
              />
              <EditableText 
                id="home:hero:branding_desc"
                defaultContent="Baked by hand with traditional techniques, from clean, natural, and organic sources."
                as="p"
                className="text-[10px] text-white/70 leading-relaxed font-light tracking-wide uppercase"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transitional Line */}
      <div className="container mx-auto px-10">
        <div className="h-px bg-white/10 w-full" />
      </div>

      {/* Best Sellers Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600" 
            alt="Bakery background" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
        
        {/* Soft Cream Overlay to blend with Maison theme and ensure text readability */}
        <div className="absolute inset-0 z-0 bg-[#FAF8F5]/85" />

        <div className="container relative z-10 mx-auto px-6 md:px-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <EditableText 
              id="home:sellers:subline"
              defaultContent="The absolute favorites of our Maison"
              as="p"
              className="text-[#3E2723] uppercase tracking-[0.3em] text-[10px] font-bold mb-4"
            />
            <h2 className="text-6xl md:text-8xl mb-6">
              <EditableText 
                id="home:sellers:headline_part1"
                defaultContent="Best "
                as="span"
                className="font-serif text-[#3E2723]"
              />
              <EditableText 
                id="home:sellers:headline_part2"
                defaultContent="Sellers"
                as="span"
                className="font-dancing text-[#C5A059]"
              />
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#C5A059]/30" />
              <div className="w-2 h-2 rotate-45 border border-[#C5A059]/50" />
              <div className="h-px w-16 bg-[#C5A059]/30" />
            </div>
          </div>
          
          <EditableList
            id="home:sellers:list"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            defaultItems={[
              { name: "Classic Croissant", desc: "Buttery, flaky and baked to perfection.", price: "$6", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800" },
              { name: "Gourmet Truffle", desc: "Decadent truffles with a rich, silky center.", price: "$45", img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800" },
              { name: "Vanilla Cheesecake", desc: "Creamy vanilla cheesecake with a hint of citrus.", price: "$55", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
              { name: "Artisan Sourdough", desc: "Naturally fermented for flavor and texture.", price: "$12", img: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=800" },
            ]}
            newItemTemplate={{ name: "New Delicacy", desc: "Brief description of the item.", price: "$0", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" }}
            renderItem={(item, index, isEditing) => (
              <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col group border border-[#3E2723]/5 h-full">
                <div className="relative h-32 sm:h-48 md:h-64 overflow-hidden">
                  <EditableImage 
                    id={`home:sellers:item:${index}:img`}
                    defaultSrc={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#C5A059] text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-md z-10">
                    <EditableText 
                      id={`home:sellers:item:${index}:price`}
                      defaultContent={item.price}
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col items-center text-center">
                  <EditableText 
                    id={`home:sellers:item:${index}:name`}
                    defaultContent={item.name}
                    as="h3"
                    className="text-sm md:text-xl font-serif text-[#3E2723] mb-2 leading-tight"
                  />
                  <EditableText 
                    id={`home:sellers:item:${index}:desc`}
                    defaultContent={item.desc}
                    as="p"
                    className="text-[#3E2723]/60 text-[11px] leading-snug mb-6 flex-1"
                  />
                  <button className="w-full py-3 rounded-full border border-[#C5A059]/30 text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <EditableText id={`home:sellers:item:${index}:btn`} defaultContent="Add to Cart" as="span" /> <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          />

          {/* Carousel Navigation (Visual Only) */}
          <div className="flex items-center justify-between mt-12 px-4 md:px-0">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-colors border border-[#3E2723]/5">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <div className="w-2 h-2 rounded-full bg-[#C5A059]/30" />
              <div className="w-2 h-2 rounded-full bg-[#C5A059]/30" />
              <div className="w-2 h-2 rounded-full bg-[#C5A059]/30" />
            </div>
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-colors border border-[#3E2723]/5">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Order Now CTA */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Link 
              href="/shop?featured=true" 
              className="px-16 py-5 bg-[#C5A059] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#3E2723] hover:scale-105 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 md:py-48 bg-[#FAF8F5] relative overflow-hidden">
        {/* Subtle right leaf decoration to match the design */}
        <div className="absolute right-0 top-1/4 w-[30rem] h-[30rem] opacity-20 mix-blend-multiply pointer-events-none transform rotate-12 translate-x-1/3">
          <img 
            src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=800" 
            alt="botanical" 
            className="w-full h-full object-cover [mask-image:radial-gradient(circle,white_20%,transparent_70%)] -webkit-[mask-image:radial-gradient(circle,white_20%,transparent_70%)]" 
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-10">
          
          {/* ========================================= */}
          {/* DESKTOP VIEW */}
          {/* ========================================= */}
          <div className="hidden lg:flex flex-row items-center gap-16 lg:gap-24">
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-[45%] relative"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <EditableImage 
                  id="home:about:img_main"
                  defaultSrc="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200"
                  alt="Our Bakery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                
                {/* Cursive Text Overlay */}
                <div className="absolute top-12 left-10 text-white font-dancing text-4xl leading-snug drop-shadow-lg transform -rotate-6">
                  <EditableText 
                    id="home:about:img_text"
                    defaultContent="Baked \n with passion, \n crafted \n for you."
                    as="div"
                  />
                  <Heart className="w-5 h-5 mt-4 ml-6 text-white/90 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-[55%] flex flex-col justify-center relative"
            >
              <div className="mb-8">
                <EditableText 
                  id="home:about:subline"
                  defaultContent="Our Heritage"
                  as="span"
                  className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.6em] mb-3 block"
                />
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-8 bg-[#C5A059]/30" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059]/50" />
                  <div className="h-px w-8 bg-[#C5A059]/30" />
                </div>
                <h2 className="text-8xl font-serif mb-8">
                  <EditableText id="home:about:headline_1" defaultContent="About " as="span" className="text-[#3E2723]" />
                  <EditableText id="home:about:headline_2" defaultContent="Us" as="span" className="text-[#C5A059]" />
                </h2>
                
                <EditableText 
                  id="home:about:tagline"
                  defaultContent="Where tradition meets passion."
                  as="h3"
                  className="text-[#3E2723] font-serif text-2xl mb-8"
                />
              </div>
              
              <div className="space-y-6 text-[#3E2723]/70 text-[15px] leading-loose max-w-xl mb-20 pr-20">
                <EditableText 
                  id="home:about:para_1"
                  defaultContent="At Lumina Bakehouse, every recipe tells a story of heritage, craftsmanship, and the finest ingredients.\nFrom our early morning bakes to every cup we serve, we bring warmth, creativity, and care to everything we do."
                  as="p"
                />
                <EditableText 
                  id="home:about:para_2"
                  defaultContent="We believe good food brings people together—whether it's a celebration, a quiet coffee, or a moment to yourself.\nThank you for being part of our journey."
                  as="p"
                />
              </div>

              <div>
                <Link 
                  href="/about" 
                  className="px-10 py-4 bg-[#3E2723] text-white rounded-full font-bold text-[9px] uppercase tracking-[0.3em] hover:bg-[#C5A059] transition-colors inline-flex items-center gap-3 shadow-lg"
                >
                  View More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Circular Badge */}
              <div className="absolute -right-12 -bottom-12 w-40 h-40 text-[#C5A059] pointer-events-none select-none scale-90">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible animate-[spin_25s_linear_infinite]">
                  <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  <text fill="currentColor" className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
                    <textPath href="#circlePath" startOffset="0%">
                      EVERYTHING MADE WITH LOVE • EVERYTHING MADE WITH LOVE • 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#C5A059] opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================= */}
          {/* MOBILE VIEW */}
          {/* ========================================= */}
          <div className="flex flex-col lg:hidden">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center flex flex-col items-center"
            >
              <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Heritage</span>
              <h2 className="text-6xl font-serif">
                <span className="text-[#3E2723]">About </span>
                <span className="text-[#C5A059]">Us</span>
              </h2>
            </motion.div>

            {/* Image with Text Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/5] sm:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 flex flex-col justify-end p-6 sm:p-10 text-center text-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200" 
                alt="Our Bakery" 
                className="absolute inset-0 w-full h-full object-cover -z-20" 
              />
              <div className="absolute inset-0 bg-black/60 -z-10" />
              
              <h3 className="font-serif text-2xl sm:text-3xl mb-4 drop-shadow-md text-[#C5A059]">
                Where tradition meets passion.
              </h3>
              <div className="space-y-4 text-white/90 text-[13px] sm:text-base leading-relaxed drop-shadow-md mb-4">
                <EditableText 
                  id="home:about:intro:p1"
                  defaultContent="At Princess Bakery, every recipe tells a story of heritage, craftsmanship, and the finest ingredients."
                  as="p"
                />
                <EditableText 
                  id="home:about:intro:p2"
                  defaultContent="From our early morning bakes to every cup we serve, we bring warmth, creativity, and care to everything we do."
                  as="p"
                />
              </div>
            </motion.div>
          </div>

          {/* Features Bottom Strip (Shared, but structured for 2x2 on mobile) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 md:mt-24 lg:mt-32 bg-white/70 backdrop-blur-xl border border-[#3E2723]/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(62,39,35,0.05)]"
          >
            <EditableList
              id="home:features:list"
              className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#3E2723]/10"
              defaultItems={[
                { id: "premium", icon: "Wheat", title: "Premium Ingredients", desc: "We source the finest, natural and seasonal ingredients." },
                { id: "crafted", icon: "Utensils", title: "Crafted with Care", desc: "Handcrafted in small batches for exceptional taste and quality." },
                { id: "moments", icon: "Users", title: "Made for Moments", desc: "From everyday treats to life's special celebrations, we're here for you." },
                { id: "community", icon: "Heart", title: "Rooted in Community", desc: "A local bakehouse that believes in kindness, sustainability & love." }
              ]}
              newItemTemplate={{ id: "new", icon: "Star", title: "New Feature", desc: "Description of the new feature." }}
              renderItem={(feat, i) => {
                const IconComponent = { Wheat, Utensils, Users, Heart, Star, Award, Coffee, Leaf }[feat.icon as string] || Star;
                return (
                  <div className="flex flex-col items-center text-center p-6 sm:p-10 lg:p-12 group hover:bg-[#C5A059]/5 transition-colors duration-500">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#C5A059]/30 flex items-center justify-center shrink-0 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 bg-white shadow-sm">
                      <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-[#C5A059]" strokeWidth={1.2} />
                    </div>
                    <div className="flex-1 max-w-[200px]">
                      <EditableText 
                        id={`home:features:item:${i}:title`}
                        defaultContent={feat.title}
                        as="h4"
                        className="text-[#3E2723] font-serif text-[13px] sm:text-lg lg:text-xl mb-1.5 sm:mb-3 leading-tight"
                      />
                      <EditableText 
                        id={`home:features:item:${i}:desc`}
                        defaultContent={feat.desc}
                        as="p"
                        className="text-[#3E2723]/60 text-[9px] sm:text-xs lg:text-[13px] leading-relaxed"
                      />
                    </div>
                  </div>
                );
              }}
            />
          </motion.div>

          {/* Mobile CTA (Placed at the very bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:hidden flex justify-center mt-12"
          >
            <Link 
              href="/about" 
              className="px-12 py-4 bg-[#3E2723] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#C5A059] transition-colors inline-flex items-center gap-3 shadow-lg"
            >
              View More <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Memories Collage Section */}
      <section className="py-24 md:py-40 bg-[#FAF8F5] relative overflow-hidden">
        {/* Subtle leaf decorations on edges */}
        <div className="absolute left-0 top-1/4 w-[30rem] h-[30rem] opacity-20 mix-blend-multiply pointer-events-none transform -rotate-12 -translate-x-1/2">
          <img 
            src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=800" 
            alt="botanical" 
            className="w-full h-full object-cover [mask-image:radial-gradient(circle,white_20%,transparent_70%)] -webkit-[mask-image:radial-gradient(circle,white_20%,transparent_70%)]" 
          />
        </div>
        <div className="absolute right-0 bottom-1/4 w-[30rem] h-[30rem] opacity-20 mix-blend-multiply pointer-events-none transform rotate-12 translate-x-1/2">
          <img 
            src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=800" 
            alt="botanical" 
            className="w-full h-full object-cover [mask-image:radial-gradient(circle,white_20%,transparent_70%)] -webkit-[mask-image:radial-gradient(circle,white_20%,transparent_70%)]" 
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-10 mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <Leaf className="w-3 h-3 text-[#C5A059]" />
            <EditableText 
              id="home:memories:subline"
              defaultContent="A Glimpse Inside"
              as="span"
              className="text-[#C5A059] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] block"
            />
            <div className="h-px w-8 bg-[#C5A059]/30" />
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#3E2723] mb-6">
            <EditableText id="home:memories:headline_1" defaultContent="Moments " as="span" />
            <EditableText id="home:memories:headline_amp" defaultContent="&" as="span" className="text-[#C5A059]" />
            <EditableText id="home:memories:headline_2" defaultContent=" Memories" as="span" />
          </h2>
          <div className="w-2 h-2 rotate-45 border border-[#C5A059]/50 mb-8" />
          
          <div className="text-[#3E2723]/70 text-[13px] md:text-[15px] leading-relaxed max-w-lg">
            <EditableText id="home:memories:para_1" defaultContent="A collection of little moments that make Princess Bakery special." as="p" />
            <EditableText id="home:memories:para_2" defaultContent="From our warm spaces to the treats we craft with love." as="p" />
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 lg:gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-8 lg:flex-1">
              <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <EditableImage 
                  id="home:memories:col1:card1:img"
                  defaultSrc="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"
                  alt="Cafe interior"
                  className="w-full h-28 sm:h-36 lg:h-56 object-cover"
                />
                <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-6">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                    <Coffee className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                  </div>
                  <EditableText 
                    id="home:memories:col1:card1:text"
                    defaultContent="Where conversations\nand coffee flow."
                    as="p"
                    className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <EditableImage 
                  id="home:memories:col1:card2:img"
                  defaultSrc="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800"
                  alt="Cafe exterior"
                  className="w-full h-24 sm:h-32 lg:h-48 object-cover"
                />
                <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-6">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                  </div>
                  <EditableText 
                    id="home:memories:col1:card2:text"
                    defaultContent="A cozy corner\nyou'll love to return to."
                    as="p"
                    className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                  />
                </div>
              </div>

              <div className="rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800" alt="Dark interior" className="w-full h-24 sm:h-32 lg:h-48 object-cover" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-8 lg:flex-1 lg:mt-12">
              <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <EditableImage 
                  id="home:memories:col2:card1:img"
                  defaultSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                  alt="Lights"
                  className="w-full h-28 sm:h-36 lg:h-56 object-cover"
                />
                <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-6">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                    <Heart className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                  </div>
                  <EditableText 
                    id="home:memories:col2:card1:text"
                    defaultContent="Good food. Good mood.\nGreat memories."
                    as="p"
                    className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                  />
                </div>
              </div>

              <div className="bg-[#2A1F1D] rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <EditableImage 
                  id="home:memories:col2:card2:img"
                  defaultSrc="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
                  alt="Bread"
                  className="w-full h-32 sm:h-40 lg:h-64 object-cover"
                />
                <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-6">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-white/20 flex items-center justify-center shrink-0 bg-white/5">
                    <ImageIcon className="w-3 h-3 lg:w-4 lg:h-4 text-white/80" />
                  </div>
                  <EditableText 
                    id="home:memories:col2:card2:text"
                    defaultContent="Freshly baked,\nevery single day."
                    as="p"
                    className="text-white/80 text-[10px] lg:text-[13px] leading-snug font-medium"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-2 lg:gap-4 p-3 lg:p-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                  <Store className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                </div>
                  <EditableText 
                    id="home:memories:col2:card3:text"
                    defaultContent="Spaces designed for\ncomfort & connection."
                    as="p"
                    className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                  />
              </div>
            </div>

            {/* Column 3 & 4 Wrapper */}
            <div className="col-span-2 lg:col-span-1 lg:flex-[2] flex flex-col gap-3 sm:gap-4 lg:gap-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-row lg:gap-8">
                
                {/* Column 3 */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-8 lg:flex-1">
                  <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                    <EditableImage 
                      id="home:memories:col3:card1:img"
                      defaultSrc="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
                      alt="Coffee beans"
                      className="w-full h-28 sm:h-36 lg:h-40 object-cover"
                    />
                    <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-5">
                      <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                        <Leaf className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                      </div>
                      <EditableText 
                        id="home:memories:col3:card1:text"
                        defaultContent="Crafted with care,\nserved with love."
                        as="p"
                        className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500 lg:mt-8">
                    <EditableImage 
                      id="home:memories:col3:card2:img"
                      defaultSrc="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800"
                      alt="Latte art"
                      className="w-full h-28 sm:h-36 lg:h-56 object-cover"
                    />
                    <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-5">
                      <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                        <Star className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                      </div>
                      <EditableText 
                        id="home:memories:col3:card2:text"
                        defaultContent="Perfect brews,\nperfect moments."
                        as="p"
                        className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 4 */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-8 lg:flex-1 lg:-mt-8">
                  <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                    <EditableImage 
                      id="home:memories:col4:card1:img"
                      defaultSrc="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
                      alt="Smoothies"
                      className="w-full h-36 sm:h-44 lg:h-[22rem] object-cover"
                    />
                    <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-5">
                      <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                        <Coffee className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                      </div>
                      <EditableText 
                        id="home:memories:col4:card1:text"
                        defaultContent="Sip. Savor. Smile.\nRepeat."
                        as="p"
                        className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                    <EditableImage 
                      id="home:memories:col4:card2:img"
                      defaultSrc="https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=800"
                      alt="Team"
                      className="w-full h-28 sm:h-36 lg:h-40 object-cover"
                    />
                    <div className="flex items-center gap-2 lg:gap-4 p-3 lg:p-5">
                      <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                        <Users className="w-3 h-3 lg:w-4 lg:h-4 text-[#C5A059]" />
                      </div>
                      <EditableText 
                        id="home:memories:col4:card2:text"
                        defaultContent="Our team, our family,\nour strength."
                        as="p"
                        className="text-[#3E2723]/70 text-[10px] lg:text-[13px] leading-snug font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wide Card */}
              <div className="bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:-translate-y-1 transition-transform duration-500">
                <EditableImage 
                  id="home:memories:wide:img"
                  defaultSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                  alt="Food platter"
                  className="w-full sm:w-1/2 h-36 sm:h-auto object-cover"
                />
                <div className="flex items-center gap-3 lg:gap-4 p-4 lg:p-8 sm:w-1/2">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#FAF8F5]">
                    <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-[#C5A059]" />
                  </div>
                  <EditableText 
                    id="home:memories:wide:text"
                    defaultContent="Made with the finest ingredients\nfor your finest moments."
                    as="p"
                    className="text-[#3E2723]/70 text-[11px] lg:text-[14px] leading-relaxed font-medium"
                  />
                </div>
              </div>
            </div>
          </div>    
          
          {/* Bottom CTA */}
          <div className="mt-20 md:mt-28 flex flex-col items-center">
            <EditableText 
              id="home:memories:cta:text"
              defaultContent="Create your own memories with us"
              as="span"
              className="text-[#3E2723] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-6 block"
            />
            <Link 
              href="/about" 
              className="px-12 py-4 border border-[#C5A059] text-[#C5A059] rounded-full font-bold text-[9px] uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-colors inline-flex items-center gap-3"
            >
              <EditableText id="home:memories:cta:button" defaultContent="Visit Us" as="span" /> <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="py-24 md:py-40 bg-[#0D0D0D] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1800')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />

        <div className="container relative z-10 mx-auto px-6 md:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="flex flex-col items-center mb-8">
              <EditableText 
                id="home:academy:subline"
                defaultContent="Learn & Master"
                as="p"
                className="text-[#C5A059] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.6em] mb-4"
              />
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6">
                <EditableText id="home:academy:headline_1" defaultContent="Princess " as="span" />
                <EditableText id="home:academy:headline_2" defaultContent="Baking Academy" as="span" className="text-[#C5A059] font-dancing italic" />
              </h2>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059]/50 mb-8" />
              <EditableText 
                id="home:academy:para"
                defaultContent="Master the art of high-end patisserie and artisanal baking with our expert-led courses."
                as="p"
                className="text-white/60 text-[13px] md:text-[15px] leading-relaxed max-w-lg"
              />
            </div>
          </motion.div>

          {/* Course Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-16 md:mb-24">
            {[
              {
                tag: "Baking",
                title: "The Art of Sourdough",
                desc: "Master the science and soul of sourdough — from wild-yeast starters to perfectly scored loaves.",
                duration: "6 Weeks",
                lessons: "18 Lessons",
                level: "Beginner",
                img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
                accent: "#C5A059"
              },
              {
                tag: "Barista",
                title: "Espresso Mastery",
                desc: "Understand extraction, pressure, and milk science to craft world-class espresso and latte art.",
                duration: "4 Weeks",
                lessons: "12 Lessons",
                level: "Intermediate",
                img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
                accent: "#A07850"
              },
              {
                tag: "Patisserie",
                title: "French Pastry Fundamentals",
                desc: "Learn croissants, tarts, éclairs and more with classical French techniques taught from scratch.",
                duration: "8 Weeks",
                lessons: "24 Lessons",
                level: "Beginner",
                img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
                accent: "#C5A059"
              },
              {
                tag: "Bread",
                title: "Heritage Breads of the World",
                desc: "Explore traditional bread cultures — from Italian ciabatta to Indian tandoori naan.",
                duration: "5 Weeks",
                lessons: "15 Lessons",
                level: "Intermediate",
                img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800",
                accent: "#A07850"
              },
              {
                tag: "Cakes",
                title: "Celebration Cake Design",
                desc: "Build, layer, and decorate stunning cakes for weddings, birthdays, and every special moment.",
                duration: "6 Weeks",
                lessons: "20 Lessons",
                level: "Advanced",
                img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
                accent: "#C5A059"
              },
              {
                tag: "Coffee",
                title: "Specialty Coffee Culture",
                desc: "From bean to cup — explore origins, roast profiles, brewing methods and sensory tasting.",
                duration: "3 Weeks",
                lessons: "9 Lessons",
                level: "Beginner",
                img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
                accent: "#A07850"
              }
            ].map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group bg-white/5 border border-white/8 rounded-[2rem] overflow-hidden hover:bg-white/8 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden h-32 sm:h-48 md:h-52">
                  <EditableImage 
                    id={`home:academy:course:${i}:img`}
                    defaultSrc={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <EditableText 
                      id={`home:academy:course:${i}:tag`}
                      defaultContent={course.tag}
                      as="span"
                      className="text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full block"
                      style={{ backgroundColor: `${course.accent}25`, color: course.accent, border: `1px solid ${course.accent}40` }}
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-6 flex flex-col flex-1">
                  <EditableText 
                    id={`home:academy:course:${i}:title`}
                    defaultContent={course.title}
                    as="h3"
                    className="text-white font-serif text-sm sm:text-lg md:text-xl mb-1.5 sm:mb-2 leading-tight"
                  />
                  <EditableText 
                    id={`home:academy:course:${i}:desc`}
                    defaultContent={course.desc}
                    as="p"
                    className="text-white/50 text-[10px] sm:text-[12px] leading-relaxed mb-3 sm:mb-5 flex-1 hidden sm:block"
                  />

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 pt-3 sm:pt-4 border-t border-white/8">
                    <EditableText 
                      id={`home:academy:course:${i}:duration`}
                      defaultContent={course.duration}
                      as="span"
                      className="text-[9px] sm:text-[10px] text-white/40 font-medium uppercase tracking-widest"
                    />
                    <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                    <EditableText 
                      id={`home:academy:course:${i}:lessons`}
                      defaultContent={course.lessons}
                      as="span"
                      className="text-[9px] sm:text-[10px] text-white/40 font-medium uppercase tracking-widest hidden sm:block"
                    />
                    <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                    <EditableText 
                      id={`home:academy:course:${i}:level`}
                      defaultContent={course.level}
                      as="span"
                      className="text-[9px] sm:text-[10px] font-medium uppercase tracking-widest"
                      style={{ color: course.accent }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            <EditableText 
              id="home:academy:cta:text"
              defaultContent="Explore the Academy"
              as="p"
              className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.4em]"
            />
            <Link 
              href="/academy" 
              className="px-10 py-4 bg-[#C5A059] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF6A] transition-colors inline-flex items-center gap-3 shadow-lg shadow-[#C5A059]/20"
            >
              <EditableText id="home:academy:cta:button" defaultContent="View All Courses" as="span" /> <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
        {/* Botanical decorations */}
        <div className="absolute left-0 top-16 w-48 h-48 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400" alt="" className="w-full h-full object-cover [mask-image:radial-gradient(circle,white_30%,transparent_70%)]" />
        </div>
        <div className="absolute right-0 top-16 w-48 h-48 opacity-10 pointer-events-none scale-x-[-1]">
          <img src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400" alt="" className="w-full h-full object-cover [mask-image:radial-gradient(circle,white_30%,transparent_70%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C5A059]/40" />
              <Leaf className="w-3 h-3 text-[#C5A059]" />
              <EditableText 
                id="home:testimonials:subline"
                defaultContent="Kind Words, Sweet Memories"
                as="span"
                className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.5em]"
              />
              <div className="h-px w-8 bg-[#C5A059]/40" />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#3E2723] mb-4">
              <EditableText id="home:testimonials:headline_1" defaultContent="What Our " as="span" />
              <EditableText id="home:testimonials:headline_2" defaultContent="Guests" as="span" className="text-[#C5A059] italic" />
              <EditableText id="home:testimonials:headline_3" defaultContent=" Say" as="span" />
            </h2>
            <div className="text-[#3E2723]/50 text-[13px] md:text-[15px] leading-relaxed">
              <EditableText 
                id="home:testimonials:para_1"
                defaultContent="We're grateful for every moment shared with you."
                as="p"
              />
              <EditableText 
                id="home:testimonials:para_2"
                defaultContent="Here's what our guests have to say about their experience at Lumina."
                as="p"
              />
            </div>
          </motion.div>

          {/* Slider Row */}
          <div className="relative flex items-center gap-2 md:gap-4 mb-10 md:mb-14">
            {/* Left Arrow */}
            <button className="shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#3E2723]/15 bg-white flex items-center justify-center hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-all duration-300 shadow-sm group">
              <ArrowLeft className="w-4 h-4 text-[#3E2723] group-hover:text-white" />
            </button>

            {/* Cards */}
            <EditableList
              id="home:testimonials:list"
              className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 overflow-hidden"
              defaultItems={[
                { quote: "The croissants are simply the best I've ever had — flaky, buttery perfection!", name: "Ananya S.", city: "Mumbai", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", featured: false },
                { quote: "Lumina is my go-to place for coffee and calm. The ambiance is so warm!", name: "Rohit M.", city: "Bangalore", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", featured: false },
                { quote: "From their sourdough to their service — everything is made with love.", name: "Meera P.", city: "Delhi", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", featured: true },
                { quote: "Attended a baking class and it was an incredible learning experience. Highly recommend!", name: "Diya K.", city: "Pune", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", featured: false },
                { quote: "Beautiful space, amazing desserts and the friendliest team. Always a pleasure!", name: "Karan T.", city: "Hyderabad", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", featured: false }
              ]}
              newItemTemplate={{ quote: "New testimonial...", name: "Guest Name", city: "City", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", featured: false }}
              renderItem={(t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                   className="relative flex flex-col justify-between rounded-[1.5rem] p-4 md:p-5 transition-all duration-300 bg-white border border-[#3E2723]/6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-1"
                >
                  {/* Quote icon */}
                  <div className="text-[#C5A059] mb-3">
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor" opacity="0.7">
                      <path d="M0 14V8.4C0 3.6 2.8 1.2 8.4 0L9.4 1.8C7.2 2.4 5.6 3.2 4.8 4.4 4 5.6 3.6 7 3.6 8.8H7V14H0zm11 0V8.4C11 3.6 13.8 1.2 19.4 0L20 1.8C17.8 2.4 16.2 3.2 15.4 4.4 14.6 5.6 14.2 7 14.2 8.8H17.4V14H11z"/>
                    </svg>
                  </div>
                  {/* Quote text */}
                  <EditableText 
                    id={`home:testimonials:item:${i}:quote`}
                    defaultContent={t.quote}
                    as="p"
                    className="text-[#3E2723]/75 text-[11px] md:text-[12px] leading-relaxed flex-1 mb-4"
                  />
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                    ))}
                  </div>
                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <EditableImage 
                      id={`home:testimonials:item:${i}:avatar`}
                      defaultSrc={t.avatar}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#C5A059]/20"
                    />
                    <div>
                      <EditableText 
                        id={`home:testimonials:item:${i}:name`}
                        defaultContent={t.name}
                        as="p"
                        className="text-[#3E2723] font-semibold text-[11px]"
                      />
                      <EditableText 
                        id={`home:testimonials:item:${i}:city`}
                        defaultContent={t.city}
                        as="p"
                        className="text-[#3E2723]/40 text-[9px] uppercase tracking-wider"
                      />
                    </div>
                  </div>
                  {/* Decorative closing quote */}
                  <div className="absolute bottom-3 right-4 text-[#3E2723]/5 font-serif text-5xl leading-none select-none">{String.fromCharCode(8221)}</div>
                </motion.div>
              )}
            />

            {/* Right Arrow */}
            <button className="shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#3E2723]/15 bg-white flex items-center justify-center hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-all duration-300 shadow-sm group">
              <ArrowRight className="w-4 h-4 text-[#3E2723] group-hover:text-white" />
            </button>
          </div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#3E2723]/5 rounded-[2rem] p-6 md:p-8 mb-6 md:mb-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6">
              {[
                { id: "guests", value: "10,000+", label: "Happy Guests", icon: Users },
                { id: "rating", value: "4.9 / 5", label: "Average Rating", icon: Star },
                { id: "coffee", value: "2,500+", label: "Cups of Coffee Daily", icon: Coffee },
                { id: "cakes", value: "1,800+", label: "Custom Cakes Delivered", icon: Heart },
                { id: "classes", value: "50+", label: "Classes Completed", icon: Award }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center p-6 md:p-8 lg:p-10
                    ${i !== 0 ? 'border-t md:border-t-0 md:border-l border-[#3E2723]/10' : ''}
                  `}
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                  </div>
                  <EditableText 
                    id={`home:stats:${stat.id}:value`}
                    defaultContent={stat.value}
                    as="h4"
                    className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#3E2723] mb-2"
                  />
                  <EditableText 
                    id={`home:stats:${stat.id}:label`}
                    defaultContent={stat.label}
                    as="p"
                    className="text-[#3E2723]/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-center"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Share Your Experience Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
          >
            {/* Mobile: full background image with overlay */}
            <div className="md:hidden relative min-h-[340px] flex flex-col justify-end">
              <EditableImage
                id="home:review:mobile:img"
                defaultSrc="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800"
                alt="Lumina Cafe"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/95 via-[#3E2723]/60 to-transparent" />
              <div className="relative z-10 p-7">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-3 h-3 text-[#C5A059]" />
                  <EditableText
                    id="home:review:mobile:subline"
                    defaultContent="We Love Hearing From You"
                    as="span"
                    className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.4em]"
                  />
                </div>
                <EditableText
                  id="home:review:mobile:headline"
                  defaultContent="Share Your Experience"
                  as="h3"
                  className="font-serif text-2xl text-white mb-2"
                />
                <EditableText
                  id="home:review:mobile:para"
                  defaultContent="Your feedback inspires us to bake better, serve better and create more memories together."
                  as="p"
                  className="text-white/60 text-[12px] leading-relaxed mb-6"
                />
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-[#3E2723] rounded-full text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#C5A059] hover:text-white transition-colors duration-300"
                  >
                    <EditableText id="home:review:mobile:btn1" defaultContent="Write a Review" as="span" /> <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-[0.25em] hover:text-[#C5A059] transition-colors duration-300"
                  >
                    <EditableText id="home:review:mobile:btn2" defaultContent="View All Reviews" as="span" /> <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop: side-by-side layout */}
            <div className="hidden md:flex bg-white border border-[#3E2723]/5 min-h-[200px]">
              <div className="flex-1 p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-3 h-3 text-[#C5A059]" />
                  <EditableText 
                    id="home:review:desktop:subline"
                    defaultContent="We Love Hearing From You"
                    as="span"
                    className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.4em]"
                  />
                </div>
                <EditableText 
                  id="home:review:desktop:headline"
                  defaultContent="Share Your Experience"
                  as="h3"
                  className="font-serif text-3xl text-[#3E2723] mb-3"
                />
                <EditableText 
                  id="home:review:desktop:para"
                  defaultContent="Your feedback inspires us to bake better, serve better and create more memories together."
                  as="p"
                  className="text-[#3E2723]/50 text-[13px] leading-relaxed mb-6 max-w-xs"
                />
                <div className="flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#3E2723] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#C5A059] transition-colors duration-300"
                  >
                    <EditableText id="home:review:desktop:btn1" defaultContent="Write a Review" as="span" /> <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-[#3E2723]/60 text-[10px] font-bold uppercase tracking-[0.25em] hover:text-[#C5A059] transition-colors duration-300"
                  >
                    <EditableText id="home:review:desktop:btn2" defaultContent="View All Reviews" as="span" /> <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              <div className="relative w-[45%] shrink-0 overflow-hidden">
                <EditableImage
                  id="home:review:desktop:img"
                  defaultSrc="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800"
                  alt="Lumina Cafe"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <EditableText
                    id="home:review:desktop:thanks"
                    defaultContent="Thank you for\nbeing part of our\nLumina family."
                    as="p"
                    className="text-white font-serif text-2xl italic text-center leading-relaxed drop-shadow-lg px-6"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
