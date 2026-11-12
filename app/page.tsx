import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import Main from './Main'

export const metadata: Metadata = {
  title: { absolute: 'ApFramework｜AI 智能体架构与实践' },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml` },
  },
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: `${siteMetadata.siteUrl}/`,
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <Main posts={posts} />
    </>
  )
}
