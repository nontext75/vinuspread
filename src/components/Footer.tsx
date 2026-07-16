"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const socialLinks = [
  { label: "instagram", href: "https://www.instagram.com/" },
  { label: "pinterest", href: "https://www.pinterest.com/" },
  { label: "behance", href: "https://www.behance.net/" },
  { label: "vinorleague", href: "#work" },
];

export function Footer() {
  const pathname = usePathname();
  const nextPage = pathname.startsWith("/work")
    ? { label: "STUDIO", href: "/studio" }
    : pathname === "/studio"
      ? { label: "STORY", href: "/news" }
      : pathname === "/news"
        ? { label: "CONTACT", href: "/contact" }
        : pathname === "/contact"
          ? { label: "VINUSPREAD", href: "/" }
          : { label: "EXPERIENCE", href: "/work" };

  return (
    <footer id="contact" className="bg-[#333333] font-sans text-white">
      <div className="px-6 pb-20 pt-20 md:px-16 lg:pb-[5.6rem] lg:pt-[6.6rem]">
        <div className="w-full">
          <p className="mb-7 text-sm font-medium uppercase lg:mb-6">
            Next page
          </p>

          <Link
            href={nextPage.href}
            aria-label={`Go to ${nextPage.label}`}
            className="group inline-flex max-w-full items-center gap-[clamp(1rem,2.2vw,2.8rem)]"
          >
            <span className="text-[clamp(3.2rem,8.8vw,9.25rem)] font-normal leading-[0.9] tracking-[-0.065em]">
              {nextPage.label}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-[clamp(2.3rem,4.8vw,5.8rem)] shrink-0 stroke-[1.15] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3 motion-reduce:transition-none"
            />
          </Link>

          <div className="mt-20 grid grid-cols-1 gap-14 lg:mt-[5.25rem] lg:grid-cols-12 lg:gap-x-8">
            <section aria-labelledby="footer-contact" className="lg:col-span-6">
              <h2 id="footer-contact" className="mb-4 text-sm font-medium uppercase">
                Contact
              </h2>
              <p className="max-w-[540px] text-base leading-[1.65] text-white/60">
                We&apos;re ready to turn ideas into meaningful experiences
                <br />
                and begin what&apos;s next together.
              </p>
              <a
                href="mailto:vinus@vinus.co.kr"
                className="group mt-8 inline-flex items-center gap-3 border-b border-current pb-1.5 text-[clamp(1.125rem,1.4vw,1.5rem)] font-normal leading-none transition-opacity duration-200 hover:opacity-55"
              >
                Contact us
                <ArrowUpRight className="size-5 stroke-[1.4] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </section>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-11">
              <section aria-labelledby="business-enquiries">
                <h2 id="business-enquiries" className="mb-3 text-sm font-normal uppercase text-white/45">
                  Business enquiries
                </h2>
                <a className="text-base hover:underline" href="mailto:vinus@vinus.co.kr">
                  vinus@vinus.co.kr
                </a>
                <p className="mt-2 whitespace-nowrap text-sm text-white/55">
                  TEL : 02-3661-1907&nbsp;&nbsp; FAX : 02-3661-1906
                </p>
              </section>

              <section aria-labelledby="open-positions">
                <h2 id="open-positions" className="mb-3 text-sm font-normal uppercase text-white/45">
                  Open positions
                </h2>
                <a className="text-base hover:underline" href="mailto:vinus@vinus.co.kr?subject=Open%20Position">
                  vinus@vinus.co.kr
                </a>
              </section>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-11">
              <section aria-labelledby="business-hours">
                <h2 id="business-hours" className="mb-3 text-sm font-normal uppercase text-white/45">
                  Business hours
                </h2>
                <p className="text-base font-medium uppercase">Monday to Friday</p>
                <p className="mt-2 text-sm text-white/55">10:00 AM – 18:00 PM GMT (+9)</p>
              </section>

              <section aria-labelledby="korea-office">
                <h2 id="korea-office" className="mb-3 text-sm font-normal uppercase text-white/45">
                  Korea
                </h2>
                <address className="text-base not-italic leading-relaxed">
                  Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802
                </address>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 px-6 md:px-16">
        <div className="grid w-full gap-7 py-7 text-sm lg:grid-cols-12 lg:items-center lg:py-6">
          <a href="#" className="group w-fit font-black leading-[0.72] tracking-[-0.08em]">
            VINUSPREAD
            <span className="mt-1 block text-[3px] font-bold tracking-[-0.02em]">SPREAD THE BEAUTIFUL THINGS</span>
          </a>

          <nav aria-label="Social media" className="flex flex-wrap gap-x-8 gap-y-3 text-white/80 lg:col-span-6 lg:justify-center lg:gap-x-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="relative lowercase after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit uppercase transition-opacity duration-200 hover:opacity-50 active:scale-[0.97] lg:col-span-3 lg:justify-self-end"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
