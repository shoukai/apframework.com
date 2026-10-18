import 'css/prism.css'
import 'katex/dist/katex.css'

import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import { allReadNotes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { formatDate } from 'pliny/utils/formatDate'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const note = allReadNotes.find(
    (entry) => entry.slug === decodeURI(slug.join('/')) && !entry.draft
  )
  if (!note) return {}

  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      url: `${siteMetadata.siteUrl}/${note.path}`,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'article',
      publishedTime: new Date(note.date).toISOString(),
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${note.path}`,
      types: { 'application/rss+xml': `${siteMetadata.siteUrl}/read/feed.xml` },
    },
  }
}

export function generateStaticParams() {
  return allReadNotes.filter((note) => !note.draft).map((note) => ({ slug: note.slug.split('/') }))
}

export default async function ReadNotePage({ params }: Params) {
  const { slug } = await params
  const note = allReadNotes.find(
    (entry) => entry.slug === decodeURI(slug.join('/')) && !entry.draft
  )
  if (!note) notFound()

  return (
    <article className="mx-auto max-w-3xl pb-12 pt-6">
      <Link
        href="/read"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        &larr; 阅读
      </Link>
      <header className="mt-8 border-b border-gray-200 pb-8 dark:border-gray-700">
        <time dateTime={note.date} className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(note.date, siteMetadata.locale)}
        </time>
        <div className="mt-3">
          <PageTitle>{note.title}</PageTitle>
        </div>
      </header>
      <div className="prose max-w-none pt-8 dark:prose-invert">
        <MDXLayoutRenderer code={note.body.code} components={components} toc={note.toc} />
      </div>
    </article>
  )
}
