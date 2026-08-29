import fs from "node:fs"
import path from "node:path"
import { fromHtml } from "hast-util-from-html"

const sourceRoot = "D:/satyagraha/research/nls-cpc"
const targets = [
  "D:/satyagraha/VAULT/Satyagraha Law Group/site/wiki/bare acts/Civil Procedure Code",
  "D:/satyagraha/VAULT/Satyagraha Law Group/satyagraha-wiki/content/bare acts/Civil Procedure Code",
]
const wikiRoot = "bare acts/Civil Procedure Code"

const mapping = new Map()
mapping.set("cpc1", "Civil-Procedure-Code-Preliminary")
for (let n = 2; n <= 12; n++) mapping.set(`cpc${n}`, `Civil-Procedure-Code-Part-${n - 1}`)
for (const n of [...Array.from({ length: 51 }, (_, i) => String(i + 1)), "16a", "20a", "27a", "32a"])
  mapping.set(`cpco${n}`, `Civil-Procedure-Code-Order-${n.toUpperCase()}`)
for (let n = 1; n <= 68; n++) mapping.set(`cpc-f${n}`, `Civil-Procedure-Code-Footnotes-${n}`)
for (const letter of "abcdefgh") mapping.set(`cpc-app${letter}`, `Civil-Procedure-Code-Appendix-${letter.toUpperCase()}`)
for (let n = 2; n <= 5; n++) mapping.set(`cpc-sch${n}`, `Civil-Procedure-Code-Schedule-${n}`)
mapping.set("cpc-annex", "Civil-Procedure-Code-Annexure")
mapping.set("index", "index")

