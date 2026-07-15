import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const outRoot = path.join(process.cwd(), "docs");
const refsRoot = path.join(outRoot, "design-references");
const researchRoot = path.join(outRoot, "research");

const targets = [
  {
    name: "exoape",
    url: "https://www.exoape.com/?ref=godly",
    scrolls: [0, 900, 1800, 2800, 3900, 5200],
  },
  {
    name: "vinus",
    url: "https://vinus-website.vercel.app/",
    scrolls: [0, 900, 1800, 2800, 3900],
  },
];

async function ensureDirs() {
  await fs.mkdir(refsRoot, { recursive: true });
  await fs.mkdir(researchRoot, { recursive: true });
  for (const target of targets) {
    await fs.mkdir(path.join(refsRoot, target.name), { recursive: true });
    await fs.mkdir(path.join(researchRoot, target.name), { recursive: true });
  }
}

async function extractPage(page) {
  return page.evaluate(() => {
    const styleProps = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "color",
      "backgroundColor",
      "display",
      "position",
      "overflow",
      "transform",
      "opacity",
      "width",
      "height",
      "padding",
      "margin",
    ];

    function pickStyles(el) {
      const cs = getComputedStyle(el);
      return Object.fromEntries(styleProps.map((prop) => [prop, cs[prop]]));
    }

    const candidates = [...document.querySelectorAll("header, section, footer, main > div")]
      .slice(0, 24)
      .map((el, index) => {
        const rect = el.getBoundingClientRect();
        return {
          index,
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: String(el.className || "").slice(0, 240),
          component: el.getAttribute("component"),
          text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 900),
          rect: {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          styles: pickStyles(el),
        };
      });

    const textSamples = [...document.querySelectorAll("h1,h2,h3,p,a,span")]
      .map((el) => (el.textContent || "").replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 80);

    const assets = {
      images: [...document.querySelectorAll("img")].map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        className: String(img.className || "").slice(0, 160),
      })),
      videos: [...document.querySelectorAll("video")].map((video) => ({
        src: video.currentSrc || video.src || video.querySelector("source")?.src || "",
        autoplay: video.autoplay,
        loop: video.loop,
        muted: video.muted,
        playsInline: video.playsInline,
        className: String(video.className || "").slice(0, 160),
      })),
      backgrounds: [...document.querySelectorAll("*")]
        .map((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          if (!bg || bg === "none") return null;
          return {
            tag: el.tagName.toLowerCase(),
            className: String(el.className || "").slice(0, 160),
            backgroundImage: bg.slice(0, 400),
          };
        })
        .filter(Boolean)
        .slice(0, 80),
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((link) => ({
        href: link.href,
        rel: link.rel,
        sizes: link.sizes?.toString(),
      })),
    };

    const fonts = [...new Set([...document.querySelectorAll("body, h1, h2, h3, p, a, button")]
      .map((el) => getComputedStyle(el).fontFamily))];

    const colors = [...new Set([...document.querySelectorAll("body, header, section, footer, h1, h2, p, a")]
      .flatMap((el) => {
        const cs = getComputedStyle(el);
        return [cs.color, cs.backgroundColor].filter(Boolean);
      }))].slice(0, 80);

    return {
      url: location.href,
      title: document.title,
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className,
      viewport: { width: innerWidth, height: innerHeight },
      scrollY,
      documentHeight: document.documentElement.scrollHeight,
      sections: candidates,
      textSamples,
      assets,
      fonts,
      colors,
      scripts: [...document.scripts].map((script) => script.src).filter(Boolean),
    };
  });
}

async function captureTarget(browser, target, viewport, label) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile: viewport.width < 600 });
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  const base = path.join(refsRoot, target.name);
  await page.screenshot({ path: path.join(base, `${label}-full.png`), fullPage: true });

  const states = [];
  for (const y of target.scrolls) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(700);
    const shot = `${label}-scroll-${String(y).padStart(4, "0")}.png`;
    await page.screenshot({ path: path.join(base, shot), fullPage: false });
    states.push({ y, screenshot: `docs/design-references/${target.name}/${shot}`, data: await extractPage(page) });
  }

  await fs.writeFile(
    path.join(researchRoot, target.name, `${label}-extraction.json`),
    JSON.stringify(states, null, 2),
    "utf8",
  );

  await page.close();
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch({ headless: true });
  for (const target of targets) {
    await captureTarget(browser, target, { width: 1440, height: 1100 }, "desktop");
    await captureTarget(browser, target, { width: 390, height: 844 }, "mobile");
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
