import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import Main from './Main'
import { genPageMetadata } from './seo'

const homeTitle = 'AI 智能体架构设计与生产落地'

export const metadata: Metadata = {
  ...genPageMetadata({
    title: homeTitle,
    path: '/',
    description: '分享 AI 智能体从原型到生产的工程实践，涵盖 Agent 架构、上下文工程、评估与线上运维。',
    alternates: {
      canonical: siteMetadata.siteUrl,
      types: { 'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml` },
    },
  }),
  title: { absolute: `${siteMetadata.title}｜${homeTitle}` },
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
