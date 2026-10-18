import { escape } from 'pliny/utils/htmlEscaper.js'

export function generateRss(config, posts, feedPath, channelPath, channelTitle) {
  const published = posts
    .filter((post) => post.draft !== true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const channelUrl = `${config.siteUrl}/${channelPath}`
  const feedUrl = `${config.siteUrl}/${feedPath}`
  const items = published
    .map((post) => {
      const url = `${config.siteUrl}/${post.path}`
      return `
    <item>
      <guid>${escape(url)}</guid>
      <title>${escape(post.title)}</title>
      <link>${escape(url)}</link>
      ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escape(config.email)} (${escape(config.author)})</author>
      ${(post.tags || []).map((tag) => `<category>${escape(tag)}</category>`).join('')}
    </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(channelTitle)}</title>
    <link>${escape(channelUrl)}</link>
    <description>${escape(config.description)}</description>
    <language>${escape(config.language)}</language>
    <managingEditor>${escape(config.email)} (${escape(config.author)})</managingEditor>
    <lastBuildDate>${published.length ? new Date(published[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escape(feedUrl)}" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`
}
