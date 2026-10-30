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

test('BlogPosting identifies the public article, author, and an absolute image', () => {
  const route = '/blog/essay/2026-10-25-agent-architecture-evolution'
  const html = renderedPage(route)
  const script = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(script, 'BlogPosting JSON-LD is missing')
  const article = JSON.parse(script)

  assert.equal(article.url, `${siteUrl}${route}`)
  assert.equal(
    article.image,
    `${siteUrl}/static/images/2026-10-25-agent-architecture-evolution/diogo-ferrer-9pqqV6YqTK0-unsplash.jpg`
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
