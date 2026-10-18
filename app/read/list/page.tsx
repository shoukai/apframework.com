import ReadingList from '@/components/read/ReadingList'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的阅读列表',
  description: 'Shoukai 的年度阅读记录',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/read/list`,
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/read/feed.xml` },
  },
}

export default function ReadingListPage() {
  return <ReadingList />
}
