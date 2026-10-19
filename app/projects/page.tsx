import Image from '@/components/Image'
import Link from '@/components/Link'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '项目',
  description: 'Shoukai 正在构建的工具与项目',
  openGraph: {
    title: '项目',
    description: 'Shoukai 正在构建的工具与项目',
    url: `${siteMetadata.siteUrl}/projects`,
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type: 'website',
    images: ['/static/images/projects-hero.webp'],
  },
  alternates: { canonical: `${siteMetadata.siteUrl}/projects` },
}

export default function Projects() {
  return (
    <div className="pb-12">
      <header className="pt-6">
        <div className="relative isolate h-72 overflow-hidden rounded-lg sm:h-96">
          <Image
            src="/static/images/projects-hero.webp"
            alt="户外露台上的木质餐桌与天空"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">项目</h1>
            <p className="mt-3 text-base text-gray-100 sm:text-lg">
              正在做的工具，和它们背后的想法。
            </p>
          </div>
          <p className="absolute right-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-sm bg-black/50 px-2.5 py-1.5 text-right text-[11px] leading-4 text-white sm:right-4 sm:top-4">
            Photo by{' '}
            <a
              href="https://unsplash.com/@hvdesignhv?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              Vlad Khmara
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/photos/wooden-dining-set-on-outdoor-deck-Y7oka9Texd4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              Unsplash
            </a>
          </p>
        </div>
      </header>

      <section aria-labelledby="projects-heading" className="pt-10">
        <div className="border-b border-gray-200 pb-7 dark:border-gray-700">
          <h2
            id="projects-heading"
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
          >
            当前项目
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
            从实际问题出发，做一些能长期使用的小工具。
          </p>
        </div>
        <div className="pt-8">
          {projectsData.map((project) => (
            <article
              key={project.slug}
              className="grid overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.subtitle}</p>
                <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  了解项目 <span aria-hidden="true">→</span>
                </Link>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`了解 ${project.title}`}
                className="flex items-center bg-slate-100 p-4 dark:bg-slate-800 sm:p-6"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1865}
                  height={960}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="w-full rounded-md border border-slate-200 object-contain shadow-sm dark:border-slate-700"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
