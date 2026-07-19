import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000";
const outputDir = "output/playwright";
const viewports = [
  { name: "desktop", width: 2560, height: 1440 },
  { name: "mobile", width: 390, height: 844 },
];
const routes = [
  { name: "home", path: "/" },
  { name: "experience", path: "/work" },
  { name: "studio", path: "/studio" },
  { name: "story", path: "/news" },
  { name: "contact", path: "/contact" },
  { name: "project-detail", path: "/work/budongsan114-mediate-bizsolution" },
  { name: "story-detail", path: "/news/brand-colors-by-instinct" },
];
const routeFilter = process.env.QA_ROUTE_FILTER?.split(",").map((value) => value.trim()).filter(Boolean);
const activeRoutes = routeFilter?.length ? routes.filter((route) => routeFilter.includes(route.name)) : routes;
const summaryOnly = process.env.QA_SUMMARY_ONLY === "1";

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
 for (const route of activeRoutes) {
  const page = await browser.newPage({ viewport });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const distance = Math.max(320, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += distance) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 250));
  });

  const metrics = await page.evaluate(() => {
    const selectors = [
      ".home-hero",
      ".home-intro",
      ".home-portfolio",
      ".home-reel",
      ".home-studio",
      ".home-clients",
      ".home-story",
      "footer",
    ];

    const textNodes = Array.from(document.querySelectorAll("h1, h2, h3, p, a, button, label, span"));
    const unexpectedFonts = textNodes
      .map((element) => ({
        text: element.textContent?.trim().slice(0, 48) ?? "",
        font: getComputedStyle(element).fontFamily,
      }))
      .filter(({ text, font }) => text && !/Instrument\s*Sans|Noto\s*Sans\s*KR/i.test(font))
      .slice(0, 20);
    const brokenImages = Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);
    const overflowingElements = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -2 || rect.right > window.innerWidth + 2);
      })
      .slice(0, 20)
      .map((element) => ({
        tag: element.tagName,
        className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
      }));

    return {
      document: {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      },
      sections: selectors.map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return { selector, missing: true };
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          selector,
          top: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          opacity: style.opacity,
          visibility: style.visibility,
        };
      }),
      hiddenMotionNodes: Array.from(
        document.querySelectorAll("[data-reveal], [data-project-media], [data-service-card]"),
      ).filter((element) => {
        const style = getComputedStyle(element);
        return Number(style.opacity) < 0.95 || style.visibility === "hidden";
      }).length,
      unexpectedFonts,
      brokenImages,
      overflowingElements,
      mainChildren: Array.from(document.querySelector("main")?.children ?? []).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          className: typeof element.className === "string" ? element.className.slice(0, 140) : "",
          top: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      }),
      articleChildren: Array.from(document.querySelector("main > article")?.children ?? []).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          className: typeof element.className === "string" ? element.className.slice(0, 140) : "",
          top: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      }),
    };
  });

  await page.screenshot({ path: `${outputDir}/final-${route.name}-${viewport.name}.png`, fullPage: true });
  console.log(JSON.stringify(summaryOnly
    ? {
        route: route.name,
        viewport: viewport.name,
        height: metrics.document.height,
        horizontalOverflow: metrics.document.horizontalOverflow,
        pageErrors,
        unexpectedFonts: metrics.unexpectedFonts.length,
        brokenImages: metrics.brokenImages.length,
        hiddenMotionNodes: metrics.hiddenMotionNodes,
        mainChildren: metrics.mainChildren.map(({ top, height, className }) => ({ top, height, className })),
        articleChildren: metrics.articleChildren.map(({ top, height, className }) => ({ top, height, className })),
      }
    : { route, viewport, pageErrors, metrics }));
  await page.close();
 }
}

await browser.close();
