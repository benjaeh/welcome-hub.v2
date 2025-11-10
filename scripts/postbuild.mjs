import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const source = path.join(projectRoot, ".next", "build-manifest.json");
const targets = [
  path.join(projectRoot, ".next", "server", "pages", "_app", "build-manifest.json"),
  path.join(projectRoot, ".next", "server", "app", "build-manifest.json"),
];

if (!fs.existsSync(source)) {
  console.warn("[postbuild] build-manifest.json not found; skipping legacy copies.");
  process.exit(0);
}

const payload = fs.readFileSync(source);

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, payload);
  console.log(`[postbuild] wrote ${path.relative(projectRoot, target)}`);
}
