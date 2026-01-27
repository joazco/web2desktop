const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const demoDir = path.join(rootDir, "demo");
const wwwDir = path.join(rootDir, "www");

if (!fs.existsSync(demoDir)) {
  console.error(`Demo directory not found: ${demoDir}`);
  process.exit(1);
}

// Mirror demo -> www so the renderer always serves the demo assets.
fs.rmSync(wwwDir, { recursive: true, force: true });
fs.mkdirSync(wwwDir, { recursive: true });
fs.cpSync(demoDir, wwwDir, { recursive: true });

console.log("Synced demo -> www");
