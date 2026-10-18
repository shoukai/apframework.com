import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { slug } from 'github-slugger'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs, allReadNotes } from '../.contentlayer/generated/index.mjs'
import { generateRss } from './rss-xml.mjs'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

function writeFeed(feedPath, posts, channelPath, channelTitle) {
  const filePath = path.join(outputFolder, feedPath)
  mkdirSync(path.dirname(filePath), { recursive: true })
  writeFileSync(filePath, generateRss(siteMetadata, posts, feedPath, channelPath, channelTitle))
}

export default function rss() {
  const blogs = allBlogs.filter((post) => !post.draft)
  writeFeed('feed.xml', blogs, 'blog', siteMetadata.title)
  writeFeed('blog/feed.xml', blogs, 'blog', `${siteMetadata.title} · AI 技术`)
  writeFeed('read/feed.xml', allReadNotes, 'read', `${siteMetadata.title} · 阅读`)

  for (const tag of Object.keys(tagData)) {
    const tagged = blogs.filter((post) => post.tags?.some((item) => slug(item) === tag))
    if (tagged.length > 0) {
      writeFeed(`tags/${tag}/feed.xml`, tagged, `tags/${tag}`, `${siteMetadata.title} · ${tag}`)
    }
  }

  console.log('RSS feeds generated...')
}
