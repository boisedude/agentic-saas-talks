/**
 * Minimal zero-dependency static file server for E2E tests.
 *
 * Serves the Next.js static export (`out/`) the way the production host
 * (Hostinger/Apache via .htaccess) does, so Playwright exercises the real
 * deployed behaviour instead of the dev server (which emits dev-only console
 * errors and keeps an HMR socket open so `networkidle` never settles):
 *   - clean URLs:        /episodes        -> out/episodes.html
 *   - trailing slashes:  /episodes/       -> out/episodes.html
 *   - directory index:   /                -> out/index.html
 *   - real files:        /sitemap.xml, /_next/...  served as-is
 *   - misses:            -> out/404.html with a 404 status
 *
 * Usage: node test-server.js [port] [dir]
 *   port  defaults to $PORT or 3000
 *   dir   defaults to $SERVE_DIR or "out"
 */
const http = require("http")
const fs = require("fs")
const path = require("path")

const port = Number(process.argv[2] || process.env.PORT || 3000)
const rootDir = path.resolve(process.argv[3] || process.env.SERVE_DIR || "out")

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

function contentType(filePath) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream"
}

// Resolve a request pathname to a file on disk, honouring clean URLs and
// directory indexes. Returns null when nothing matches.
function resolveFile(pathname) {
  // Decode and strip query/hash; collapse a trailing slash (except root).
  let p = decodeURIComponent(pathname.split("?")[0].split("#")[0])
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1)

  // Guard against path traversal.
  const safe = path.normalize(p).replace(/^(\.\.[/\\])+/, "")
  const base = path.join(rootDir, safe)

  const candidates =
    p === "/" || p === ""
      ? [path.join(rootDir, "index.html")]
      : [
          base, // exact file (assets, sitemap.xml, llms.txt, ...)
          `${base}.html`, // clean URL  -> file.html
          path.join(base, "index.html"), // directory index
        ]

  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c
    } catch {
      /* keep looking */
    }
  }
  return null
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || "/")

  if (filePath) {
    res.writeHead(200, { "Content-Type": contentType(filePath) })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  // Not found -> serve the exported 404 page with a 404 status.
  const notFound = path.join(rootDir, "404.html")
  try {
    const body = fs.readFileSync(notFound)
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    res.end(body)
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
    res.end("404 Not Found")
  }
})

server.listen(port, () => {
  console.log(`test-server: serving ${rootDir} at http://localhost:${port}`)
})
