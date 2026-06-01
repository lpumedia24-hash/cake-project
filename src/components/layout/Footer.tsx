"use client";

import React from "react";
import Link from "next/link";
import { EditableText } from "@/components/admin/EditableText";
import { Logo } from "./Logo";
import { EditableImage } from "@/components/admin/EditableImage";
import { 
  Leaf, 
  Wheat, 
  Heart, 
  Users, 
  Gift, 
  Instagram, 
  Facebook, 
  Globe, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight 
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1209] text-white">
      {/* Top Value Strip */}
      <div className="bg-[#F5F0E8] border-b border-[#3E2723]/10">
        <div className="container mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-6">
            {[
              { icon: Wheat, id: "premium", title: "Premium Ingredients", desc: "We source the finest natural and seasonal ingredients." },
              { icon: Leaf, id: "fresh", title: "Baked Fresh Daily", desc: "Every product is freshly baked with care and passion." },
              { icon: Heart, id: "love", title: "Made With Love", desc: "Thoughtfully crafted recipes made to warm your heart." },
              { icon: Users, id: "community", title: "Rooted in Community", desc: "Supporting local growers and giving back to our community." },
              { icon: Gift, id: "sustainable", title: "Sustainable Choices", desc: "Eco-friendly practices for a better tomorrow and a better world." },
            ].map((item, i) => (
              <div key={i} className={`flex gap-3 items-start ${i < 4 ? 'md:border-r md:border-[#3E2723]/10 md:pr-4' : ''} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <item.icon className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <EditableText 
                    id={`footer:value:${item.id}:title`}
                    defaultContent={item.title}
                    as="p"
                    className="text-[#3E2723] font-bold text-[10px] uppercase tracking-[0.15em] mb-1"
                  />
                  <EditableText 
                    id={`footer:value:${item.id}:desc`}
                    defaultContent={item.desc}
                    as="p"
                    className="text-[#3E2723]/55 text-[11px] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.8fr] gap-10 md:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div>
              <div className="w-16 h-16 mb-2">
                <Logo circleColor="#C5A059" className="w-full h-full text-[#C5A059]" />
              </div>
              <EditableText
                id="footer:brand:name"
                defaultContent="PRINCESS BAKERY"
                as="p"
                className="font-serif text-2xl tracking-[0.1em] text-white leading-none"
              />
              <EditableText 
                id="footer:brand:sub"
                defaultContent="Artisanal Delights"
                as="p"
                className="text-[#C5A059]/70 text-[9px] font-bold uppercase tracking-[0.3em] mt-2"
              />
              <div className="h-px w-10 bg-[#C5A059]/30 mt-3" />
            </div>
            <EditableText 
              id="footer:brand:mission"
              defaultContent="A legacy of flavor, crafted with the finest ingredients and a touch of magic in every bite."
              as="p"
              className="text-white/45 text-[12px] leading-relaxed"
            />
            <EditableText 
              id="footer:brand:quote"
              defaultContent="Baked with passion,\nserved with a royal touch. ✨"
              as="p"
              className="font-serif italic text-[#C5A059] text-[14px] leading-snug"
            />

            <div className="flex gap-2.5 mt-1">
              {[Instagram, Facebook, Globe, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/40 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors duration-300">
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Our Boutique */}
          <div>
            <EditableText 
              id="footer:nav:boutique:title"
              defaultContent="Our Boutique"
              as="p"
              className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
            />
            <ul className="space-y-3">
              {["All Products", "Bread & Bakery", "Cakes", "Pastries", "Desserts", "Gift Hampers", "Seasonal Specials"].map((item, index) => (
                <li key={item}>
                  <Link href="/shop" className="text-white/50 text-[12px] hover:text-[#C5A059] transition-colors">
                    <EditableText 
                      id={`footer:links:boutique:${index}`}
                      defaultContent={item}
                      as="span"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <EditableText 
              id="footer:nav:visit:title"
              defaultContent="Visit Us"
              as="p"
              className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
            />
            <ul className="space-y-3">
              {["Our Cafés", "Menu", "Order Online", "Reservations", "Catering", "Private Events"].map((item, index) => (
                <li key={item}>
                  <Link href="/contact" className="text-white/50 text-[12px] hover:text-[#C5A059] transition-colors">
                    <EditableText 
                      id={`footer:links:visit:${index}`}
                      defaultContent={item}
                      as="span"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <EditableText 
              id="footer:nav:academy:title"
              defaultContent="Academy"
              as="p"
              className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
            />
            <ul className="space-y-3">
              {["All Courses", "Baking Classes", "Pastry Arts", "Bread Making", "Barista Training", "Workshops", "Certifications"].map((item, index) => (
                <li key={item}>
                  <Link href="/academy" className="text-white/50 text-[12px] hover:text-[#C5A059] transition-colors">
                    <EditableText 
                      id={`footer:links:academy:${index}`}
                      defaultContent={item}
                      as="span"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <EditableText 
              id="footer:nav:about:title"
              defaultContent="About Us"
              as="p"
              className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
            />
            <ul className="space-y-3">
              {["Our Story", "Our Ingredients", "Our Process", "Sustainability", "Careers", "Blog"].map((item, index) => (
                <li key={item}>
                  <Link href="/about" className="text-white/50 text-[12px] hover:text-[#C5A059] transition-colors">
                    <EditableText 
                      id={`footer:links:about:${index}`}
                      defaultContent={item}
                      as="span"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay in the Loop */}
          <div className="col-span-2 md:col-span-1">
            <EditableText 
              id="footer:newsletter:title"
              defaultContent="Stay in the Loop"
              as="p"
              className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
            />
            <EditableText 
              id="footer:newsletter:desc"
              defaultContent="Be the first to know about new arrivals, special offers and events."
              as="p"
              className="text-white/45 text-[12px] leading-relaxed mb-5"
            />
            <div className="flex items-center border border-white/12 rounded-xl overflow-hidden mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent text-white/70 text-[11px] px-4 py-3 outline-none placeholder:text-white/20"
              />
              <button className="bg-[#C5A059] hover:bg-[#D4AF6A] transition-colors px-4 py-3 shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden h-36">
              <EditableImage
                id="footer:newsletter:img"
                defaultSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                alt="Coffee and croissant"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Strip */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 md:px-10 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Find Us */}
            <div>
              <EditableText 
                id="footer:contact:title"
                defaultContent="Find Us"
                as="p"
                className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              />
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-white/50 text-[12px]">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <EditableText 
                    id="footer:contact:address"
                    defaultContent="23, Baker Street, Bandra West,\nMumbai, Maharashtra 400050"
                    as="span"
                  />
                </li>
                <li className="flex items-center gap-3 text-white/50 text-[12px]">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                  <EditableText 
                    id="footer:contact:phone"
                    defaultContent="+91 98765 43210"
                    as="span"
                  />
                </li>
                <li className="flex items-center gap-3 text-white/50 text-[12px]">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                  <EditableText 
                    id="footer:contact:email"
                    defaultContent="hello@princessbakery.com"
                    as="span"
                  />
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                <EditableText 
                  id="footer:hours:title"
                  defaultContent="Opening Hours"
                  as="p"
                  className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em]"
                />
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between text-[12px]">
                  <EditableText 
                    id="footer:hours:weekday:label"
                    defaultContent="Monday – Friday"
                    as="span"
                    className="text-white/50"
                  />
                  <EditableText 
                    id="footer:hours:weekday:time"
                    defaultContent="7:00 AM – 9:00 PM"
                    as="span"
                    className="text-white/80"
                  />
                </div>
                <div className="flex justify-between text-[12px]">
                  <EditableText 
                    id="footer:hours:weekend:label"
                    defaultContent="Saturday – Sunday"
                    as="span"
                    className="text-white/50"
                  />
                  <EditableText 
                    id="footer:hours:weekend:time"
                    defaultContent="8:00 AM – 10:00 PM"
                    as="span"
                    className="text-white/80"
                  />
                </div>
              </div>
              <EditableText 
                id="footer:hours:holiday"
                defaultContent="We're open all holidays!"
                as="p"
                className="text-[#C5A059] italic font-serif text-[13px] mt-5"
              />
            </div>

            {/* Follow Our Journey */}
            <div>
              <EditableText 
                id="footer:social:journey:title"
                defaultContent="Follow Our Journey"
                as="p"
                className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              />
              <div className="grid grid-cols-6 gap-1.5">
                {[
                  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
                  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200",
                  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200",
                  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200",
                  "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200",
                ].map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <EditableImage
                      id={`footer:social:gallery:${i}`}
                      defaultSrc={src}
                      alt={`Gallery ${i+1}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}
                <div className="aspect-square rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 flex flex-col items-center justify-center text-center p-1">
                  <Instagram className="w-3 h-3 text-[#C5A059] mb-0.5" />
                  <EditableText 
                    id="footer:social:handle"
                    defaultContent="@princess.bakery"
                    as="p"
                    className="text-[#C5A059] text-[7px] font-bold leading-tight"
                  />
                  <EditableText 
                    id="footer:social:tagline"
                    defaultContent="Tag us to get featured!"
                    as="p"
                    className="text-white/35 text-[6px] leading-tight mt-0.5"
                  />
                  <Heart className="w-2.5 h-2.5 text-[#C5A059]/60 mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-white/20">
            <EditableText 
              id="footer:copyright"
              defaultContent="© 2026 Princess Bakery. All rights reserved."
              as="p"
            />
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {["Privacy Policy", "Terms & Conditions", "Refund Policy", "Shipping Policy"].map((item, i, arr) => (
                <span key={i} className="flex items-center gap-3">
                  <Link href="#" className="hover:text-white/50 transition-colors">
                    <EditableText id={`footer:legal:link:${i}`} defaultContent={item} as="span" />
                  </Link>
                  {i < arr.length - 1 && <span className="text-white/8">|</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <EditableText 
                id="footer:credit:prefix"
                defaultContent="Designed with "
                as="span"
              />
              <Heart className="w-3 h-3 text-[#C5A059]/50 fill-[#C5A059]/30 inline" />
              <EditableText 
                id="footer:credit:suffix"
                defaultContent=" for good food & good people."
                as="span"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
