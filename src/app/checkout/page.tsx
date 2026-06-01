"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  ChevronLeft, Minus, Plus, Trash2, MapPin, CreditCard,
  Banknote, Smartphone, CheckCircle, Package, Truck,
  Shield, Lock, ArrowRight, Gift, Tag, ChevronDown,
} from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";

const P = "#C5A059";   // gold/primary
const E = "#3E2723";   // espresso
const C = "#FAF8F5";   // cream

// ── tiny helpers ─────────────────────────────────────────────────────────────
function StepBadge({ n }: { n: number }) {
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
      style={{ backgroundColor: P }}>
      {n}
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border p-6 ${className}`}
      style={{ borderColor: "rgba(62,39,35,0.08)" }}>
      {children}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: `${E}60` }}>
      {children}{required && <span style={{ color: P }}> *</span>}
    </label>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl text-[13px] border outline-none transition-all focus:ring-2"
      style={{ borderColor: "rgba(62,39,35,0.14)", color: E,
        // @ts-ignore
        "--tw-ring-color": `${P}30` }}
    />
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);
  const [slot, setSlot] = useState(0);
  const [payment, setPayment] = useState<"card" | "upi" | "cod">("card");
  const [promo, setPromo] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    street: "", state: "", pin: "",
    cardName: "", cardNum: "", expiry: "", cvv: "", upi: "",
  });

  useEffect(() => setMounted(true), []);

  const cartItems = mounted ? items : [];
  const subtotal  = mounted ? totalPrice() : 0;
  const delivery  = subtotal > 500 ? 0 : 99;
  const tax       = +(subtotal * 0.05).toFixed(2);
  const total     = subtotal + delivery + tax;

  const f = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const slots = [
    { time: "9:00 AM – 12:00 PM", date: `${today}, Today` },
    { time: "12:00 PM – 3:00 PM", date: `${today}, Today` },
    { time: "3:00 PM – 6:00 PM",  date: `${today}, Today` },
    { time: "6:00 PM – 9:00 PM",  date: `${today}, Today` },
  ];

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setPlacing(false);
    setDone(true);
  };

  // ── success ──────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16" style={{ backgroundColor: C }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: `${P}15` }}>
            <CheckCircle className="w-10 h-10" style={{ color: P }} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-4xl font-serif font-bold mb-3" style={{ color: E }}>Order Placed!</h1>
          <p className="text-[14px] mb-2 leading-relaxed" style={{ color: `${E}65` }}>
            We've received your order and will start preparing it shortly.
          </p>
          <p className="text-[13px] font-bold mb-10" style={{ color: P }}>
            Order #{Math.floor(Math.random() * 90000 + 10000)}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/shop" className="w-full py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: P }}>Continue Shopping</Link>
            <Link href="/" className="w-full py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest border"
              style={{ borderColor: "rgba(62,39,35,0.15)", color: E }}>Back to Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── checkout ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-20" style={{ backgroundColor: C }}>
      {/* Subtle leaf decorations */}
      <div className="fixed left-0 top-24 w-48 h-48 opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400" alt=""
          className="w-full h-full object-cover"
          style={{ maskImage: "radial-gradient(circle,white 20%,transparent 70%)" }} />
      </div>
      <div className="fixed right-0 top-24 w-48 h-48 opacity-10 pointer-events-none scale-x-[-1]">
        <img src="https://images.unsplash.com/photo-1550100412-4ebf8c6ebf77?w=400" alt=""
          className="w-full h-full object-cover"
          style={{ maskImage: "radial-gradient(circle,white 20%,transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-[12px] font-medium mb-8 hover:opacity-70 transition-opacity"
          style={{ color: `${E}65` }}>
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Boutique
        </Link>

        {/* Page heading */}
        <div className="mb-8">
          <EditableText id="checkout:hero:sub" defaultContent="Secure Checkout" as="p" className="text-[10px] font-bold uppercase tracking-[0.45em] mb-2" style={{ color: P }} />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3" style={{ color: E }}>
            <EditableText id="checkout:hero:title:p1" defaultContent="Complete Your " as="span" />
            <EditableText id="checkout:hero:title:p2" defaultContent="Order" as="span" className="italic" style={{ color: P }} />
          </h1>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 shrink-0" style={{ color: P }} strokeWidth={1.5} />
            <EditableText 
              id="checkout:hero:security" 
              defaultContent="Your information is safe with us. We use secure encryption to protect your details." 
              as="p"
              className="text-[12px]" 
              style={{ color: `${E}55` }} 
            />
          </div>
        </div>

        <form onSubmit={handleOrder}>
          <div className="flex flex-col lg:flex-row gap-7 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div className="flex-1 space-y-5">

              {/* Step 1 — Delivery Details */}
              <SectionCard>
                <div className="flex items-center gap-3 mb-6">
                  <StepBadge n={1} />
                  <MapPin className="w-4.5 h-4.5" style={{ color: P }} strokeWidth={1.5} />
                  <div>
                    <h2 className="text-[16px] font-serif font-bold" style={{ color: E }}>
                      <EditableText id="checkout:step1:title" defaultContent="Delivery Details" />
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* First + Last name */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <FieldLabel required>First Name</FieldLabel>
                      <Input placeholder="Arjun" value={form.firstName} onChange={f("firstName")} />
                    </div>
                    <div className="flex-1">
                      <FieldLabel required>Last Name</FieldLabel>
                      <Input placeholder="Sharma" value={form.lastName} onChange={f("lastName")} />
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>Email Address</FieldLabel>
                    <Input placeholder="arjun@email.com" value={form.email} onChange={f("email")} type="email" />
                  </div>

                  <div>
                    <FieldLabel required>Phone Number</FieldLabel>
                    <Input placeholder="+91 98765 43210" value={form.phone} onChange={f("phone")} type="tel" />
                  </div>

                  {/* Address row */}
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-[2] min-w-[150px]">
                      <FieldLabel required>Street Address</FieldLabel>
                      <Input placeholder="Mumbai" value={form.street} onChange={f("street")} />
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <FieldLabel required>State</FieldLabel>
                      <div className="relative">
                        <select
                          value={form.state} onChange={e => f("state")(e.target.value)}
                          className="w-full appearance-none px-4 py-3 rounded-xl text-[13px] border outline-none pr-8"
                          style={{ borderColor: "rgba(62,39,35,0.14)", color: E }}>
                          <option value="">Maharashtra</option>
                          <option>Delhi</option><option>Karnataka</option>
                          <option>Tamil Nadu</option><option>Telangana</option>
                          <option>Gujarat</option><option>Rajasthan</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                          style={{ color: `${E}50` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[100px]">
                      <FieldLabel required>PIN Code</FieldLabel>
                      <Input placeholder="400001" value={form.pin} onChange={f("pin")} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Step 2 — Delivery Slot */}
              <SectionCard>
                <div className="flex items-center gap-3 mb-2">
                  <StepBadge n={2} />
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
                    {/* calendar icon via SVG */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-[16px] font-serif font-bold" style={{ color: E }}>
                      <EditableText id="checkout:step2:title" defaultContent="Delivery Slot" />
                    </h2>
                    <EditableText 
                      id="checkout:step2:sub" 
                      defaultContent="Choose a convenient time for delivery" 
                      as="p"
                      className="text-[11px]" 
                      style={{ color: `${E}50` }} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {slots.map((s, i) => (
                    <button key={i} type="button" onClick={() => setSlot(i)}
                      className="flex flex-col items-center py-3.5 px-2 rounded-xl border transition-all duration-200 text-center"
                      style={{
                        borderColor: slot === i ? P : "rgba(62,39,35,0.12)",
                        backgroundColor: slot === i ? `${P}10` : "white",
                        boxShadow: slot === i ? `0 0 0 1.5px ${P}` : "none",
                      }}>
                      <span className="text-[12px] font-bold leading-snug" style={{ color: slot === i ? P : E }}>{s.time}</span>
                      <span className="text-[10px] mt-1" style={{ color: `${E}50` }}>{s.date}</span>
                    </button>
                  ))}
                </div>
              </SectionCard>

              {/* Step 3 — Payment Method */}
              <SectionCard>
                <div className="flex items-center gap-3 mb-5">
                  <StepBadge n={3} />
                  <CreditCard className="w-4.5 h-4.5" style={{ color: P }} strokeWidth={1.5} />
                  <div>
                    <h2 className="text-[16px] font-serif font-bold" style={{ color: E }}>
                      <EditableText id="checkout:step3:title" defaultContent="Payment Method" />
                    </h2>
                    <EditableText 
                      id="checkout:step3:sub" 
                      defaultContent="Choose a payment option" 
                      as="p"
                      className="text-[11px]" 
                      style={{ color: `${E}50` }} 
                    />
                  </div>
                </div>

                {/* Payment options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { id: "card" as const, icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                    { id: "upi" as const,  icon: Smartphone,  label: "UPI", sub: "GPay, PhonePe, Paytm & more" },
                    { id: "cod" as const,  icon: Banknote,    label: "Cash on Delivery", sub: "Pay when your order arrives" },
                  ].map(({ id, icon: Icon, label, sub }) => (
                    <button key={id} type="button" onClick={() => setPayment(id)}
                      className="flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 text-left"
                      style={{
                        borderColor: payment === id ? P : "rgba(62,39,35,0.12)",
                        backgroundColor: payment === id ? `${P}08` : "white",
                        boxShadow: payment === id ? `0 0 0 1.5px ${P}` : "none",
                      }}>
                      <Icon className="w-4.5 h-4.5 mt-0.5 shrink-0" style={{ color: payment === id ? P : `${E}50` }} strokeWidth={1.5} />
                      <div>
                        <p className="text-[12px] font-bold" style={{ color: E }}>{label}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: `${E}50` }}>{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                <AnimatePresence>
                  {payment === "card" && (
                    <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pt-4 border-t space-y-4" style={{ borderColor: "rgba(62,39,35,0.08)" }}>
                        <p className="text-[12px] font-bold uppercase tracking-[0.15em]" style={{ color: `${E}60` }}>Card Details</p>
                        <div>
                          <FieldLabel>Cardholder Name</FieldLabel>
                          <Input placeholder="Arjun Sharma" value={form.cardName} onChange={f("cardName")} />
                        </div>
                        <div>
                          <FieldLabel>Card Number</FieldLabel>
                          <Input placeholder="•••• •••• •••• ••••" value={form.cardNum} onChange={f("cardNum")} />
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <FieldLabel>Expiry</FieldLabel>
                            <Input placeholder="MM / YY" value={form.expiry} onChange={f("expiry")} />
                          </div>
                          <div className="flex-1">
                            <FieldLabel>CVV</FieldLabel>
                            <Input placeholder="•••" value={form.cvv} onChange={f("cvv")} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {payment === "upi" && (
                    <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pt-4 border-t" style={{ borderColor: "rgba(62,39,35,0.08)" }}>
                        <FieldLabel>UPI ID</FieldLabel>
                        <Input placeholder="yourname@upi" value={form.upi} onChange={f("upi")} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-[11px] mt-5 flex items-center justify-center gap-1.5" style={{ color: `${E}45` }}>
                  <Lock className="w-3 h-3" /> All transactions are secure and encrypted
                </p>
              </SectionCard>
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────────────────── */}
            <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-24 space-y-4">

              {/* Your Order */}
              <SectionCard>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[17px] font-serif font-bold" style={{ color: E }}>Your Order</h2>
                  <Link href="/shop" className="text-[11px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                    style={{ color: P }}>Edit Cart</Link>
                </div>

                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-[13px] mb-3" style={{ color: `${E}40` }}>Your cart is empty</p>
                    <Link href="/shop" className="text-[12px] font-bold" style={{ color: P }}>Browse Boutique →</Link>
                  </div>
                ) : (
                  <div className="space-y-4 mb-5">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border" style={{ borderColor: "rgba(62,39,35,0.08)" }}>
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold truncate" style={{ color: E }}>{item.name}</p>
                          <p className="text-[13px] font-bold mt-0.5" style={{ color: P }}>${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md border flex items-center justify-center hover:border-[#C5A059] transition-colors"
                              style={{ borderColor: "rgba(62,39,35,0.2)" }}>
                              <Minus className="w-2.5 h-2.5" style={{ color: E }} />
                            </button>
                            <span className="text-[13px] font-bold w-5 text-center" style={{ color: E }}>{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md border flex items-center justify-center hover:border-[#C5A059] transition-colors"
                              style={{ borderColor: "rgba(62,39,35,0.2)" }}>
                              <Plus className="w-2.5 h-2.5" style={{ color: E }} />
                            </button>
                            <button type="button" onClick={() => removeItem(item.id)} className="ml-auto hover:opacity-50 transition-opacity">
                              <Trash2 className="w-3.5 h-3.5" style={{ color: `${E}40` }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo */}
                <div className="border-t pt-4" style={{ borderColor: "rgba(62,39,35,0.08)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3.5 h-3.5" style={{ color: P }} strokeWidth={1.5} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: `${E}60` }}>Promo Code</span>
                  </div>
                  <div className="flex gap-2">
                    <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Enter code"
                      className="flex-1 px-4 py-2.5 rounded-xl border text-[13px] outline-none"
                      style={{ borderColor: "rgba(62,39,35,0.14)", color: E }} />
                    <button type="button"
                      className="px-5 py-2.5 rounded-xl text-[12px] font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: E }}>Apply</button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Subtotal", val: `$${subtotal.toFixed(2)}` },
                    { label: "Delivery Charges", val: delivery === 0 ? "Free" : `$${delivery.toFixed(2)}` },
                    { label: "Tax (5%)", val: `$${tax.toFixed(2)}` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-[13px]">
                      <span style={{ color: `${E}60` }}>{label}</span>
                      <span className="font-semibold" style={{ color: E }}>{val}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: "rgba(62,39,35,0.08)" }}>
                    <span className="text-[16px] font-bold" style={{ color: E }}>Total</span>
                    <span className="text-[22px] font-bold font-serif" style={{ color: E }}>${total.toFixed(2)}</span>
                  </div>
                </div>
              </SectionCard>

              {/* Trust badges */}
              <SectionCard className="space-y-4">
                {[
                  { icon: Shield, label: "Secure Payment",   sub: "256-bit SSL encrypted" },
                  { icon: Package, label: "Freshly Packed",  sub: "Carefully packed with love" },
                  { icon: Truck,  label: "On-Time Delivery", sub: "Right to your doorstep" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{ borderColor: `${P}25`, backgroundColor: `${P}08` }}>
                      <Icon className="w-4 h-4" style={{ color: P }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold" style={{ color: E }}>{label}</p>
                      <p className="text-[11px]" style={{ color: `${E}50` }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </SectionCard>

              {/* CTA */}
              <button type="submit" disabled={placing || cartItems.length === 0}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[0.25em] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-xl"
                style={{ backgroundColor: P, boxShadow: `0 8px 28px ${P}40` }}>
                {placing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" strokeWidth={2} />
                    Place Order
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px]" style={{ color: `${E}40` }}>
                By placing your order you agree to our{" "}
                <span className="underline cursor-pointer" style={{ color: `${E}60` }}>Terms &amp; Conditions</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
