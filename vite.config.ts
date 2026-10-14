import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL || 'https://aditya112-portfolio.vercel.app',
  )

  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      portfolioSeoFiles(siteUrl),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react'
              }
              if (id.includes('@vercel')) {
                return 'vendor-vercel'
              }
            }
          },
        },
      },
    },
  }
})

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return ''

  try {
    const url = new URL(value)
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`
  } catch {
    return ''
  }
}

function portfolioSeoFiles(siteUrl: string): Plugin {
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : []),
    '',
  ].join('\n')
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...(siteUrl
      ? [
          '  <url>',
          `    <loc>${siteUrl}/</loc>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>1.0</priority>',
          '  </url>',
        ]
      : []),
    '</urlset>',
    '',
  ].join('\n')

  return {
    name: 'portfolio-seo-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path !== '/robots.txt' && path !== '/sitemap.xml') return next()

        res.setHeader(
          'Content-Type',
          path === '/robots.txt' ? 'text/plain; charset=utf-8' : 'application/xml; charset=utf-8',
        )
        res.end(path === '/robots.txt' ? robotsTxt : sitemapXml)
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml })
    },
    transformIndexHtml() {
      if (!siteUrl) return []
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
      ]
    },
  }
}
