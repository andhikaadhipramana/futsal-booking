import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { venue } from "@/data/venue";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(venue.websiteUrl),
  title: "Beyond Futsal",
  description: "Lihat lapangan futsal indoor Beyond di Ploso, Jombang, dan tanyakan ketersediaan melalui WhatsApp resmi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-950">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
