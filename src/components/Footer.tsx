"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const socialLinks = [
  { label: "instagram", href: "https://www.instagram.com/" },
  { label: "pinterest", href: "https://www.pinterest.com/" },
  { label: "behance", href: "https://www.behance.net/" },
  { label: "vinorleague", href: "#work" },
];

function ContactBlock() {
  return (
    <section className="site-footer-contact">
      <h2>Contact</h2>
      <p className="site-footer-contact-copy">
        Ready to shape your next project?
        <br />
        We&apos;re here from first idea to final detail.
      </p>
      <a href="mailto:vinus@vinus.co.kr" className="site-footer-contact-link">
        Contact us
        <Image src="/vinus/icons/footer-arrow-ne.svg" alt="" width={24} height={24} aria-hidden="true" />
      </a>
    </section>
  );
}

function BusinessEnquiries() {
  return (
    <section className="site-footer-info site-footer-info--business">
      <h2>Business enquiries</h2>
      <a href="mailto:vinus@vinus.co.kr">vinus@vinus.co.kr</a>
      <p>{"TEL : 02-3661-1907\u00A0\u00A0\u00A0FAX : 02-3661-1906"}</p>
    </section>
  );
}

function OpenPositions() {
  return (
    <section className="site-footer-info site-footer-info--positions">
      <h2>Open positions</h2>
      <a href="mailto:vinus@vinus.co.kr?subject=Open%20Position">vinus@vinus.co.kr</a>
    </section>
  );
}

function BusinessHours() {
  return (
    <section className="site-footer-info site-footer-info--hours">
      <h2>Business hours</h2>
      <p>Monday to Friday</p>
      <p>10:00 AM - 18:00 PM GMT (+9)</p>
    </section>
  );
}

function KoreaOffice() {
  return (
    <section className="site-footer-info site-footer-info--korea">
      <h2>Korea</h2>
      <address>Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802</address>
    </section>
  );
}

