import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import type { SkillProjectDetail } from '@/data/skillProjectDetails'
import type { Metadata } from 'next'

export function skillProjectMetadata({ project }: SkillProjectDetail): Metadata {
  return {
    title: `${project.title} · ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title: `${project.title} · ${project.subtitle}`,
      description: project.description,
      url: `${siteMetadata.siteUrl}/projects/${project.slug}`,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'website',
      images: [project.image],
    },
    alternates: { canonical: `${siteMetadata.siteUrl}/projects/${project.slug}` },
  }
}

export default function SkillProjectPage({ detail }: { detail: SkillProjectDetail }) {
  const { project } = detail

  return (
    <article className="pb-14 pt-6">
      <Link
        href="/projects"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        ← 项目
      </Link>

      <header className="mt-8 border-b border-gray-200 pb-10 dark:border-gray-700">
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">{project.subtitle}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href={project.githubUrl}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-primary-200"
          >
            GitHub 仓库 <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href={`${project.githubUrl}/blob/main/README.zh-CN.md`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            阅读中文说明 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <section
        aria-labelledby="focus-heading"
        className="grid items-center gap-8 border-b border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
      >
        <div>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">01 / 场景</p>
          <h2 id="focus-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
            {detail.focusTitle}
          </h2>
          {detail.focus.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="overflow-hidden rounded-lg border border-gray-200 bg-slate-100 p-3 dark:border-gray-700 dark:bg-slate-800 sm:p-5">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1865}
            height={960}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="w-full rounded-md border border-slate-200 dark:border-slate-700"
          />
          <figcaption className="px-1 pt-3 text-sm text-gray-600 dark:text-gray-400">
            工作流程示意，具体使用方式见仓库说明。
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="capabilities-heading"
        className="border-b border-gray-200 py-12 dark:border-gray-700"
      >
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">02 / 能做什么</p>
        <h2 id="capabilities-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
          从输入到可用的结果
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {detail.points.map((point, index) => (
            <div
              key={point.title}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {point.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="usage-heading"
        className="border-b border-gray-200 py-12 dark:border-gray-700"
      >
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">03 / 使用</p>
        <h2 id="usage-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
          {detail.usageTitle}
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">{detail.usage}</p>
        <blockquote className="mt-6 max-w-3xl whitespace-pre-line rounded-lg border-l-4 border-primary-500 bg-gray-50 px-5 py-4 leading-7 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {detail.example}
        </blockquote>
      </section>

      <section aria-labelledby="availability-heading" className="pt-11">
        <h2
          id="availability-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          当前状态
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
          GitHub 仓库已公开，采用 MIT 协议。{detail.status}
        </p>
        <Link
          href={project.githubUrl}
          className="mt-5 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          查看源码与使用说明 <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
