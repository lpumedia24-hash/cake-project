import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CMSProvider } from "@/context/CMSContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const metadata: Metadata = {
  title: "Princess Bakery | Gourmet Bakehouse & Baking Academy",
  description: "Experience luxury in every bite and learn the art of baking from masters. Gourmet desserts and professional training institute.",
  keywords: "bakery, gourmet cakes, baking academy, online baking courses, luxury desserts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased font-sans selection:bg-primary/20 bg-background text-foreground">
        <AuthProvider>
          <CMSProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </CMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
