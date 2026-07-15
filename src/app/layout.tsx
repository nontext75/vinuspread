import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSans = localFont({
  src: [
    { path: "./fonts/google-sans-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/google-sans-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/google-sans-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/google-sans-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Exo Ape - Global Digital Design Studio",
  description:
    "Global digital design studio partnering with brands and businesses that create exceptional experiences where people live, work, and unwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable}`}>
      <body className="font-sans antialiased bg-[#ffffff] text-[#0d0d0d]">
        {children}
      </body>
    </html>
  );
}
