import Link from '@/components/Link'
import booksData from '@/config/read-books.json'
import siteMetadata from '@/data/siteMetadata'
import { allReadNotes } from 'contentlayer/generated'
import Image from 'next/image'
import { formatDate } from 'pliny/utils/formatDate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '阅读',
  description: 'Shoukai 的读书笔记与阅读记录',
  openGraph: {
    title: '阅读',
    description: 'Shoukai 的读书笔记与阅读记录',
    url: `${siteMetadata.siteUrl}/read`,
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/read`,
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/read/feed.xml` },
  },
}

export default function ReadPage() {
  const notes = allReadNotes
    .filter((note) => !note.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="pb-10">
      <header className="pt-6">
        <div className="relative isolate h-72 overflow-hidden rounded-lg sm:h-96">
          <Image
            src="/static/images/read-hero.webp"
            alt="明亮的起居室，窗边摆着一棵圣诞树"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-[60%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">阅读</h1>
            <p className="mt-3 text-base text-gray-100 sm:text-lg">
              读过的书，想过的问题，<span className="whitespace-nowrap">留下的笔记。</span>
            </p>
          </div>
          <p className="absolute right-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-sm bg-black/50 px-2.5 py-1.5 text-right text-[11px] leading-4 text-white sm:right-4 sm:top-4">
            Photo by{' '}
            <a
              href="https://unsplash.com/@hvdesignhv"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              Vlad Khmara
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/photos/cozy-living-room-with-christmas-tree-bdr5RrPhty4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              Unsplash
            </a>
          </p>
        </div>
      </header>

      <section
        aria-labelledby="reading-list-heading"
        className="grid gap-6 border-b border-gray-200 py-10 dark:border-gray-700 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
      >
        <div>
          <h2
            id="reading-list-heading"
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
          >
            我的阅读列表
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
            收录 {booksData.length} 本读过的书。按年份翻阅，查看阅读时间和个人评分。
          </p>
        </div>
        <Link
          href="/read/list"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-primary-200"
        >
          浏览阅读列表 <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      <section aria-labelledby="read-notes-heading" className="pt-9">
        <h2
          id="read-notes-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          读书笔记
        </h2>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          {notes.map((note) => (
            <li key={note.path} className="py-7">
              <article
                className={`space-y-2 sm:grid sm:gap-6 sm:space-y-0 ${
                  note.cover
                    ? 'sm:grid-cols-[8rem_3.5rem_minmax(0,1fr)] sm:items-start'
                    : 'sm:grid-cols-[8rem_minmax(0,1fr)]'
                }`}
              >
                <time dateTime={note.date} className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(note.date, siteMetadata.locale)}
                </time>
                {note.cover && (
                  <Link
                    href={`/${note.path}`}
                    aria-label={`阅读《${note.title}》`}
                    className="block h-20 w-14 overflow-hidden rounded-sm bg-gray-100 sm:row-span-2 dark:bg-gray-800"
                  >
                    <Image
                      src={note.cover}
                      alt={`${note.title}封面`}
                      width={56}
                      height={80}
                      sizes="56px"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                )}
                <div className={note.cover ? 'sm:col-start-3' : undefined}>
                  <h3 className="text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
                    <Link
                      href={`/${note.path}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {note.title}
                    </Link>
                  </h3>
                  {note.summary && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{note.summary}</p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
