import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const roots = ["src/app", "src/components"];
const extensions = new Set([".ts", ".tsx", ".css"]);

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (extensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

const files = (await Promise.all(roots.map(filesUnder))).flat();
const report = {
  files: files.length,
  colors: new Map(),
  arbitraryPixels: [],
  oddPixels: [],
  inlineStyles: [],
  directFontFamilies: [],
  usedTypeStyles: new Set(),
  definedTypeStyles: new Set(),
};

for (const file of files) {
  const source = await readFile(file, "utf8");
  const name = relative(process.cwd(), file).replaceAll("\\", "/");

  for (const match of source.matchAll(/#[0-9a-f]{6}/gi)) {
    const color = match[0].toLowerCase();
    report.colors.set(color, (report.colors.get(color) ?? 0) + 1);
  }

  for (const match of source.matchAll(/\[(\d+)px\]/g)) {
    const value = Number(match[1]);
    const item = { file: name, value, token: match[0] };
    report.arbitraryPixels.push(item);
    if (value % 2 !== 0) report.oddPixels.push(item);
  }

  if (/style=\{\{/.test(source)) report.inlineStyles.push(name);
  if (/fontFamily\s*:|font-family\s*:/.test(source) && !name.endsWith("globals.css")) {
    report.directFontFamilies.push(name);
  }

  for (const match of source.matchAll(/\btype-[a-z0-9-]+(?:--[a-z0-9-]+)?/gi)) {
    report.usedTypeStyles.add(match[0]);
  }
  if (name.endsWith("globals.css")) {
    for (const match of source.matchAll(/\.((?:type-)[a-z0-9-]+(?:--[a-z0-9-]+)?)/gi)) {
      report.definedTypeStyles.add(match[1]);
    }
  }
}

const undefinedTypeStyles = [...report.usedTypeStyles].filter((name) => !report.definedTypeStyles.has(name)).sort();
const unusedTypeStyles = [...report.definedTypeStyles].filter((name) => !report.usedTypeStyles.has(name)).sort();

console.log(JSON.stringify({
  ...report,
  colors: Object.fromEntries([...report.colors.entries()].sort()),
  usedTypeStyles: [...report.usedTypeStyles].sort(),
  definedTypeStyles: [...report.definedTypeStyles].sort(),
  undefinedTypeStyles,
  unusedTypeStyles,
}, null, 2));
