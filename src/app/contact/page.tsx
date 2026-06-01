"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Send,
  MessageSquare,
  User,
  AtSign,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";
import { useCMS } from "@/context/CMSContext";
import { EditableList } from "@/components/admin/EditableList";

export default function ContactPage() {
  const { isEditorMode, content } = useCMS();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "phone": return Phone;
      case "email": return Mail;
      case "address": return MapPin;
      case "hours": return Clock;
      default: return MessageSquare;
    }
  };

  const defaultInfoItems = [
    { id: "phone", icon: "phone", label: "Call Us", value: "+91 98765 43210", sub: "Mon-Sun, 9am - 8pm" },
    { id: "email", icon: "email", label: "Email Us", value: "hello@princessbakery.com", sub: "We'll reply within 24h" },
    { id: "address", icon: "address", label: "Visit Us", value: "Bandra West, Mumbai", sub: "23, Baker Street" },
    { id: "hours", icon: "hours", label: "Open Hours", value: "Everyday", sub: "9:00 AM - 8:00 PM" }
  ];

  const defaultSubjects = ["General Inquiry", "Special Order", "Academy Questions", "Feedback", "Catering"];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 md:pt-40">
      {/* Header Section */}
      <section className="container mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-[#3E2723]/40 hover:text-[#C5A059] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#3E2723]/20" />
            <EditableText 
              id="contact:header:breadcrumb"
              defaultContent="Contact Us"
              as="span"
              className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#3E2723] mb-6"
          >
            <EditableText id="contact:header:title:main" defaultContent="Get in " as="span" />
            <EditableText id="contact:header:title:accent" defaultContent="Touch" as="span" className="text-[#C5A059] italic font-dancing normal-case" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <EditableText 
              id="contact:header:desc"
              defaultContent="Have a question, a special request, or just want to say hello? \nWe'd love to hear from you. Reach out and let's start a conversation."
              as="p"
              className="text-[#3E2723]/60 text-[14px] md:text-[16px] leading-relaxed"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-6 md:px-10 pb-24 md:pb-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(62,39,35,0.05)] border border-[#3E2723]/5"
          >
            <div className="mb-10 text-center md:text-left">
              <EditableText id="contact:form:title" defaultContent="Send us a Message" as="h2" className="text-2xl md:text-3xl font-serif text-[#3E2723] mb-3" />
              <EditableText id="contact:form:sub" defaultContent="We usually respond within 24 hours." as="p" className="text-[#3E2723]/50 text-[13px]" />
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <EditableText id="contact:form:name:label" defaultContent="Your Name" as="label" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/60" />
                    {isEditorMode && (
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] text-[#C5A059] font-bold uppercase tracking-tighter">P-holder:</span>
                        <EditableText id="contact:form:name:placeholder" defaultContent="John Doe" as="span" className="text-[8px] text-[#C5A059] font-bold underline cursor-pointer" />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                    <input 
                      type="text" 
                      placeholder={content["contact:form:name:placeholder"] || "John Doe"}
                      className="w-full bg-[#FAF8F5] border border-[#3E2723]/5 rounded-2xl py-4 pl-12 pr-4 text-[13px] outline-none focus:border-[#C5A059]/30 transition-colors placeholder:text-[#3E2723]/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <EditableText id="contact:form:email:label" defaultContent="Email Address" as="label" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/60" />
                    {isEditorMode && (
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] text-[#C5A059] font-bold uppercase tracking-tighter">P-holder:</span>
                        <EditableText id="contact:form:email:placeholder" defaultContent="john@example.com" as="span" className="text-[8px] text-[#C5A059] font-bold underline cursor-pointer" />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                    <input 
                      type="email" 
                      placeholder={content["contact:form:email:placeholder"] || "john@example.com"}
                      className="w-full bg-[#FAF8F5] border border-[#3E2723]/5 rounded-2xl py-4 pl-12 pr-4 text-[13px] outline-none focus:border-[#C5A059]/30 transition-colors placeholder:text-[#3E2723]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <EditableText id="contact:form:subject:label" defaultContent="Subject" as="label" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/60 ml-1" />
                <div className="relative">
                  <select className="w-full bg-[#FAF8F5] border border-[#3E2723]/5 rounded-2xl py-4 px-4 text-[13px] outline-none focus:border-[#C5A059]/30 transition-colors appearance-none cursor-pointer text-[#3E2723]/60">
                    {(content.sections["contact:form:subjects"] || defaultSubjects).map((subj: string, i: number) => (
                      <option key={i}>{subj}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] rotate-90" />
                </div>
                {isEditorMode && (
                  <div className="mt-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#C5A059]/10">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-[#C5A059] mb-3">Edit Subject Options:</p>
                    <EditableList
                      id="contact:form:subjects"
                      defaultItems={defaultSubjects}
                      newItemTemplate="New Option"
                      className="grid grid-cols-2 gap-2"
                      renderItem={(item, index) => (
                        <div className="bg-white p-2 rounded-lg border border-[#3E2723]/5">
                          <EditableText 
                            id={`contact:form:subjects:${index}`} 
                            defaultContent={item} 
                            as="span" 
                            className="text-[11px] block w-full"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <EditableText id="contact:form:message:label" defaultContent="Your Message" as="label" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/60" />
                  {isEditorMode && (
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] text-[#C5A059] font-bold uppercase tracking-tighter">P-holder:</span>
                      <EditableText id="contact:form:message:placeholder" defaultContent="How can we help you?" as="span" className="text-[8px] text-[#C5A059] font-bold underline cursor-pointer" />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                  <textarea 
                    rows={5}
                    placeholder={content["contact:form:message:placeholder"] || "How can we help you?"}
                    className="w-full bg-[#FAF8F5] border border-[#3E2723]/5 rounded-2xl py-5 pl-12 pr-4 text-[13px] outline-none focus:border-[#C5A059]/30 transition-colors placeholder:text-[#3E2723]/20 resize-none"
                  ></textarea>
                </div>
              </div>

              <button className="w-full py-5 bg-[#3E2723] text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#C5A059] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#3E2723]/10">
                <EditableText id="contact:form:btn" defaultContent="Send Message" as="span" /> <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            {/* Info Cards */}
            <EditableList
              id="contact:info:items"
              defaultItems={defaultInfoItems}
              newItemTemplate={{ id: "new", icon: "phone", label: "New Title", value: "New Value", sub: "New Subtext" }}
              className="grid sm:grid-cols-2 gap-6"
              renderItem={(item) => {
                const Icon = getIcon(item.icon);
                return (
                  <div className="bg-white h-full rounded-3xl p-6 border border-[#3E2723]/5 flex flex-col gap-4 group hover:border-[#C5A059]/30 transition-colors">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <EditableText id={`contact:info:${item.id}:label`} defaultContent={item.label} as="p" className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/40 mb-1" />
                      <EditableText id={`contact:info:${item.id}:value`} defaultContent={item.value} as="p" className="text-[#3E2723] font-serif text-lg leading-tight mb-1" />
                      <EditableText id={`contact:info:${item.id}:sub`} defaultContent={item.sub} as="p" className="text-[#3E2723]/40 text-[11px]" />
                    </div>
                  </div>
                );
              }}
            />

            {/* Image Box */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] md:aspect-auto md:h-[350px] shadow-2xl border-4 border-white">
              <EditableImage 
                id="contact:media:img"
                defaultSrc="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200" 
                alt="Our Cafe" 
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                <EditableText id="contact:media:accent" defaultContent="Visit our cozy corner" as="p" className="font-dancing text-2xl mb-2 text-[#C5A059]" />
                <EditableText id="contact:media:sub" defaultContent="Experience the magic in person" as="p" className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-80" />
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center lg:text-left">
              <EditableText id="contact:socials:label" defaultContent="Follow Our Story" as="p" className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3E2723]/60 mb-6 ml-1" />
              <div className="flex justify-center lg:justify-start gap-4">
                {[
                  { id: "ig", icon: Instagram, label: "Instagram" },
                  { id: "fb", icon: Facebook, label: "Facebook" },
                  { id: "tw", icon: Twitter, label: "Twitter" }
                ].map((social, i) => (
                  <button key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#3E2723]/5 text-[#3E2723] hover:border-[#C5A059] hover:text-[#C5A059] transition-all group">
                    <social.icon className="w-4 h-4" strokeWidth={1.5} />
                    <EditableText id={`contact:socials:${social.id}:label`} defaultContent={social.label} as="span" className="text-[10px] uppercase tracking-[0.2em] font-bold" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[400px] md:h-[600px] relative overflow-hidden bg-[#FAF8F5]">
        <div className="absolute inset-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
           <EditableImage 
            id="contact:map:img"
            defaultSrc="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600" 
            alt="Map location" 
            className="w-full h-full"
           />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FAF8F5] via-transparent to-[#FAF8F5]" />
        
        {/* Floating Location Tag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-6 rounded-3xl shadow-2xl border border-[#3E2723]/5 flex flex-col items-center gap-3 z-10"
        >
          <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center shadow-lg shadow-[#C5A059]/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <EditableText id="contact:map:title" defaultContent="Princess Bakery" as="p" className="text-[#3E2723] font-serif text-xl mb-1" />
            <EditableText id="contact:map:address" defaultContent="Bandra West, Mumbai" as="p" className="text-[#3E2723]/40 text-[11px] uppercase tracking-widest" />
          </div>
          <button className="mt-2 px-6 py-2 border border-[#C5A059]/30 text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#C5A059] hover:text-white transition-colors">
            <EditableText id="contact:map:btn" defaultContent="Get Directions" as="span" />
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