function FooterUtility({ onBackToTop }: { onBackToTop: () => void }) {
  return (
    <div className="site-footer-utility">
      <Link href="/" aria-label="Vinuspread home" className="site-footer-logo">
        <Image src="/vinus/logo-white.svg" alt="Vinuspread" width={100} height={24} unoptimized />
      </Link>
      <nav aria-label="Social media" className="site-footer-socials">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button type="button" onClick={onBackToTop} className="site-footer-back-to-top">
        Back to top
      </button>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  const nextPage = pathname === "/work" || pathname.startsWith("/work/")
    ? { label: "Studio", href: "/studio" }
    : pathname === "/studio"
      ? { label: "Story", href: "/news" }
      : pathname.startsWith("/news")
        ? { label: "Contact", href: "/contact" }
        : { label: "Experience", href: "/work" };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer id="contact" data-header-theme="dark" className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-next">
          <p className="site-footer-next-label">Next page</p>
          <Link href={nextPage.href} aria-label={`Go to ${nextPage.label}`} className="site-footer-next-link">
            <span>{nextPage.label}</span>
            <span className="site-footer-next-icon" aria-hidden="true">
              <Image src="/vinus/icons/footer-arrow-right.svg" alt="" fill sizes="64px" />
            </span>
          </Link>
        </div>

        <div className="site-footer-spacer" />

        <div className="site-footer-info-grid">
          <ContactBlock />
          <div className="site-footer-info-group">
            <div className="site-footer-info-column">
              <BusinessEnquiries />
              <OpenPositions />
            </div>
            <div className="site-footer-info-column site-footer-info-column--second">
              <BusinessHours />
              <KoreaOffice />
            </div>
          </div>
        </div>
      </div>

      <FooterUtility onBackToTop={scrollToTop} />

      <style>{`
        .site-footer {
          width: 100%;
          height: 876.9565px;
          min-height: 0;
          overflow: hidden;
          background: #3a3a3d;
          color: #fff;
        }

        .site-footer-main {
          display: flex;
          width: 100%;
          height: 779.9565px;
          flex-direction: column;
          align-items: flex-start;
          padding: 64px 20px;
        }

        .site-footer-next {
          display: flex;
          width: 350px;
          height: 67.9565px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .site-footer-next-label,
        .site-footer-contact h2,
        .site-footer-info h2,
        .site-footer-socials,
        .site-footer-back-to-top {
          font-weight: 500;
        }

        .site-footer-next-label {
          height: 17px;
          font-size: 12px;
          line-height: 1.4;
        }

        .site-footer-next-link {
          display: flex;
          height: 38.9565px;
          align-items: center;
          gap: 12px;
          overflow: hidden;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.1;
          white-space: nowrap;
        }

        .site-footer-next-icon {
          position: relative;
          display: block;
          width: 38.9565px;
          height: 38.9565px;
          flex: none;
          padding: 7.304px;
        }

        .site-footer-next-icon img {
          inset: 7.304px !important;
          width: 24.348px !important;
          height: 24.348px !important;
        }

        .site-footer-spacer {
          width: 1px;
          height: 72px;
          flex: none;
        }

        .site-footer-info-grid {
          display: flex;
          width: 350px;
          height: 512px;
          flex-direction: column;
          gap: 48px;
        }

        .site-footer-contact {
          display: flex;
          width: 350px;
          height: 125px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .site-footer-contact h2,
        .site-footer-info h2 {
          color: rgb(255 255 255 / 0.55);
          font-size: 12px;
          line-height: 1.4;
        }

        .site-footer-contact h2 {
          color: #fff;
        }

        .site-footer-contact-copy {
          color: rgb(255 255 255 / 0.55);
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
        }

        .site-footer-contact-link {
          display: flex;
          height: 42px;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #fff;
          padding: 8px 0;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.3;
        }

        .site-footer-contact-link img {
          width: 24px;
          height: 24px;
        }

        .site-footer-info-group {
          display: flex;
          width: 350px;
          height: 339px;
          flex-direction: column;
          gap: 24px;
        }

        .site-footer-info-column {
          display: flex;
          width: 350px;
          height: 149px;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
        }

        .site-footer-info-column--second {
          height: 166px;
          gap: 24px;
        }

        .site-footer-info {
          display: flex;
          width: 350px;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
        }

        .site-footer-info p,
        .site-footer-info a,
        .site-footer-info address {
          font-style: normal;
          white-space: normal;
        }

        .site-footer-info--business,
        .site-footer-info--hours {
          height: 75px;
        }

        .site-footer-info--positions {
          height: 46px;
        }

        .site-footer-info--korea {
          height: 67px;
        }

        .site-footer-utility {
          display: flex;
          width: 100%;
          height: 97px;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 16px;
          border-width: 0;
          box-shadow: inset 0 1px rgb(255 255 255 / 0.1);
          background: #2c2c2d;
          padding: 20px;
        }

        .site-footer-logo,
        .site-footer-logo img {
          display: block;
          width: 100px;
          height: 24px;
        }

        .site-footer-socials {
          display: flex;
          width: 295px;
          height: 17px;
          align-items: flex-start;
          gap: 24px;
          color: rgb(255 255 255 / 0.72);
          font-size: 12px;
          line-height: 1.4;
          white-space: nowrap;
        }

        .site-footer-back-to-top {
          display: none;
        }

        @media (min-width: 768px) {
          .site-footer {
            height: 761px;
          }

          .site-footer-main {
            height: 689px;
            gap: 72px;
            overflow: hidden;
            padding: 88px 40px 72px;
          }

          .site-footer-next {
            width: 944px;
            height: 113px;
            gap: 32px;
          }

          .site-footer-next-link {
            height: 64px;
            gap: 12px;
            font-size: 64px;
            line-height: 1;
          }

          .site-footer-next-icon {
            width: 64px;
            height: 64px;
            padding: 12px;
          }

          .site-footer-next-icon img {
            inset: 12px !important;
            width: 40px !important;
            height: 40px !important;
          }

          .site-footer-spacer {
            display: none;
          }

          .site-footer-info-grid {
            display: grid;
            width: 944px;
            height: 344px;
            grid-template-columns: 456px 456px;
            gap: 32px;
          }

          .site-footer-contact {
            width: 456px;
            height: 134px;
          }

          .site-footer-contact h2,
          .site-footer-info h2 {
            font-size: 14px;
          }

          .site-footer-contact-copy,
          .site-footer-info {
            font-size: 16px;
          }

          .site-footer-info-group {
            width: 456px;
            height: 344px;
            gap: 24px;
          }

          .site-footer-info-column,
          .site-footer-info-column--second {
            width: 456px;
            height: auto;
            gap: 24px;
          }

          .site-footer-info--business,
          .site-footer-info--hours {
            height: 84px;
          }

          .site-footer-info--positions,
          .site-footer-info--korea {
            height: 52px;
          }

          .site-footer-info--business {
            width: 295px;
          }

          .site-footer-info--positions {
            width: 130px;
          }

          .site-footer-info--hours {
            width: 226px;
          }

          .site-footer-info--korea {
            width: 438px;
          }

          .site-footer-utility {
            height: 72px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 0;
            padding: 24px 40px;
          }

          .site-footer-socials {
            width: 295px;
          }

          .site-footer-back-to-top {
            display: block;
            width: auto;
            color: rgb(255 255 255 / 0.72);
            font-size: 12px;
            line-height: 1.4;
            text-align: right;
          }
        }

        @media (min-width: 1440px) {
          .site-footer {
            height: 684px;
          }

          .site-footer-main {
            height: 612px;
            gap: 0;
            overflow: visible;
            padding: 96px 64px;
          }

          .site-footer-next {
            width: auto;
            height: 166px;
            gap: 24px;
          }

          .site-footer-next-label {
            height: 22px;
            font-size: 16px;
          }

          .site-footer-next-link {
            height: 120px;
            gap: 24px;
            font-size: 120px;
            font-weight: 400;
          }

          .site-footer-spacer {
            display: block;
            height: 90px;
          }

          .site-footer-info-grid {
            display: grid;
            width: 100%;
            height: 164px;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 32px;
          }

          .site-footer-contact {
            width: 100%;
            height: 141px;
          }

          .site-footer-contact h2,
          .site-footer-info h2 {
            font-size: 16px;
          }

          .site-footer-info-group {
            display: grid;
            width: 100%;
            height: 164px;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 32px;
          }

          .site-footer-info-column,
          .site-footer-info-column--second {
            width: 100%;
            height: 164px;
            gap: 24px;
          }

          .site-footer-info--business,
          .site-footer-info--hours {
            width: 100%;
            height: 86px;
          }

          .site-footer-info--positions,
          .site-footer-info--korea {
            width: 100%;
            height: 54px;
          }

          .site-footer-utility {
            padding: 24px 64px;
          }

          .site-footer-socials {
            width: 332px;
            height: 20px;
            font-size: 14px;
          }

          .site-footer-back-to-top {
            height: 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
