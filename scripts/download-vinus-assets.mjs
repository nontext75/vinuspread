import fs from "node:fs/promises";
import path from "node:path";

const assets = [
  ["public/cloned/brands_vertical.png", "https://vinus-website.vercel.app/brands_vertical.png"],
  ["public/cloned/about_vertical.png", "https://vinus-website.vercel.app/about_vertical.png"],
  ["public/cloned/about_img.png", "https://vinus-website.vercel.app/about_img.png"],
  ["public/cloned/project-abstract-glass.png", "https://vinus-website.vercel.app/images/projects/abstract_glass.png"],
  ["public/cloned/project-nextgen-ui.png", "https://vinus-website.vercel.app/images/projects/nextgen_ui_premium.png"],
  ["public/cloned/project-creative-agency.png", "https://vinus-website.vercel.app/images/projects/creative_agency_id.png"],
  ["public/cloned/project-tech-interface.png", "https://vinus-website.vercel.app/images/projects/tech_interface.png"],
  ["public/cloned/project-branding-luxury.png", "https://vinus-website.vercel.app/images/projects/branding_luxury.png"],
  ["public/cloned/project-futuristic-product.png", "https://vinus-website.vercel.app/images/projects/futuristic_product.png"],
];

async function download(file, url) {
  const target = path.join(process.cwd(), file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(target, bytes);
  return { file, url, bytes: bytes.length };
}

const results = [];
for (const asset of assets) {
  results.push(await download(asset[0], asset[1]));
}

await fs.writeFile(
  path.join(process.cwd(), "docs/research/vinus/downloaded-assets.json"),
  JSON.stringify(results, null, 2),
  "utf8",
);

console.log(JSON.stringify(results, null, 2));
