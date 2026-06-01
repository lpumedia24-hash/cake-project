"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Clock, BarChart, ChevronRight, Star } from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";

export default function AcademyDashboard() {
  const currentCourses = [
    { 
      title: "Mastering French Macarons", 
      progress: 65, 
      lastWatched: "Lesson 4: Meringue Techniques",
      image: "https://images.unsplash.com/photo-1558317374-067df5f15430?w=400"
    },
    { 
      title: "Artisanal Sourdough Masterclass", 
      progress: 20, 
      lastWatched: "Lesson 2: Fermentation Science",
      image: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=400"
    },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <EditableText id="student:header:title" defaultContent="My Learning Journey" as="h1" className="text-4xl font-serif font-bold text-luxury mb-2" />
          <EditableText id="student:header:quote" defaultContent='"Baking is a science of precision and an art of soul."' as="p" className="text-muted-foreground font-medium italic" />
        </div>
        <div className="flex space-x-4">
          <div className="premium-card !p-4 !rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BarChart className="w-5 h-5" />
            </div>
            <div>
              <EditableText id="student:stats:progress:label" defaultContent="Overall Progress" as="p" className="text-[10px] uppercase font-bold text-muted-foreground" />
              <p className="text-sm font-bold">42% Complete</p>
            </div>
          </div>
          <div className="premium-card !p-4 !rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <EditableText id="student:stats:time:label" defaultContent="Time Spent" as="p" className="text-[10px] uppercase font-bold text-muted-foreground" />
              <p className="text-sm font-bold">12h 45m</p>
            </div>
          </div>
        </div>
      </header>

      {/* Continue Watching Section */}
      <section>
        <h3 className="text-xl font-serif font-bold mb-6 flex items-center">
          <EditableText id="student:continue:title" defaultContent="Continue Watching" as="span" />
          <span className="ml-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
            {currentCourses.length}
          </span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentCourses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card group cursor-pointer relative overflow-hidden flex flex-col md:flex-row p-0"
            >
              <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
                <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-2xl">
                    <Play className="w-6 h-6 fill-primary" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6">
                <h4 className="text-xl font-serif font-bold mb-2">{course.title}</h4>
                <p className="text-xs text-primary font-bold mb-6 italic">{course.lastWatched}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendations / New Courses */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <EditableText id="student:recommend:title" defaultContent="New for You" as="h3" className="text-xl font-serif font-bold" />
          <button className="text-sm font-bold text-primary flex items-center group">
            <EditableText id="student:recommend:btn" defaultContent="Browse All Courses" as="span" /> <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Royal Icing 101", level: "Beginner", chef: "Chef Amélie", rating: 4.9 },
            { title: "Chocolate Tempering", level: "Intermediate", chef: "Chef Marco", rating: 4.8 },
            { title: "Gluten-Free Pastries", level: "Advanced", chef: "Chef Elena", rating: 4.7 },
          ].map((course, i) => (
            <div key={i} className="premium-card !p-0 overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-48 bg-muted relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-primary">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-serif font-bold mb-1">{course.title}</h4>
                <p className="text-xs text-muted-foreground mb-4">by {course.chef}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500 mr-1" />
                    <span className="text-xs font-bold text-foreground">{course.rating}</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
