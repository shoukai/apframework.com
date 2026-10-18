import assert from 'node:assert/strict'
import test from 'node:test'
import { generateRss } from '../scripts/rss-xml.mjs'

const config = {
  siteUrl: 'https://apframework.com',
  title: 'ApFramework',
  description: 'Articles',
  language: 'zh',
  email: 'reader@example.com',
  author: 'Reader',
}

test('a reading feed uses reading article URLs and excludes drafts', () => {
  const xml = generateRss(
    config,
    [
      {
        path: 'read/notes/first-book',
        title: 'A & B',
        date: '2026-10-17',
        summary: 'A short note',
        tags: [],
        draft: false,
      },
      {
        path: 'read/notes/private',
        title: 'Private',
        date: '2026-10-18',
        tags: [],
        draft: true,
      },
    ],
    'read/feed.xml',
    'read',
    '我的阅读'
  )

  assert.match(xml, /<link>https:\/\/apframework\.com\/read\/notes\/first-book<\/link>/)
  assert.match(xml, /<title>A &amp; B<\/title>/)
  assert.match(xml, /href="https:\/\/apframework\.com\/read\/feed\.xml"/)
  assert.doesNotMatch(xml, /Private|\/read\/notes\/private/)
  assert.doesNotMatch(xml, /\/blog\/first-book/)
})
