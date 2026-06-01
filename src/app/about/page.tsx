"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Utensils, Award, Users, ShieldCheck, Star, Clock, GraduationCap, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";

export default function AboutPage() {
  const values = [
    {
      id: "val_1",
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Artisan Soul",
      desc: "Every loaf and pastry is a testament to our commitment to traditional techniques and soulful baking."
    },
    {
      id: "val_2",
      icon: <Utensils className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Pure Ingredients",
      desc: "We source only the finest organic flours, seasonal fruits, and premium chocolates for uncompromised flavor."
    },
    {
      id: "val_3",
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Honest Craft",
      desc: "No shortcuts, no artificial additives. Just time, patience, and the perfect fermentation."
    },
    {
      id: "val_4",
      icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Excellence",
      desc: "From the first knead to the final glaze, we strive for perfection in every single detail."
    }
  ];

  const timeline = [
    { year: "1994", title: "The Beginning", desc: "Princess Bakery opens its doors with a passion for bread.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80" },
    { year: "2005", title: "Growing Roots", desc: "Our boutique brings artisanal bakes to our local community.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80" },
    { year: "2015", title: "Sharing Knowledge", desc: "Princess Baking Academy is born to inspire and educate.", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" },
    { year: "Today", title: "Baking Forward", desc: "A global community united by the love of baking.", img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] selection:bg-[#C5A059]/20 font-sans overflow-x-hidden">
      
      {/* Hero Section - unique classy redesign */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-[#FAF8F5]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3E2723]/[0.02] -skew-x-12 translate-x-20 z-0" />
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            
            {/* Left Content - Overlapping the image on large screens */}
            <div className="flex-1 lg:pr-20 z-20 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="h-[1px] w-8 bg-[#C5A059]" />
                  <EditableText
                    id="about:hero:sub"
                    defaultContent="ESTABLISHED 1994"
                    as="span"
                    className="text-[#C5A059] font-bold text-[10px] uppercase tracking-[0.4em]"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="mb-10"
              >
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-bold leading-[0.95] text-[#3E2723] tracking-tighter">
                  <EditableText id="about:hero:h1:l1" defaultContent="Crafted with" as="span" className="block" />
                  <div className="relative inline-block mt-2">
                    <EditableText id="about:hero:h1:l2" defaultContent="Passion." as="span" className="text-[#C5A059] italic font-light relative z-10" />
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute bottom-4 left-0 w-full h-[15px] bg-[#C5A059]/10 -rotate-1 origin-left"
                    />
                  </div>
                </h1>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <EditableText 
                  id="about:hero:desc"
                  defaultContent="Since 1994, Princess Bakery has been a sanctuary for those who appreciate the slower, finer things in life. Our journey is a tribute to honest ingredients and timeless techniques."
                  as="p"
                  className="text-[17px] md:text-[19px] text-[#3E2723]/60 max-w-lg mx-auto lg:mx-0 leading-[1.8] font-light italic"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-6"
              >
                <div className="w-12 h-12 rounded-full border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="font-dancing text-3xl text-[#C5A059]">
                  <EditableText id="about:hero:sig" defaultContent="The Princess Bakery Team" as="span" />
                </div>
              </motion.div>
            </div>

            {/* Right Image Container - Layered and unique */}
            <div className="flex-1 relative w-full lg:w-1/2 aspect-[4/5] lg:aspect-auto lg:h-[800px] z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                {/* Main Image with architectural crop */}
                <div className="absolute inset-0 rounded-[3rem] lg:rounded-none lg:rounded-tl-[15rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(62,39,35,0.25)] border-[12px] border-white z-10">
                  <EditableImage 
                    id="about:hero:img"
                    defaultSrc="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600"
                    alt="Bakery heritage"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Overlay Card - Heritage Seal */}
                  <motion.div 
                    initial={{ opacity: 0, rotate: -10 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-12 left-12 md:top-16 md:left-16 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/20 flex flex-col items-center justify-center text-center p-4 shadow-xl"
                  >
                    <Award className="w-8 h-8 text-[#C5A059] mb-2" />
                    <div className="text-[#3E2723] font-serif font-bold text-xl md:text-2xl leading-none">30+</div>
                    <div className="text-[#C5A059] text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-bold">YEARS OF<br/>MASTERY</div>
                  </motion.div>

                  {/* Bottom Info Strip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#3E2723]/80 backdrop-blur-lg p-6 md:p-8 text-white flex items-center justify-between z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-[#C5A059]" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-white/60">Rooted in Tradition</div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="text-[10px] uppercase tracking-widest text-white/60">Crafted with Love</div>
                  </div>
                </div>

                {/* Background Shadow Element */}
                <div className="absolute top-8 right-8 inset-0 bg-[#C5A059]/10 rounded-[3rem] lg:rounded-none lg:rounded-tl-[15rem] -z-10 translate-x-4 translate-y-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - dynamic interactive cards */}
      <section className="py-24 bg-white relative z-20 -mt-16 md:-mt-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#FAF8F5] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 hover:bg-[#3E2723] hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[0_20px_40px_-10px_rgba(62,39,35,0.3)] md:hover:shadow-[0_40px_80px_-20px_rgba(62,39,35,0.4)] overflow-hidden"
              >
                {/* Decorative background number/letter */}
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-[80px] md:text-[120px] font-serif font-bold text-[#3E2723]/[0.03] group-hover:text-white/[0.05] transition-colors pointer-events-none">
                  {i + 1}
                </div>

                <div className="relative z-10 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-8 flex items-center justify-center text-[#C5A059] bg-white rounded-xl md:rounded-2xl shadow-sm border border-[#3E2723]/5 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-500">
                    {React.cloneElement(v.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  
                  <EditableText 
                    id={`about:values:${v.id}:title`} 
                    defaultContent={v.title} 
                    as="h3" 
                    className="text-lg md:text-2xl font-serif font-bold text-[#3E2723] group-hover:text-white mb-2 md:mb-6 transition-colors" 
                  />
                  
                  <EditableText 
                    id={`about:values:${v.id}:desc`} 
                    defaultContent={v.desc} 
                    as="p" 
                    className="text-[11px] md:text-[14px] text-[#3E2723]/60 group-hover:text-white/70 leading-relaxed font-light transition-colors line-clamp-3 md:line-clamp-none" 
                  />
                  
                  {/* Bottom accent line */}
                  <div className="w-6 md:w-8 h-[1.5px] md:h-[2px] bg-[#C5A059] mt-4 md:mt-8 opacity-40 group-hover:w-12 md:group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="mb-20 text-center lg:text-left">
            <EditableText id="about:timeline:sub" defaultContent="Our Journey" as="span" className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" />
            <EditableText id="about:timeline:title" defaultContent="From a Dream to a Legacy" as="h2" className="text-3xl md:text-5xl font-serif font-bold text-white mb-6" />
            <EditableText id="about:timeline:desc" defaultContent="What began as a small bakehouse with a big dream has grown into a community of bakers, learners, and dessert lovers around the world." as="p" className="text-[15px] text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light" />
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-[85px] left-0 w-full h-[1px] bg-[#C5A059]/20 hidden lg:block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-8"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                    <EditableImage 
                      id={`about:timeline:img:${i}`}
                      defaultSrc={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <EditableText 
                      id={`about:timeline:year:${i}`} 
                      defaultContent={item.year} 
                      as="div" 
                      className="text-[#C5A059] font-serif italic text-2xl mb-2" 
                    />
                    <div className="w-2 h-2 rounded-full bg-[#C5A059] mb-6 hidden lg:block shadow-[0_0_10px_#C5A059]" />
                    <EditableText 
                      id={`about:timeline:title:${i}`} 
                      defaultContent={item.title} 
                      as="h4" 
                      className="text-[18px] font-bold text-white mb-3 tracking-tight" 
                    />
                    <EditableText 
                      id={`about:timeline:desc:${i}`} 
                      defaultContent={item.desc} 
                      as="p" 
                      className="text-[13px] text-white/50 leading-relaxed font-light text-center lg:text-left" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craft Section */}
      <section className="py-24 bg-white border-y border-[#3E2723]/5">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px] md:h-[600px]"
            >
              <EditableImage 
                id="about:craft:img"
                defaultSrc="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200"
                alt="Chef at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="space-y-8 relative">
              <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="text-[#C5A059]">
                  <path d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <EditableText id="about:craft:sub" defaultContent="The Craft Behind Our Creations" as="span" className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3E2723] mb-6">
                  <EditableText id="about:craft:title:l1" defaultContent="Made by Hands." as="span" className="block" />
                  <EditableText id="about:craft:title:l2" defaultContent="Inspired by Heart." as="span" className="text-[#C5A059] italic font-light" />
                </h2>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-[#C5A059]/40" />
                  <div className="w-2 h-2 rounded-full border border-[#C5A059] flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#C5A059] rounded-full" />
                  </div>
                  <div className="text-[#C5A059]">
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <EditableText 
                id="about:craft:desc" 
                defaultContent="We believe great baking is both a science and an art. It's the perfect balance of precision and intuition, of tradition and innovation." 
                as="p" 
                className="text-[15px] md:text-[17px] text-[#3E2723]/70 leading-relaxed font-light max-w-lg" 
              />

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Slow fermentation for better flavor",
                  "Handcrafted in small batches",
                  "Trained by world-class pastry chefs",
                  "Always learning, always evolving"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-[13px] text-[#3E2723]/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <EditableText id={`about:craft:li:${i}`} defaultContent={item} as="span" />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="bg-[#1A1A1A] rounded-[2.5rem] py-12 md:py-16 px-8 md:px-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {[
                { id: "stat_1", icon: <Users className="w-5 h-5" />, value: "50K+", label: "Happy Customers" },
                { id: "stat_2", icon: <GraduationCap className="w-5 h-5" />, value: "2,500+", label: "Students Trained" },
                { id: "stat_3", icon: <Star className="w-5 h-5" />, value: "75+", label: "Courses Offered" },
                { id: "stat_4", icon: <Globe className="w-5 h-5" />, value: "18+", label: "Countries Reached" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center text-center md:text-left gap-5 text-white/90">
                  <div className="text-[#C5A059] w-12 h-12 flex items-center justify-center rounded-full border border-[#C5A059]/30 bg-white/5">{stat.icon}</div>
                  <div>
                    <EditableText id={`about:stats:${stat.id}:val`} defaultContent={stat.value} as="p" className="text-2xl md:text-3xl font-serif font-bold text-white" />
                    <EditableText id={`about:stats:${stat.id}:label`} defaultContent={stat.label} as="p" className="text-[10px] uppercase tracking-widest text-white/40 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Quote Section */}
      <section className="relative py-48 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1600" 
            className="w-full h-full object-cover opacity-50 transition-transform duration-[10s] ease-linear hover:scale-110" 
            alt="Artisan kitchen background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-[#C5A059] flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#C5A059]/10 blur-xl rounded-full" />
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="relative">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white leading-[1.05] tracking-tight mb-8">
                <EditableText id="about:quote:text:l1" defaultContent="Baking is not just what we do," as="span" className="block" />
                <EditableText id="about:quote:text:l2" defaultContent="it's who we are." as="span" className="italic text-[#C5A059] font-light" />
              </h2>
              
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-[1px] w-16 bg-white/20" />
                <EditableText id="about:quote:desc" defaultContent="Thank you for being a part of our story." as="p" className="text-lg md:text-xl text-white/50 font-light tracking-[0.1em]" />
                <div className="h-[1px] w-16 bg-white/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <EditableText id="about:quote:sig" defaultContent="- The Princess Bakery Family" as="p" className="font-dancing text-4xl md:text-5xl text-[#C5A059] mb-2" />
              <div className="w-12 h-[1px] bg-[#C5A059]/40 mt-4" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
