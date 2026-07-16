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
  ["public/vinus/work/mongdang.png", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1777780514543-yh410wjkzd.png"],
  ["public/vinus/work/shinhan-easy.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778476355571-q5kqeg1vjvf.jpg"],
  ["public/vinus/work/crowd-oh.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778670261704-d2ijh3jedc9.jpg"],
  ["public/vinus/work/macadamia.png", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1777848603665-lwo9rdizuxe.png"],
  ["public/vinus/work/budongsan114.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778488569231-fzmtsr8usi.jpg"],
  ["public/vinus/work/donga-on-book.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778467520882-wqmf8uo8lj.jpg"],
  ["public/vinus/work/aliot-brand-identity.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778722075765-c50p8rfb1qg.jpg"],
  ["public/vinus/work/the-frame-artstore.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1778838092959-ka95kva8ga.jpg"],
  ["public/vinus/insights/brand-color.jpg", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1779328079928-afddow1zl0m.jpg"],
  ["public/vinus/insights/design-principles.png", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1779449161734-35auboas8js.png"],
  ["public/vinus/insights/ux-writing.png", "https://ocqmywfopzlchafcijsn.supabase.co/storage/v1/object/public/media/1779346245463-05bj19obfzsk.png"],
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
