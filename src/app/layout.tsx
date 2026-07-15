import type { Metadata } from "next";
import { Elms_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const elmsSans = Elms_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  fallback: [
    "Pretendard",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "Arial",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "디자인스튜디오 바이너스프레드",
  description:
    "웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${elmsSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
