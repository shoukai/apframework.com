import Image from '@/components/Image'
import Link from '@/components/Link'
import { openContextClipper as project } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'

const imageRoot = '/static/images/projects/open-context-clipper'

export const metadata: Metadata = {
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

export default function OpenContextClipperPage() {
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
        <div className="mt-7">
          <Link
            href={project.githubUrl}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-primary-200"
          >
            GitHub 仓库 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <section
        aria-labelledby="capture-heading"
        className="grid items-center gap-8 border-b border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">01 / 预览</p>
          <h2 id="capture-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
            先看内容，再决定保存
          </h2>
          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            扩展会展示识别出的标题、来源、正文片段等信息。只有点击“保存到采集队列”，文章才会留在本机；关闭弹窗不会自动保存。
          </p>
        </div>
        <figure className="overflow-hidden rounded-lg border border-gray-200 bg-slate-100 p-3 dark:border-gray-700 dark:bg-slate-800 sm:p-5">
          <Image
            src={`${imageRoot}/capture-preview.webp`}
            alt="采集预览弹窗，展示文章信息、正文片段和保存按钮"
            width={554}
            height={529}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="w-full rounded-md border border-slate-200 dark:border-slate-700"
          />
          <figcaption className="px-1 pt-3 text-sm text-gray-600 dark:text-gray-400">
            核对识别结果后再保存。
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="organize-heading"
        className="grid items-center gap-8 border-b border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">02 / 整理</p>
          <h2 id="organize-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
            在本地队列集中管理
          </h2>
          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            已采集的文章可以搜索、查看详情、添加备注和批量选择。待导出的内容放在收件箱，导出开始后进入“已完成”，便于近期查找和再次导出。
          </p>
        </div>
        <figure className="overflow-hidden rounded-lg border border-gray-200 bg-slate-100 p-3 dark:border-gray-700 dark:bg-slate-800 sm:p-5">
          <Image
            src={`${imageRoot}/local-queue.webp`}
            alt="本地队列中的收件箱、搜索栏和文章详情"
            width={1865}
            height={960}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="w-full rounded-md border border-slate-200 dark:border-slate-700"
          />
          <figcaption className="px-1 pt-3 text-sm text-gray-600 dark:text-gray-400">
            本地队列的收件箱视图。
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="export-heading"
        className="grid items-center gap-8 border-b border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">03 / 导出</p>
          <h2 id="export-heading" className="mt-3 text-2xl font-semibold dark:text-gray-100">
            继续用熟悉的工具阅读
          </h2>
          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            单篇文章可以下载为 Markdown；多篇文章可以打包为 ZIP，也可以导出所选记录的 JSON。Markdown
            保留来源等信息，是可以自行整理和备份的普通文本文件。
          </p>
        </div>
        <figure className="overflow-hidden rounded-lg border border-gray-200 bg-slate-100 p-3 dark:border-gray-700 dark:bg-slate-800 sm:p-5">
          <Image
            src={`${imageRoot}/markdown-in-typora.webp`}
            alt="导出的 Markdown 文章在 Typora 中打开"
            width={1656}
            height={1050}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="w-full rounded-md border border-slate-200 dark:border-slate-700"
          />
          <figcaption className="px-1 pt-3 text-sm text-gray-600 dark:text-gray-400">
            导出后的 Markdown 可以用 Typora 等编辑器打开。
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="availability-heading" className="pt-11">
        <h2
          id="availability-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          当前状态
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
          Open Context Clipper 已在 GitHub 开源，目前仍需按照仓库说明从源码构建，并在 Chrome
          中加载已解压的扩展程序；尚未上架 Chrome Web
          Store。文章提取、队列保存和转换都在浏览器本机完成，无需账号或后端服务。
        </p>
        <Link
          href={project.githubUrl}
          className="mt-5 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          查看源码与安装说明 <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
