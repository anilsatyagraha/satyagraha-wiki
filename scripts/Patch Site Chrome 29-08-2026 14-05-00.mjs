import fs from "node:fs"
import path from "node:path"

function patchMasthead() {
  const packageRoot = path.resolve("node_modules/@quartz-community/page-title/dist")
  for (const relativePath of ["index.js", "components/index.js"]) {
    const target = path.join(packageRoot, relativePath)
    if (!fs.existsSync(target)) throw new Error(`Page-title component not found: ${target}`)
    const source = fs.readFileSync(target, "utf8")
    const internalLink = "href: baseDir"
    const externalLink = 'href: "https://www.satyagraha.com"'
    if (source.includes(externalLink)) continue
    if (!source.includes(internalLink)) throw new Error(`Expected page-title link was not found in ${target}`)
    fs.writeFileSync(target, source.replace(internalLink, externalLink), "utf8")
  }
}

function patchFooter() {
  const packageRoot = path.resolve("node_modules/@quartz-community/footer/dist")
  const replacement = `var Footer_default = ((_opts) => {
  const footerLinks = [
    ["YouTube Satyagraha Law Group Channel", "https://www.youtube.com/@satyagrahalawgroup2002"],
    ["🎓 Udemy Courses", "https://www.udemy.com/user/anil-b-23/"],
    ["💼 LinkedIn Profile", "https://www.linkedin.com/in/anilsatyagraha/"],
    ["Facebook", "https://www.facebook.com/satyagrahalawgroup"],
    ["Twitter aka X", "https://twitter.com/_satyagraha"],
    ["Wordpress", "https://satyagrahalawgroup.wordpress.com/"],
    ["Instagram", "https://www.instagram.com/satyagrahalawgroup/"],
    ["Pinterest", "https://in.pinterest.com/satyagrahalawgroup/"],
    ["Tumbler", "https://www.tumblr.com/blog/satyagrahalawgroup"],
    ["Soundcloud", "https://soundcloud.com/satyagrahalawgroup"],
    ["Podomatic", "http://anil-satyagraha.podomatic.com/"],
    ["📰 Newsletter", "https://satyagraha.substack.com/"],
    ["Connect via Whatsapp", "https://api.whatsapp.com/send?phone=917095776633"]
  ];
  const Footer = ({ displayClass }) => /* @__PURE__ */ u2("footer", { class: displayClass ?? "", children: [
    /* @__PURE__ */ u2("p", { children: [
      "This site is built from ",
      /* @__PURE__ */ u2("strong", { children: "real-world experience helping clients seeking Justice" }),
      ", case by case — based on our work involving Legal Research, Drafting, Pleadings, Representation and beyond."
    ] }),
    /* @__PURE__ */ u2("p", { class: "footer-links", children: [
      "Explore further content here: ",
      footerLinks.map(([text, link], index) => /* @__PURE__ */ u2("span", { children: [
        index > 0 ? " | " : "",
        /* @__PURE__ */ u2("a", { href: link, children: text })
      ] }))
    ] }),
    /* @__PURE__ */ u2("p", { class: "footer-help", children: [
      /* @__PURE__ */ u2("strong", { children: "Need Legal Help?" }),
      /* @__PURE__ */ u2("br", {}),
      "💡 ",
      /* @__PURE__ */ u2("a", { href: "https://calendly.com/anil-satyagraha/15min", children: "Click Here For Next Steps" })
    ] })
  ] });
  Footer.css = footer_default;
  return Footer;
});`

  for (const relativePath of ["index.js", "components/index.js"]) {
    const target = path.join(packageRoot, relativePath)
    if (!fs.existsSync(target)) throw new Error(`Footer component not found: ${target}`)
    const source = fs.readFileSync(target, "utf8")
    const pattern = /var Footer_default = \(\(opts\) => \{[\s\S]*?\n\}\);(?=\n\nexport \{ Footer_default as Footer \};)/
    if (!pattern.test(source)) throw new Error(`Expected footer component was not found in ${target}`)
    fs.writeFileSync(target, source.replace(pattern, replacement), "utf8")
  }
}

patchMasthead()
patchFooter()
console.log("Applied the Satyagraha masthead link and site footer.")
