"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Award, Users, BookOpen, Clock, Calendar, CheckCircle2, Globe, GraduationCap, Star } from "lucide-react";
import Link from "next/link";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";

const ESPRESSO = "#3E2723";
const GOLD = "#C5A059";
const CREAM = "#FAF8F5";

export default function AcademyLandingPage() {
  const instructors = [
    {
      id: "instr_1",
      name: "Chef Amélie Laurent",
      role: "Head of Patisserie",
      specialty: "Macarons & Viennoiserie",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800"
    },
    {
      id: "instr_2",
      name: "Chef Marco Rossi",
      role: "Master Baker",
      specialty: "Sourdough & Artisan Bread",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800"
    },
    {
      id: "instr_3",
      name: "Chef Julien Dubois",
      role: "Coffee & Barista Expert",
      specialty: "Espresso & Latte Art",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800"
    },
    {
      id: "instr_4",
      name: "Chef Sofia Moretti",
      role: "Chocolate Artisan",
      specialty: "Fine Tempered Chocolates",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800"
    }
  ];

  const programs = [
    { id: "prog_1", title: "Patisserie Arts", desc: "Master modern desserts and classic techniques.", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600" },
    { id: "prog_2", title: "Artisan Baking", desc: "Create beautiful bread with natural fermentation.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600" },
    { id: "prog_3", title: "Advanced Cakes", desc: "Take your cake skills to the next professional level.", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600" },
    { id: "prog_4", title: "Barista Training", desc: "Become a confident barista and coffee specialist.", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600" },
    { id: "prog_5", title: "Short Workshops", desc: "Quick, fun and focused baking workshops.", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E2723] selection:bg-[#C5A059]/20 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Decorative Background Shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F4EFE6]/30 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />
        
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 z-10 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <EditableText
                  id="academy:hero:sub"
                  defaultContent="Princess Baking Academy"
                  as="span"
                  className="inline-block text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.25em]"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold leading-[1.1] text-[#3E2723]">
                  <EditableText id="academy:hero:h1:l1" defaultContent="Craft. Learn." as="span" className="block" />
                  <EditableText id="academy:hero:h1:l2" defaultContent="Inspire." as="span" className="text-[#C5A059] italic font-light" />
                </h1>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <EditableText 
                  id="academy:hero:desc"
                  defaultContent="Master the art of baking and patisserie from industry experts. Whether you're a passionate home baker or aspiring professional, our academy helps you grow with hands-on learning and real-world skills."
                  as="p"
                  className="text-[16px] text-[#3E2723]/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
              >
                <Link 
                  href="/academy/student" 
                  className="px-9 py-4 rounded-full bg-[#3E2723] text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#2A1A17] transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <EditableText id="academy:hero:btn:1" defaultContent="Explore Courses" as="span" /> <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="px-9 py-4 rounded-full border border-[#C5A059] text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#C5A059]/5 transition-all flex items-center gap-2">
                  <EditableText id="academy:hero:btn:2" defaultContent="Watch Intro" as="span" /> <Play className="w-4 h-4 fill-current" />
                </button>
              </motion.div>
            </div>

            {/* Right Image Container */}
            <div className="flex-1 relative w-full h-[450px] lg:h-[680px] z-10">
              {/* Rotating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-10 -left-10 z-30 hidden lg:block"
              >
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059]/30 fill-current">
                      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                      <text className="text-[8px] font-bold uppercase tracking-[0.2em]">
                        <textPath href="#circlePath">Princess Baking Academy • Artisan Excellence • Princess Baking Academy • </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-white shadow-lg">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full rounded-[2.5rem] lg:rounded-none lg:rounded-l-[5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-transparent to-transparent z-10 w-1/4 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 lg:hidden" />
              <EditableImage 
                id="academy:hero:img"
                defaultSrc="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600"
                alt="Chef decorating a cake"
                className="w-full h-full object-cover"
              />
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 bg-black/80 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/10 flex items-center gap-3 lg:gap-4 text-white shadow-2xl"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 flex items-center justify-center text-[#C5A059]">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <EditableText id="academy:hero:stat:num" defaultContent="2,500+" as="p" className="font-serif text-lg lg:text-xl font-bold" />
                  <EditableText id="academy:hero:stat:label" defaultContent="Students Trained" as="p" className="text-[8px] lg:text-[10px] text-white/60 uppercase tracking-widest leading-tight" />
                </div>
              </motion.div>
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 border-y border-[#3E2723]/10 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 divide-[#3E2723]/10 md:divide-x">
            {[
              { id: "feat_1", icon: <GraduationCap className="w-6 h-6" />, title: "Expert Instructors", desc: "Learn from award-winning chefs and industry leaders." },
              { id: "feat_2", icon: <BookOpen className="w-6 h-6" />, title: "Hands-on Learning", desc: "Practical classes with real kitchen experience." },
              { id: "feat_3", icon: <Award className="w-6 h-6" />, title: "Certification", desc: "Industry-recognized certificates on completion." },
              { id: "feat_4", icon: <Users className="w-6 h-6" />, title: "Community Support", desc: "Be a part of a passionate baking community." }
            ].map((f, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:px-6 first:px-0">
                <div className="text-[#C5A059] shrink-0">{f.icon}</div>
                <div>
                  <EditableText id={`academy:features:${f.id}:title`} defaultContent={f.title} as="h4" className="text-[14px] font-bold text-[#3E2723] mb-1" />
                  <EditableText id={`academy:features:${f.id}:desc`} defaultContent={f.desc} as="p" className="text-[12px] text-[#3E2723]/60 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Masters */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
            <div>
              <EditableText id="academy:instructors:sub" defaultContent="Meet The Masters" as="span" className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" />
              <EditableText id="academy:instructors:title" defaultContent="Learn from the Best" as="h2" className="text-3xl md:text-5xl font-serif font-bold text-[#3E2723]" />
            </div>
            <button className="text-[11px] font-bold text-[#C5A059] uppercase tracking-[0.1em] hover:underline flex items-center justify-center gap-2">
              <EditableText id="academy:instructors:btn" defaultContent="View All Instructors" as="span" /> <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {instructors.map((instructor, i) => (
              <div key={i} className="group">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden mb-4 h-48 md:h-72 bg-white shadow-lg">
                  <EditableImage 
                    id={`academy:instructors:${instructor.id}:img`}
                    defaultSrc={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <EditableText id={`academy:instructors:${instructor.id}:name`} defaultContent={instructor.name} as="h3" className="text-[14px] md:text-xl font-bold text-[#3E2723] mb-1" />
                <EditableText id={`academy:instructors:${instructor.id}:role`} defaultContent={instructor.role} as="p" className="text-[10px] md:text-[12px] text-[#3E2723]/80 font-medium mb-1" />
                <div className="hidden md:flex items-center gap-1 mb-4">
                  <span className="text-[12px] text-[#3E2723]/50 italic">Specialty: </span>
                  <EditableText id={`academy:instructors:${instructor.id}:specialty`} defaultContent={instructor.specialty} as="p" className="text-[12px] text-[#3E2723]/50 italic" />
                </div>
                
                {/* Social Icons Mock */}
                <div className="flex gap-2">
                  {['ig', 'fb', 'in'].map(social => (
                    <div key={social} className="w-8 h-8 rounded-full bg-[#3E2723]/5 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-colors cursor-pointer text-[10px] font-bold">
                      {social}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-24 bg-white border-y border-[#3E2723]/5">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
            <div>
              <EditableText id="academy:programs:sub" defaultContent="Our Programs" as="span" className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" />
              <EditableText id="academy:programs:title" defaultContent="Courses for Every Passion" as="h2" className="text-3xl md:text-5xl font-serif font-bold text-[#3E2723]" />
            </div>
            <button className="text-[11px] font-bold text-[#C5A059] uppercase tracking-[0.1em] hover:underline flex items-center justify-center gap-2">
              <EditableText id="academy:programs:btn" defaultContent="View All Courses" as="span" /> <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {programs.map((prog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden mb-4 h-44 bg-[#FAF8F5] shadow-sm">
                  <EditableImage 
                    id={`academy:programs:${prog.id}:img`}
                    defaultSrc={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <EditableText id={`academy:programs:${prog.id}:title`} defaultContent={prog.title} as="h4" className="text-[15px] font-bold text-[#3E2723] mb-2 group-hover:text-[#C5A059] transition-colors" />
                <EditableText id={`academy:programs:${prog.id}:desc`} defaultContent={prog.desc} as="p" className="text-[12px] text-[#3E2723]/60 mb-4 leading-relaxed h-10" />
                <div className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
                  Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-16 bg-[#F4EFE6]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { id: "stat_1", icon: <GraduationCap className="w-8 h-8" />, num: "2,500+", label: "Students Trained" },
              { id: "stat_2", icon: <BookOpen className="w-8 h-8" />, num: "75+", label: "Courses Offered" },
              { id: "stat_3", icon: <Globe className="w-8 h-8" />, num: "18+", label: "Countries Reached" },
              { id: "stat_4", icon: <Star className="w-8 h-8" />, num: "98%", label: "Student Satisfaction" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
                <div className="w-16 h-16 rounded-full border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  {stat.icon}
                </div>
                <div>
                  <EditableText id={`academy:stats:${stat.id}:num`} defaultContent={stat.num} as="p" className="text-3xl font-serif font-bold text-[#3E2723]" />
                  <EditableText id={`academy:stats:${stat.id}:label`} defaultContent={stat.label} as="p" className="text-[10px] uppercase tracking-widest text-[#3E2723]/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            
            {/* Left */}
            <div>
              <EditableText id="academy:cta:sub" defaultContent="Your Journey Starts Here" as="span" className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block" />
              <EditableText id="academy:cta:title" defaultContent="Ready to Master Your Passion?" as="h2" className="text-4xl md:text-5xl font-serif font-bold mb-6" />
              <EditableText 
                id="academy:cta:desc"
                defaultContent="Join Princess Baking Academy and turn your love for baking into a skill that lasts a lifetime."
                as="p"
                className="text-white/60 text-[14px] leading-relaxed"
              />
            </div>

            {/* Middle Features */}
            <div className="space-y-8">
              {[
                { id: "feat_1", icon: <Calendar />, title: "Flexible Schedules", desc: "Weekend & weekday classes" },
                { id: "feat_2", icon: <CheckCircle2 />, title: "Beginner to Advanced", desc: "Courses for all skill levels" },
                { id: "feat_3", icon: <Clock />, title: "Lifetime Access", desc: "Study at your own pace" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-[#C5A059] shrink-0">{item.icon}</div>
                  <div>
                    <EditableText id={`academy:cta:features:${item.id}:title`} defaultContent={item.title} as="h4" className="text-[14px] font-bold mb-1" />
                    <EditableText id={`academy:cta:features:${item.id}:desc`} defaultContent={item.desc} as="p" className="text-[12px] text-white/50" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Card */}
            <div className="bg-[#2A2A2A] rounded-3xl p-10 border border-white/5 shadow-2xl">
              <EditableText id="academy:cta:card:title" defaultContent="Get started with our upcoming intake." as="h3" className="text-xl font-serif font-bold mb-8" />
              <Link 
                href="/academy/student" 
                className="w-full block text-center py-4 rounded-xl bg-[#C5A059] text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#B28B47] transition-all"
              >
                <EditableText id="academy:cta:card:btn" defaultContent="Enroll Now" as="span" /> &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
