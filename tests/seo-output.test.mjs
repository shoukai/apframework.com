import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const siteUrl = 'https://apframework.com'
const outputRoot = path.resolve('.next/server/app')

function renderedPage(route) {
  const file = path.join(outputRoot, `${route === '/' ? 'index' : route.slice(1)}.html`)
  assert.ok(existsSync(file), `Missing rendered page: ${file}`)
  return readFileSync(file, 'utf8')
}

function metadataValue(html, kind, name) {
  const pattern =
    kind === 'canonical'
      ? /<link rel="canonical" href="([^"]+)"/
      : new RegExp(`<meta property="${name}" content="([^"]+)"`)
  return html.match(pattern)?.[1]
}

test('public pages have their own canonical URLs', () => {
  const routes = [
    '/',
    '/about',
    '/blog',
    '/blog/page/2',
    '/blog/essay/2026-10-25-agent-architecture-evolution',
    '/tags/ai',
    '/read',
    '/projects/open-context-book-reader',
  ]

  for (const route of routes) {
    const expected = `${siteUrl}${route === '/' ? '' : route}`
    assert.equal(metadataValue(renderedPage(route), 'canonical'), expected, route)
  }
})

test('article, tag, and reading sharing URLs match their public routes', () => {
  for (const route of [
    '/blog/essay/2026-10-25-agent-architecture-evolution',
    '/tags/ai',
    '/read/list',
    '/read/list/2026',
  ]) {
    assert.equal(metadataValue(renderedPage(route), 'openGraph', 'og:url'), `${siteUrl}${route}`)
  }
})

test('every sitemap URL points to a generated public page', () => {
  const xml = readFileSync(path.join(outputRoot, 'sitemap.xml.body'), 'utf8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replaceAll('&amp;', '&')
  )
  const missing = urls.filter((value) => {
    const url = new URL(value)
    const route = decodeURIComponent(url.pathname)
    const file = path.join(outputRoot, `${route === '/' ? 'index' : route.slice(1)}.html`)
    return !existsSync(file)
  })

  assert.equal(missing.length, 0, `Sitemap includes missing pages: ${missing.slice(0, 8).join(', ')}`)
})

test('sitemap includes older blog pagination without listing the duplicate first page', () => {
  const xml = readFileSync(path.join(outputRoot, 'sitemap.xml.body'), 'utf8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

  assert.ok(urls.includes(`${siteUrl}/blog/page/2`))
  assert.ok(!urls.includes(`${siteUrl}/blog/page/1`))
})

test('home page identifies the site and articles link the visible author to the profile', () => {
  const home = renderedPage('/')
  const website = [...home.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .find((entry) => entry['@type'] === 'WebSite')
  assert.equal(website?.name, 'ApFramework')
  assert.equal(website?.url, `${siteUrl}/`)

  const article = renderedPage('/blog/essay/2026-10-25-agent-architecture-evolution')
  assert.match(article, /<a[^>]+href="\/about"[^>]*>Shoukai Huang<\/a>/)
})

test('MCP topic page provides a curated route into the articles', () => {
  const html = renderedPage('/tags/mcp')
  assert.match(html, /建议阅读顺序/)
  assert.match(html, /href="\/blog\/essay\/2026-02-16-agent-tool-selection"/)
  assert.match(html, /href="\/blog\/essay\/2025-06-11-Python-MCP"/)
})

test('LangGraph topic page leads from basic concepts to a focused example', () => {
  const html = renderedPage('/tags/langgraph')
  assert.match(html, /建议阅读顺序/)
  assert.match(html, /href="\/blog\/essay\/2025-06-08-LangGraph-Tutorials"/)
  assert.match(html, /href="\/blog\/essay\/2025-09-12-langgraph-concept-subgraph"/)
})

test('an updated article shows readers the same modification date as its structured data', () => {
  const html = renderedPage('/blog/essay/2026-10-27-agentcore-production-evaluation-framework')
  const script = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  const article = JSON.parse(script)
  assert.equal(article.dateModified, '2026-11-05T00:00:00.000Z')
  assert.match(html, /修改于[^<]*<time dateTime="2026-11-05T00:00:00.000Z"/)
})

test('legacy articles keep the page title as their only top-level heading', () => {
  const routes = [
    '/blog/essay/2024-12-08-COLA-Light',
    '/blog/essay/2024-12-15-Claude-MCP',
    '/blog/essay/2024-11-16-ESLint-theory',
    '/blog/essay/2025-04-02-Facebook-Prophet',
    '/blog/essay/2025-04-09-18-RAG-Techniques',
  ]
  for (const route of routes) {
    const count = [...renderedPage(route).matchAll(/<h1\b/g)].length
    assert.equal(count, 1, `${route} has ${count} top-level headings`)
  }
})

test('BlogPosting identifies the public article, author, and an absolute image', () => {
  const route = '/blog/essay/2026-10-25-agent-architecture-evolution'
  const html = renderedPage(route)
  const script = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(script, 'BlogPosting JSON-LD is missing')
  const article = JSON.parse(script)

  assert.equal(article.url, `${siteUrl}${route}`)
  assert.equal(
    article.image,
    `${siteUrl}/static/images/2026-10-25-agent-architecture-evolution/social-card.png`
  )
  assert.equal(article.author?.[0]?.url, `${siteUrl}/about`)
})

test('legacy HTTP article images do not create insecure structured data URLs', () => {
  const html = renderedPage('/blog/opensource/2018-1-9-mweb-github-jekyll')
  const script = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(script)
  const article = JSON.parse(script)

  assert.ok(article.image?.startsWith('https://'), `Insecure image URL: ${article.image}`)
})
