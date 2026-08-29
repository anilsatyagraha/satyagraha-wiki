import fs from "node:fs"
import path from "node:path"

const publicRoot = path.resolve("public")
const checkOnly = process.argv.includes("--check")
const keywords = [
  "Code of Civil Procedure 1908",
  "Civil Procedure Code India",
  "CPC Orders and Rules",
  "Indian civil litigation",
  "Indian legal research",
  "Satyagraha Law Group",
]
const markerPattern = /<!-- satyagraha-seo:start -->[\s\S]*?<!-- satyagraha-seo:end -->\r?\n?/g

function htmlFiles(root) {
  const files = []
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(target)
      else if (entry.name.endsWith(".html")) files.push(target)
    }
  }
  walk(root)
  return files.sort()
}

function attribute(html, pattern) {
  return html.match(pattern)?.[1] ?? ""
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function metadataFor(html) {
  const title = attribute(html, /<title>([\s\S]*?)<\/title>/i)
    .replace(/<[^>]+>/g, "")
    .trim()
  const canonicalUrl =
    attribute(html, /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/i) ||
    attribute(html, /<meta\b[^>]*property="og:url"[^>]*content="([^"]+)"[^>]*>/i)
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title || "Satyagraha Law Group Legal Wiki",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
    keywords,
    publisher: {
      "@type": "Organization",
      name: "Satyagraha Law Group",
      url: "https://www.satyagraha.com",
    },
  }
  const safeSchema = JSON.stringify(schema).replaceAll("<", "\\u003c")
  return `<!-- satyagraha-seo:start -->
<meta name="keywords" content="${escapeAttribute(keywords.join(", "))}">
<meta name="author" content="Satyagraha Law Group">
<script type="application/ld+json" data-satyagraha-seo="structured-data">${safeSchema}</script>
<!-- satyagraha-seo:end -->`
}

function tailAfterHead(html) {
  const end = html.toLowerCase().indexOf("</head>")
  if (end < 0) throw new Error("HTML file has no closing head element")
  return html.slice(end + "</head>".length)
}

function validate(file, html) {
  const relative = path.relative(publicRoot, file)
  const expectedKeywords = keywords.join(", ")
  const keywordTags = html.match(/<meta\b[^>]*name="keywords"[^>]*>/gi) ?? []
  const authorTags = html.match(/<meta\b[^>]*name="author"[^>]*>/gi) ?? []
  const schemas =
    html.match(/<script\b[^>]*data-satyagraha-seo="structured-data"[^>]*>[\s\S]*?<\/script>/gi) ??
    []
  const starts = html.match(/<!-- satyagraha-seo:start -->/g) ?? []
  const ends = html.match(/<!-- satyagraha-seo:end -->/g) ?? []
  if (keywordTags.length !== 1 || !keywordTags[0].includes(`content="${expectedKeywords}"`))
    throw new Error(`Invalid SEO keywords in ${relative}`)
  if (authorTags.length !== 1 || !authorTags[0].includes('content="Satyagraha Law Group"'))
    throw new Error(`Invalid SEO author in ${relative}`)
  if (schemas.length !== 1) throw new Error(`Invalid SEO structured data count in ${relative}`)
  const data = JSON.parse(schemas[0].replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, ""))
  if (JSON.stringify(data.keywords) !== JSON.stringify(keywords))
    throw new Error(`Structured-data keywords differ in ${relative}`)
  if (data.publisher?.name !== "Satyagraha Law Group")
    throw new Error(`Structured-data publisher differs in ${relative}`)
  if (
    starts.length !== 1 ||
    ends.length !== 1 ||
    html.indexOf(starts[0]) > html.toLowerCase().indexOf("</head>")
  )
    throw new Error(`SEO metadata is not confined to the head in ${relative}`)
}

if (!fs.existsSync(publicRoot))
  throw new Error(`Generated public directory not found: ${publicRoot}`)

const files = htmlFiles(publicRoot)
let changed = 0
let bodyPreserved = 0
for (const file of files) {
  const original = fs.readFileSync(file, "utf8")
  let output = original
  if (!checkOnly) {
    const withoutPriorSeo = original.replace(markerPattern, "")
    if (!withoutPriorSeo.toLowerCase().includes("</head>"))
      throw new Error(`HTML file has no closing head: ${file}`)
    output = withoutPriorSeo.replace(/<\/head>/i, `${metadataFor(withoutPriorSeo)}\n</head>`)
    if (tailAfterHead(original) !== tailAfterHead(output))
      throw new Error(`Visible HTML content changed in ${file}`)
    bodyPreserved++
    if (output !== original) {
      fs.writeFileSync(file, output, "utf8")
      changed++
    }
  }
  validate(file, output)
}

console.log(
  JSON.stringify(
    {
      mode: checkOnly ? "check" : "inject",
      htmlFiles: files.length,
      changed,
      bodyPreserved,
      keywords,
    },
    null,
    2,
  ),
)
