import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

const instrumentSans = localFont({
  src: [
    { path: "./fonts/instrument-sans-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/instrument-sans-semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/instrument-sans-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansKr = localFont({
  src: "./fonts/NotoSansKR-VF.ttf",
  variable: "--font-noto-sans-kr",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "vinuspread - Global Digital Design Studio",
  description:
    "Global digital design studio partnering with brands and businesses that create exceptional experiences where people live, work, and unwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${notoSansKr.variable}`}>
      <body className={`${instrumentSans.className} antialiased bg-vinus-white text-vinus-ink`}>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}
