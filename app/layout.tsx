import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const pretendard = localFont({
//   src: "../public/fonts/PretendardVariable.woff2",
//   variable: "--font-pretendard",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "VINUS SPREAD",
  description: "Modern Digital Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-slate-900 font-sans antialiased text-slate-50 selection:bg-rose-500 selection:text-white",
        inter.variable
      )}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
