import ReadingList from '@/components/read/ReadingList'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '我的阅读列表',
  path: '/read/list',
  description: 'Shoukai 的年度阅读记录',
  alternates: {
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/read/feed.xml` },
  },
})

export default function ReadingListPage() {
  return <ReadingList />
}
