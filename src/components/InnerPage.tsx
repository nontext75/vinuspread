"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

type InnerPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ title: string; detail: string; href?: string }>;
};

const navigation = [
  ["Work", "/work"],
  ["Studio", "/studio"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

export function InnerPage({ eyebrow, title, description, items }: InnerPageProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-white text-[#0d0d0d]">
      <header className="flex h-24 items-center justify-between px-6 md:px-16">
        <Link href="/" className="text-xl font-semibold tracking-tight">vinuspread</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`border-b pb-1 transition-opacity hover:opacity-50 ${pathname === href ? "border-current" : "border-transparent"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="size-4" /> Home
        </Link>
      </header>

      <section className="px-6 pb-24 pt-[18vh] md:px-16 md:pb-36 md:pt-[22vh]">
        <p className="text-sm uppercase text-[#0d0d0d]/45">{eyebrow}</p>
        <h1 className="mt-7 max-w-[1500px] text-[clamp(4.5rem,12vw,12rem)] font-normal leading-[0.82] tracking-[-0.065em]">{title}</h1>
        <p className="mt-16 max-w-[820px] text-[clamp(1.25rem,2vw,2rem)] leading-[1.35] text-[#0d0d0d]/70">{description}</p>
      </section>

      <section className="border-t border-[#0d0d0d]/12 px-6 pb-28 md:px-16 md:pb-40">
        {items.map((item) => {
          const content = (
            <>
              <h2 className="text-[clamp(1.5rem,2.8vw,3rem)] font-normal leading-[1.1]">{item.title}</h2>
              <p className="max-w-[620px] text-base leading-[1.55] text-[#0d0d0d]/55 md:text-lg">{item.detail}</p>
              {item.href && <ArrowUpRight className="size-6 stroke-[1.2]" />}
            </>
          );

          return item.href ? (
            <a key={item.title} href={item.href} className="grid gap-5 border-b border-[#0d0d0d]/12 py-9 md:grid-cols-[1fr_1fr_auto] md:items-center md:py-12">{content}</a>
          ) : (
            <div key={item.title} className="grid gap-5 border-b border-[#0d0d0d]/12 py-9 md:grid-cols-2 md:items-center md:py-12">{content}</div>
          );
        })}
      </section>
    </main>
  );
}
