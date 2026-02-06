import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import PerformanceGuard from "@/components/ui/PerformanceGuard";
import SiteLayout from "@/components/SiteLayout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "600", "800"]
});

export const metadata: Metadata = {
  title: "VINUSPREAD | Digital Experience",
  description: "Redefining digital experiences through technology & design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-white overflow-x-hidden",
        outfit.variable
      )}>
        <PerformanceGuard>
          <SiteLayout>
            {children}
          </SiteLayout>
        </PerformanceGuard>
      </body>
    </html>
  );
}
