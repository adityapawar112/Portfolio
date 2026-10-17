import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL || "https://aditya112-portfolio.vercel.app",
  )

  return {
    base: "/",
    plugins: [react(), tailwindcss(), portfolioSeoFiles(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "vendor-react"
              }
              if (id.includes("@vercel")) {
                return "vendor-vercel"
              }
            }
          },
        },
      },
    },
  }
})

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return ""

  try {
    const url = new URL(value)
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`
  } catch {
    return ""
  }
}

function portfolioSeoFiles(siteUrl: string): Plugin {
  const robotsTxt = [
    "# Allow all crawlers and search engines",
    "User-agent: *",
    "Allow: /",
    "",
    "# Explicitly allow AI and LLM crawlers to crawl freely",
    "User-agent: GPTBot",
    "User-agent: ChatGPT-User",
    "User-agent: OAI-SearchBot",
    "User-agent: ClaudeBot",
    "User-agent: Claude-Web",
    "User-agent: anthropic-ai",
    "User-agent: PerplexityBot",
    "User-agent: Google-Extended",
    "User-agent: GoogleOther",
    "User-agent: Applebot-Extended",
    "User-agent: Meta-ExternalAgent",
    "User-agent: Meta-ExternalFetcher",
    "User-agent: cohere-ai",
    "User-agent: MistralBot",
    "User-agent: Bytespider",
    "User-agent: DuckAssistBot",
    "User-agent: CCBot",
    "Allow: /",
    ...(siteUrl
      ? [
          "",
          `Sitemap: ${siteUrl}/sitemap.xml`,
          "",
          "# LLM knowledge bundle",
          `# ${siteUrl}/llms.txt`,
          `# ${siteUrl}/llm.txt`,
        ]
      : []),
    "",
  ].join("\n")
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...(siteUrl
      ? [
          "  <url>",
          `    <loc>${siteUrl}/</loc>`,
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
          "    <changefreq>monthly</changefreq>",
          "    <priority>1.0</priority>",
          "  </url>",
        ]
      : []),
    "</urlset>",
    "",
  ].join("\n")

  return {
    name: "portfolio-seo-files",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0]
        if (path !== "/robots.txt" && path !== "/sitemap.xml") return next()

        res.setHeader(
          "Content-Type",
          path === "/robots.txt"
            ? "text/plain; charset=utf-8"
            : "application/xml; charset=utf-8",
        )
        res.end(path === "/robots.txt" ? robotsTxt : sitemapXml)
      })
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsTxt,
      })
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemapXml,
      })
    },
    transformIndexHtml() {
      if (!siteUrl) return []
      return [
        {
          tag: "link",
          attrs: { rel: "canonical", href: `${siteUrl}/` },
          injectTo: "head",
        },
        {
          tag: "meta",
          attrs: { property: "og:url", content: `${siteUrl}/` },
          injectTo: "head",
        },
      ]
    },
  }
}
