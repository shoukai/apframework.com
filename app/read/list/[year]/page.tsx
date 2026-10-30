import ReadingList from '@/components/read/ReadingList'
import books from '@/config/read-books.json'
import siteMetadata from '@/data/siteMetadata'
import { getReadingYears } from '@/lib/readBooks'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = { params: Promise<{ year: string }> }

const years = getReadingYears(books)

export const dynamicParams = false

export function generateStaticParams() {
  return years.map(({ year }) => ({ year: String(year) }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { year } = await params
  return genPageMetadata({
    title: `${year} 年阅读`,
    path: `/read/list/${year}`,
    description: `Shoukai 的 ${year} 年阅读记录、评分与阅读时间。`,
    alternates: {
      types: { 'application/rss+xml': `${siteMetadata.siteUrl}/read/feed.xml` },
    },
  })
}

export default async function ReadingYearPage({ params }: Params) {
  const { year } = await params
  const selectedYear = Number(year)
  if (!years.some((entry) => entry.year === selectedYear)) notFound()

  return <ReadingList selectedYear={selectedYear} />
}