const files = fs.readdirSync(sourceRoot).filter((name) => name.toLowerCase().endsWith(".html"))
const indexHtml = fs.readFileSync(path.join(sourceRoot, "index.html"), "utf8")
const sourceOrder = [...indexHtml.matchAll(/href=["']([^"']+\.html)/gi)]
  .map((match) => path.basename(match[1], ".html").toLowerCase())
  .filter((base, index, all) => base !== "index" && mapping.has(base) && all.indexOf(base) === index)
for (const name of files) {
  const base = path.basename(name, ".html").toLowerCase()
  if (base !== "index" && !sourceOrder.includes(base)) sourceOrder.push(base)
}

function walk(node, visitor) {
  visitor(node)
  for (const child of node.children ?? []) walk(child, visitor)
}

function descendants(node, tagName) {
  const found = []
  walk(node, (item) => {
    if (item.type === "element" && item.tagName === tagName) found.push(item)
  })
  return found
}

function cleanText(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[\t\r\n ]+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\[\s+/g, "[")
    .replace(/\s+\]/g, "]")
    .trim()
}

function wikiLabel(value) {
  return cleanText(value).replace(/\\?[\[\]]/g, " ").replace(/\s+/g, " ").trim()
}

function inline(node) {
  if (node.type === "text")
    return node.value.replace(/\u00a0/g, " ").replaceAll("[", "\\[").replaceAll("]", "\\]")
  if (node.type !== "element") return ""
  if (["script", "style"].includes(node.tagName)) return ""
  if (node.tagName === "br") return "  \n"

  const content = (node.children ?? []).map(inline).join("")
  if (node.tagName === "sup") return content.trim() ? `\\[${cleanText(content)}\\]` : ""
  if (node.tagName === "strong" || node.tagName === "b") return cleanText(content) ? `**${cleanText(content)}**` : ""
  if (node.tagName === "em" || node.tagName === "i") return cleanText(content) ? `*${cleanText(content)}*` : ""
  if (node.tagName === "a") {
    const label = wikiLabel(content)
    const href = String(node.properties?.href ?? "")
    if (!label) return ""
    const localBase = path.basename(href.split(/[?#]/)[0], path.extname(href.split(/[?#]/)[0])).toLowerCase()
    const destination = mapping.get(localBase)
    return destination && href && !href.toLowerCase().startsWith("javascript:")
      ? `[[${wikiRoot}/${destination}|${label}]]`
      : label
  }
  return content
}

function readableTitle(base) {
  if (base === "index") return "Code of Civil Procedure, 1908"
  return mapping.get(base).replaceAll("-", " ").replace("Civil Procedure Code ", "Civil Procedure Code - ")
}

function isNavigation(node, text) {
  if (node.tagName !== "p") return false
  const align = String(node.properties?.align ?? "").toLowerCase()
  const hrefs = descendants(node, "a").map((a) => String(a.properties?.href ?? "").toLowerCase())
  return align === "right" || hrefs.some((href) => href.includes("index.html")) || /^(previous|next|contents|home)\b/i.test(text)
}

function headingLevel(node, text, blockIndex) {
  if (/^code of civil procedure 1908\b/i.test(text)) return blockIndex === 0 ? 1 : 2
  if (/^(order\s+[ivxlcdm]+|part\s+[ivxlcdm]+|appendix\s+[a-h]|the\s+\w+\s+schedule|annexure)\b/i.test(text)) return 2
  if (node.tagName.startsWith("h")) return 2
  const align = String(node.properties?.align ?? "").toLowerCase()
  if (align === "center" && text.length <= 160) return 3
  if (/^\[?\d+[A-Z]?\.\s+\S/i.test(text) && text.length <= 180) return 4
  return 0
}

function documentBlocks(tree, base) {
  const body = descendants(tree, "body")[0] ?? tree
  if (base === "index") {
    const blocks = ["# Code of Civil Procedure, 1908", "## Table of Contents"]
    for (const anchor of descendants(body, "a")) {
      const item = cleanText(inline(anchor))
      if (item && item.startsWith("[[")) blocks.push(`- ${item}`)
    }
    return blocks
  }

  const candidates = []
  walk(body, (node) => {
    if (node.type !== "element") return
    if (["p", "h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) candidates.push(node)
  })

  const blocks = []
  for (const node of candidates) {
    let text = cleanText(inline(node))
    if (!text || isNavigation(node, text)) continue
    if (/^(code of civil procedure 1908)(\s*-\s*schedule i)?$/i.test(text) && blocks.length > 0) continue
    const level = headingLevel(node, text, blocks.length)
    blocks.push(level ? `${"#".repeat(level)} ${text}` : text)
  }
  return blocks.filter((block, index) => index === 0 || block !== blocks[index - 1])
}

function nav(base) {
  const pos = sourceOrder.indexOf(base)
  const links = [`[[${wikiRoot}/index|Table of Contents]]`]
  if (pos > 0) links.push(`[[${wikiRoot}/${mapping.get(sourceOrder[pos - 1])}|Previous]]`)
  if (pos >= 0 && pos < sourceOrder.length - 1) links.push(`[[${wikiRoot}/${mapping.get(sourceOrder[pos + 1])}|Next]]`)
  return links.join(" | ")
}

for (const filename of files) {
  const base = path.basename(filename, ".html").toLowerCase()
  if (!mapping.has(base)) throw new Error(`No readable filename mapping for ${filename}`)
  const tree = fromHtml(fs.readFileSync(path.join(sourceRoot, filename), "utf8"))
  const title = readableTitle(base)
  const aliases = base === "index"
    ? []
    : [
        `bare-acts/code-of-civil-procedure/${base}`,
        `bare-acts/code-of-civil-procedure/${mapping.get(base).toLowerCase()}`,
      ]
  const frontmatter = [
    "---",
    `title: "${title.replaceAll('"', '\\"')}"`,
    ...(aliases.length > 0 ? ["aliases:", ...aliases.map((alias) => `  - ${alias}`)] : []),
    "---",
  ].join("\n")
  const bodyBlocks = [
    ...(base === "index" ? [] : [nav(base)]),
    ...documentBlocks(tree, base),
  ]
  const content = `${frontmatter}\n\n${bodyBlocks.join("\n\n")}\n`

  if (/Â|�|javascript:|https?:\/\//i.test(content)) throw new Error(`Unsafe or garbled content remains in ${filename}`)
  const outputName = `${mapping.get(base)}.md`
  for (const target of targets) fs.writeFileSync(path.join(target, outputName), content, "utf8")
}

for (const target of targets) {
  const markdownFiles = fs.readdirSync(target).filter((name) => name.endsWith(".md"))
  const available = new Set(markdownFiles.map((name) => path.basename(name, ".md").toLowerCase()))
  let checkedLinks = 0
  for (const filename of markdownFiles) {
    const markdown = fs.readFileSync(path.join(target, filename), "utf8")
    const starts = markdown.match(/\[\[/g)?.length ?? 0
    const links = [...markdown.matchAll(/\[\[([^|\]#]+)(?:#[^|\]]+)?(?:\|([^\]]+))?\]\]/g)]
    if (links.length !== starts) throw new Error(`Malformed wiki link remains in ${path.join(target, filename)}`)
    for (const match of links) {
      const destination = match[1].trim().replace(/\.md$/i, "")
      const basename = path.basename(destination).toLowerCase()
      if (!available.has(basename)) throw new Error(`Missing wiki-link destination ${destination} in ${filename}`)
      if (match[2]?.match(/[\[\]]/)) throw new Error(`Unsafe brackets remain in wiki-link label in ${filename}`)
      checkedLinks++
    }
  }
  console.log(`Validated ${checkedLinks} internal links in ${markdownFiles.length} Markdown files at ${target}.`)
}

console.log(`Rebuilt ${files.length} CPC Markdown documents in ${targets.length} targets.`)
