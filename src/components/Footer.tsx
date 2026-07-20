"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

const socialLinks = [
  { label: "instagram", href: "https://www.instagram.com/" },
  { label: "pinterest", href: "https://www.pinterest.com/" },
  { label: "behance", href: "https://www.behance.net/" },
  { label: "vinorleague", href: "#work" },
];

function FooterUtility({ onBackToTop }: { onBackToTop: () => void }) {
  const pathname = usePathname();
  const isKorean = pathname === "/ko" || pathname.startsWith("/ko/");
  const homeHref = isKorean ? "/ko" : "/";

  return (
    <div className="h-40 border-t border-white/15 px-5 md:h-[72px] md:px-16">
      <div className="flex h-full flex-col items-start gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-0 md:py-6">
        <Link href={homeHref} aria-label="Vinuspread home" className="block h-6 w-[100px] shrink-0 overflow-hidden">
          <BrandLogo tone="light" wordmarkOnly />
        </Link>
        <nav aria-label="Social media" className="type-body flex h-6 w-full items-center justify-between text-white/70 md:w-[1200px] md:justify-center md:gap-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="border-b-2 border-white/70 lowercase transition-opacity duration-200 hover:opacity-55"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" onClick={onBackToTop} className="type-body h-6 w-[100px] shrink-0 text-left transition-opacity duration-200 hover:opacity-55 md:text-center">
          맨 위로
        </button>
      </div>
    </div>
  );
}

function ContactBlock({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={mobile ? "flex h-[198px] w-full flex-col items-start" : "flex h-[198px] w-full flex-col items-start"}>
      <h2 className="type-body font-medium">Contact</h2>
      <div className={mobile ? "h-[70px] w-full pt-2" : "h-[70px] w-[540px] pt-3"}>
        <p className={mobile ? "type-label text-white/55" : "type-body text-white/55"}>
          다음 프로젝트를 함께 준비하고 있습니다.
          <br />
          첫 아이디어부터 마지막 디테일까지 함께하겠습니다.
        </p>
      </div>
      <div className="relative h-[106px] w-full">
        <a href="mailto:vinus@vinus.co.kr" className="type-footer-cta group absolute left-0 top-8 inline-flex h-10 w-[152px] items-center gap-3 border-b border-white pb-[7px]">
          Contact us
          <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 stroke-[1.3] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  );
}

function Enquiries() {
  return (
    <section className="flex flex-col gap-2 md:gap-3">
      <h2 className="type-body font-normal text-white/55">Business enquiries</h2>
      <a href="mailto:vinus@vinus.co.kr" className="type-body hover:underline">vinus@vinus.co.kr</a>
      <p className="type-body whitespace-nowrap text-white/55">TEL : 02-3661-1907&nbsp;&nbsp; FAX : 02-3661-1906</p>
    </section>
  );
}

function OpenPositions() {
  return (
    <section className="flex flex-col gap-2 md:gap-3">
      <h2 className="type-body font-normal text-white/55">Open positions</h2>
      <a href="mailto:vinus@vinus.co.kr?subject=Open%20Position" className="type-body hover:underline">vinus@vinus.co.kr</a>
    </section>
  );
}

function BusinessHours() {
  return (
    <section className="flex flex-col gap-2 md:gap-3">
      <h2 className="type-body font-normal text-white/55">Business hours</h2>
      <p className="type-body font-medium">Monday to Friday</p>
      <p className="type-body text-white/55">10:00 AM – 18:00 PM GMT (+9)</p>
    </section>
  );
}

function KoreaOffice({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className="flex flex-col gap-2 md:gap-3">
      <h2 className="type-body font-normal text-white/55">Korea</h2>
      <address className={`${mobile ? "type-label" : "type-body"} max-w-[620px] whitespace-normal not-italic`}>
        서울시 강서구 공항대로 227, 1202호
      </address>
    </section>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isKorean = pathname === "/ko" || pathname.startsWith("/ko/");
  const normalizePathname = isKorean ? pathname.replace(/^\/ko(?=\/|$)/, "") || "/" : pathname;
  const localizeHref = (href: string) => (isKorean ? `/ko${href}` : href);
  const nextPage = normalizePathname === "/work"
    ? { label: "STUDIO", href: "/studio" }
    : normalizePathname.startsWith("/work/")
      ? { label: "STUDIO", href: "/studio" }
      : normalizePathname === "/studio"
        ? { label: "STORY", href: "/news" }
        : normalizePathname.startsWith("/news")
          ? { label: "CONTACT", href: "/contact" }
          : { label: "EXPERIENCE", href: "/work" };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer id="contact" data-header-theme="dark" className="h-[1060px] overflow-hidden bg-vinus-charcoal font-sans text-white md:h-[732px]">
      <div className="h-[900px] px-5 pt-16 md:hidden">
        <div className="h-[760px] w-full">
          <div className="flex flex-col gap-6">
            <p className="type-body font-medium">Next page</p>
            <Link href={localizeHref(nextPage.href)} aria-label={`Go to ${nextPage.label}`} className="group inline-flex h-12 items-center gap-5 self-start">
              <span className="type-footer-next font-normal">{nextPage.label}</span>
              <ArrowRight aria-hidden="true" className="size-10 shrink-0 stroke-[1.15] transition-transform duration-200 group-hover:translate-x-2" />
            </Link>
          </div>
          <div className="mt-20 h-[620px]">
            <ContactBlock mobile />
            <div className="mt-[18px] flex h-[188px] flex-col gap-8">
              <Enquiries />
              <OpenPositions />
            </div>
            <div className="mt-7 flex h-[188px] flex-col gap-8">
              <BusinessHours />
              <KoreaOffice mobile />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-[660px] items-center px-16 md:flex">
        <div className="h-[464px] w-full">
          <div className="h-12 pb-6">
            <p className="type-body font-medium">Next page</p>
          </div>
          <div className="h-[134px]">
            <Link href={localizeHref(nextPage.href)} aria-label={`Go to ${nextPage.label}`} className="group inline-flex items-center gap-12">
              <span className="type-footer-next font-normal">{nextPage.label}</span>
              <ArrowRight aria-hidden="true" className="size-[92px] shrink-0 stroke-[1.15] transition-transform duration-200 group-hover:translate-x-3" />
            </Link>
          </div>
          <div className="flex h-[282px] items-end">
            <div className="grid h-[198px] w-full grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,0.75fr)] gap-8">
              <ContactBlock />
              <div className="flex h-[198px] flex-col justify-between">
                <Enquiries />
                <OpenPositions />
              </div>
              <div className="flex h-[198px] flex-col justify-between">
                <BusinessHours />
                <KoreaOffice />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterUtility onBackToTop={scrollToTop} />
    </footer>
  );
}
