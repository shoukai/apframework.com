import 'css/prism.css'
import 'katex/dist/katex.css'

import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import Image from '@/components/Image'
import TOC from '@/components/TOC'
import siteMetadata from '@/data/siteMetadata'
import { allAuthors, allReadNotes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
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
  const image = new URL(
    note.socialImage || note.cover || siteMetadata.socialBanner,
    siteMetadata.siteUrl
  ).toString()

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
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.summary,
      images: [image],
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

  const author = allAuthors.find((entry) => entry.slug === 'default')
  const authorContent = author ? coreContent(author) : null
  const toc = note.toc
    .filter((heading) => heading.value !== '目录' && heading.depth <= 3)
    .map((heading) => ({
      id: heading.url.replace(/^#/, ''),
      text: heading.value,
      level: heading.depth,
    }))

  return (
    <article className="mx-auto max-w-5xl pb-12 pt-6">
      <Link
        href="/read"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        &larr; 阅读
      </Link>
      <header className="mt-8 border-b border-gray-200 pb-8 text-center dark:border-gray-700">
        <time dateTime={note.date} className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(note.date, siteMetadata.locale)}
        </time>
        <div className="mt-3">
          <PageTitle>{note.title}</PageTitle>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-x-8 border-b border-gray-200 pb-8 dark:border-gray-700 xl:grid-cols-4 xl:gap-x-10">
        <aside className="order-2 pt-8 xl:order-1 xl:pt-10">
          {authorContent && (
            <div className="flex items-center gap-3 border-b border-gray-200 pb-6 dark:border-gray-700">
              {authorContent.avatar && (
                <Image
                  src={authorContent.avatar}
                  width={40}
                  height={40}
                  alt="作者头像"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {authorContent.name}
                </p>
                {authorContent.occupation && (
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {authorContent.occupation}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="pt-6 xl:sticky xl:top-8">
            <TOC toc={toc} />
          </div>
        </aside>
        <div className="order-1 min-w-0 xl:col-span-3 xl:col-start-2 xl:row-span-1 xl:row-start-1">
          <div className="prose max-w-none pt-8 dark:prose-invert xl:pt-10">
            <MDXLayoutRenderer code={note.body.code} components={components} toc={note.toc} />
          </div>
        </div>
      </div>
    </article>
  )
}
