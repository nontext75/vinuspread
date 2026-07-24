import { chromium } from "playwright";

const reducedMotion = process.argv.includes("--reduced");
const fastSampling = process.argv.includes("--fast");
const widths = process.argv.slice(2).map(Number).filter(Boolean);
const targets = widths.length ? widths : [1440];
const browser = await chromium.launch({ headless: true });

for (const width of targets) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  const sectionOffsets = await page.locator(".home-page > section").evaluateAll((sections) =>
    sections.map((section) => ({
      className: section.className,
      top: Math.round(section.offsetTop),
      height: Math.round(section.getBoundingClientRect().height),
    })),
  );
  const layoutFailures = await page.evaluate(() => {
    const portfolio = document.querySelector(".home-portfolio");
    const canvas = document.querySelector(
      getComputedStyle(document.querySelector(".home-portfolio-canvas--desktop")).display === "none"
        ? ".home-portfolio-canvas--mobile"
        : ".home-portfolio-canvas--desktop",
    );
    if (!portfolio || !canvas) return ["portfolio canvas missing"];
    const portfolioRect = portfolio.getBoundingClientRect();
    const cards = [...canvas.querySelectorAll("[data-project-card]")].map((card) =>
      card.getBoundingClientRect(),
    );
    const failures = [];
    cards.forEach((card, index) => {
      if (card.bottom > portfolioRect.bottom + 1) {
        failures.push(`card ${index + 1} exceeds portfolio by ${Math.round(card.bottom - portfolioRect.bottom)}px`);
      }
    });
    for (let first = 0; first < cards.length; first += 1) {
      for (let second = first + 1; second < cards.length; second += 1) {
        const a = cards[first];
        const b = cards[second];
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
          failures.push(`cards ${first + 1} and ${second + 1} overlap`);
        }
      }
    }
    return failures;
  });

  const samples = [];
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let target = 0; target <= Math.min(pageHeight - 900, 9000); target += fastSampling ? 900 : 450) {
    const current = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, target - current);
    await page.waitForTimeout(700);
    samples.push(
      await page.evaluate(() => {
        const selectors = [
          "[data-motion='hero-summary']",
          "[data-motion='hero-cta']",
          ".home-portfolio-title-block",
          ".home-portfolio-cta",
          ".home-studio-lead",
          "[data-service-grid]",
        ];
        return {
          scrollY: Math.round(window.scrollY),
          elements: selectors.map((selector) => {
            const element = document.querySelector(selector);
            if (!element) return { selector, missing: true };
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              selector,
              top: Math.round(rect.top),
              bottom: Math.round(rect.bottom),
              transform: style.transform,
              position: style.position,
              opacity: style.opacity,
            };
          }),
        };
      }),
    );
  }

  await page.screenshot({
    path: `output/playwright/home-motion-${width}-y${Math.round(await page.evaluate(() => scrollY))}.png`,
    fullPage: false,
  });
  const motionFailures = samples.flatMap((sample) =>
    sample.elements
      .filter((element) =>
        !("missing" in element)
        && element.position !== "static"
        && element.position !== "relative",
      )
      .map((element) => ({
        scrollY: sample.scrollY,
        selector: element.selector,
        position: element.position,
      })),
  );
  const restingFailures = reducedMotion
    ? await page.locator(restingSelectorForQa()).evaluateAll((elements) =>
        elements.flatMap((element) => {
          const style = getComputedStyle(element);
          return style.opacity !== "1"
            || (style.transform !== "none" && style.transform !== "matrix(1, 0, 0, 1, 0, 0)")
            || (style.clipPath !== "none" && style.clipPath !== "inset(0px)")
            ? [`${element.getAttribute("data-motion") || element.className}: ${style.opacity}/${style.transform}/${style.clipPath}`]
            : [];
        }),
      )
    : [];
  console.log(JSON.stringify({
    width,
    reducedMotion,
    pageHeight,
    sectionOffsets,
    sampledScrollPositions: samples.length,
    finalScrollY: samples.at(-1)?.scrollY,
    layoutFailures,
    motionFailures,
    restingFailures,
    errors,
  }));
  await page.close();
}

await browser.close();

function restingSelectorForQa() {
  return [
    "[data-hero-reveal]",
    "[data-reveal]",
    "[data-intro-line]",
    "[data-intro-link]",
    "[data-project-card]",
    "[data-project-image]",
    "[data-reel-image]",
    "[data-service-card]",
    ".home-clients-title-block > *",
    ".home-story-list",
    "[data-service-grid]",
  ].join(", ");
}
