"use client";

import { ArrowRight } from "lucide-react";

const socialLinks = [
  { label: "instagram", href: "https://www.instagram.com/" },
  { label: "pinterest", href: "https://www.pinterest.com/" },
  { label: "behance", href: "https://www.behance.net/" },
  { label: "vinorleague", href: "#work" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-white font-sans text-[#252525]">
      <div className="px-6 pb-20 pt-20 md:px-16 lg:pb-[5.6rem] lg:pt-[6.6rem]">
        <div className="w-full">
          <p className="mb-7 text-[12px] font-medium uppercase tracking-[-0.02em] lg:mb-6 lg:text-[14px]">
            Next page
          </p>

          <a
            href="#work"
            aria-label="View VINUSPREAD work"
            className="group inline-flex max-w-full items-center gap-[clamp(1rem,2.2vw,2.8rem)]"
          >
            <span className="text-[clamp(3.2rem,8.8vw,9.25rem)] font-normal leading-[0.9] tracking-[-0.065em]">
              VINUSPREAD
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-[clamp(2.3rem,4.8vw,5.8rem)] shrink-0 stroke-[1.15] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3 motion-reduce:transition-none"
            />
          </a>

          <div className="mt-20 grid grid-cols-1 gap-14 lg:mt-[5.25rem] lg:grid-cols-12 lg:gap-x-8">
            <section aria-labelledby="footer-contact" className="lg:col-span-6">
              <h2 id="footer-contact" className="mb-4 text-[13px] font-medium uppercase">
                Contact
              </h2>
              <p className="max-w-[540px] text-[14px] leading-[1.65] text-[#767676] lg:text-[15px]">
                We&apos;re ready to turn ideas into meaningful experiences
                <br />
                and begin what&apos;s next together.
              </p>
              <a
                href="mailto:vinus@vinus.co.kr"
                className="mt-8 inline-flex min-h-10 items-center justify-center rounded-full border border-[#dedede] px-6 text-[11px] font-semibold uppercase transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#252525] hover:text-white active:scale-[0.97] motion-reduce:transition-none"
              >
                Contact us
              </a>
            </section>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-11">
              <section aria-labelledby="business-enquiries">
                <h2 id="business-enquiries" className="mb-3 text-[12px] font-normal uppercase text-[#b1b1b1]">
                  Business enquiries
                </h2>
                <a className="text-[14px] hover:underline lg:text-[15px]" href="mailto:vinus@vinus.co.kr">
                  vinus@vinus.co.kr
                </a>
                <p className="mt-2 whitespace-nowrap text-[13px] text-[#888] lg:text-[14px]">
                  TEL : 02-3661-1907&nbsp;&nbsp; FAX : 02-3661-1906
                </p>
              </section>

              <section aria-labelledby="open-positions">
                <h2 id="open-positions" className="mb-3 text-[12px] font-normal uppercase text-[#b1b1b1]">
                  Open positions
                </h2>
                <a className="text-[14px] hover:underline lg:text-[15px]" href="mailto:vinus@vinus.co.kr?subject=Open%20Position">
                  vinus@vinus.co.kr
                </a>
              </section>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-11">
              <section aria-labelledby="business-hours">
                <h2 id="business-hours" className="mb-3 text-[12px] font-normal uppercase text-[#b1b1b1]">
                  Business hours
                </h2>
                <p className="text-[14px] font-medium uppercase lg:text-[15px]">Monday to Friday</p>
                <p className="mt-2 text-[13px] text-[#888] lg:text-[14px]">10:00 AM – 18:00 PM GMT (+9)</p>
              </section>

              <section aria-labelledby="korea-office">
                <h2 id="korea-office" className="mb-3 text-[12px] font-normal uppercase text-[#b1b1b1]">
                  Korea
                </h2>
                <address className="text-[14px] not-italic leading-relaxed lg:text-[15px]">
                  Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802
                </address>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e9e9e9] px-6 md:px-16">
        <div className="grid w-full gap-7 py-7 text-[12px] lg:grid-cols-12 lg:items-center lg:py-6 lg:text-[14px]">
          <a href="#" className="group w-fit font-black leading-[0.72] tracking-[-0.08em]">
            VINUSPREAD
            <span className="mt-1 block text-[3px] font-bold tracking-[-0.02em]">SPREAD THE BEAUTIFUL THINGS</span>
          </a>

          <nav aria-label="Social media" className="flex flex-wrap gap-x-8 gap-y-3 text-[#343434] lg:col-span-6 lg:justify-center lg:gap-x-10">
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
