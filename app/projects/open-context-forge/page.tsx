import Image from '@/components/Image'
import Link from '@/components/Link'
import { openContextForge as project } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'

const imageRoot = '/static/images/projects/open-context-forge'

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

const stages = [
  {
    number: '01',
    title: '让资料先有出处和去处',
    paragraphs: [
      '从「资料与分析」导入 Markdown、HTML、纯文本或 ZIP。新工作区可以自动入库，也可以改为先放进待整理区，再逐篇决定去处。',
      '入库是一个有状态的过程：只有原文快照写入并核验后，资料才显示为「已入库」。来源和原文归属可以核对、修正，避免把本地文件直接当成自己的原创。',
    ],
    image: '01-sources.webp',
    alt: '资料与分析页面，两篇资料显示为已入库',
    caption: '资料与分析：查看导入、入库和待处理状态。',
  },
  {
    number: '02',
    title: '在知识库中回到原文',
    paragraphs: [
      '知识库浏览页把来源快照与现有笔记放在一起，可按库、目录和类型筛选，也能搜索标题、路径和正文。打开一篇资料时，可以核对内容、来源信息与已解析的笔记链接。',
      '除了内置知识库，还可以连接本机已有的 Obsidian 文件夹。连接前会预览需要新增的文件；浏览本身保持只读。知识维护是单独开启的能力，写回目标库前会按证据和计划校验。',
    ],
    image: '02-knowledge.webp',
    alt: '知识库浏览页同时显示资料列表和原文正文',
    caption: '知识库浏览：在写作前查看来源与已有笔记。',
  },
  {
    number: '03',
    title: '选定资料，再与智能体写作',
    paragraphs: [
      '在已入库资料中选择一篇或多篇，带入新文章。文章工作台左侧保留资料、大纲和正文，右侧与本机 Codex 或 Claude 讨论；每篇文章有自己的会话和资料清单。',
      '发送给智能体的资料会固定为本轮快照，并带有可回查的引用编号。写作技能可按需读取；生成的大纲和正文先作为候选文件，等你审阅后才采用到文章中。',
    ],
    image: '03-writing.webp',
    alt: '文章工作台左侧显示正文，右侧显示 Codex 对话和资料引用',
    caption: '文章工作台：资料、正文与本机智能体对话并排。',
  },
  {
    number: '04',
    title: '把审阅留在正式稿之前',
    paragraphs: [
      '大纲和正文都可以先预览、核对，再明确采用。智能体的输出不会因为一次对话结束就自动覆盖正式文章；换了创作资料后，也需要重新核对大纲。',
      '这让来源、讨论、候选稿和最终采用的文本各有位置。你仍然负责判断论证是否成立、引用是否准确，以及文章何时可以定稿。',
    ],
    image: '04-review.webp',
    alt: '审阅智能体草稿的弹窗，可预览正文并选择是否替换',
    caption: '审阅候选稿：核对后再替换正式正文。',
  },
  {
    number: '05',
    title: '定稿后导出可带走的文件',
    paragraphs: [
      '核对标题与正文并定稿后，可以在导出预览中选择插图。现成的 PNG、JPEG 和 WebP 可作为图片素材上传；不选图片也能导出。',
      '「下载 HTML」生成可离线打开的文章文件；「另存为 PDF」使用浏览器打印对话框。两种方式交付的都是你可以自行保存和分享的文件。',
    ],
    image: '06-export.webp',
    alt: '导出预览显示定稿文章、插图选择以及 PDF 和 HTML 导出按钮',
    caption: '导出预览：选择插图，保存 PDF 或离线 HTML。',
  },
]

export default function OpenContextForgePage() {
  return (
    <article className="pb-14 pt-6">
      <Link
        href="/projects"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        ← 项目
      </Link>

      <header className="mt-8 border-b border-gray-200 pb-12 dark:border-gray-700">
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">{project.subtitle}</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">
          它面向希望保留原始材料、自己决定写什么和如何定稿的人。资料、知识库和文章在本机组织；智能体参与讨论与起草，采纳结果由你确认。
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href="/wenmai/index.html"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-primary-200"
          >
            查看产品介绍 <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={project.githubUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
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

      <div className="grid gap-4 border-b border-gray-200 py-10 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4">
        {['资料入库', '知识库核对', '本机智能体写作', 'PDF 与离线 HTML'].map((step) => (
          <div
            key={step}
            className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            {step}
          </div>
        ))}
      </div>

      {stages.map((stage) => (
        <section
          key={stage.number}
          aria-labelledby={`stage-${stage.number}`}
          className="grid items-center gap-8 border-b border-gray-200 py-12 dark:border-gray-700 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        >
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {stage.number} / 工作流程
            </p>
            <h2
              id={`stage-${stage.number}`}
              className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {stage.title}
            </h2>
            {stage.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="overflow-hidden rounded-lg border border-gray-200 bg-slate-100 p-3 dark:border-gray-700 dark:bg-slate-800 sm:p-5">
            <Image
              src={`${imageRoot}/${stage.image}`}
              alt={stage.alt}
              width={1440}
              height={900}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="w-full rounded-md border border-slate-200 dark:border-slate-700"
            />
            <figcaption className="px-1 pt-3 text-sm text-gray-600 dark:text-gray-400">
              {stage.caption}
            </figcaption>
          </figure>
        </section>
      ))}

      <section
        aria-labelledby="getting-started-heading"
        className="border-b border-gray-200 py-12 dark:border-gray-700"
      >
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">06 / 开始使用</p>
        <h2
          id="getting-started-heading"
          className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          在本机运行
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
          按仓库说明准备 Node.js 22.12 或更新版本，并将知识库维护与技术写作 Skill
          放在仓库同级目录，或配置对应路径。安装依赖并启动后，在浏览器打开本地工作台；使用 AI
          写作前，需要先登录本机的 Codex 或 Claude CLI。
        </p>
        <pre className="mt-6 max-w-3xl overflow-x-auto rounded-lg bg-gray-900 px-5 py-4 text-sm leading-7 text-gray-100">
          <code>npm install{'\n'}npm run dev</code>
        </pre>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          具体路径、依赖和试用资料见仓库的中文 README。浏览器一键采集插件目前尚未接入工作台。
        </p>
      </section>

      <section aria-labelledby="related-heading" className="pt-12">
        <h2
          id="related-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          相关技能
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
          文脉引擎可以调用独立的知识库维护、技术写作和文章阅读
          Skill。它们各自保留单独的仓库和项目介绍。
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link
            href="/projects/open-context-forge-vault-maintainer"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            知识库维护 →
          </Link>
          <Link
            href="/projects/open-context-forge-tech-article-writer"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            技术写作 →
          </Link>
          <Link
            href="/projects/open-context-article-reader"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            文章阅读 →
          </Link>
        </div>
      </section>
    </article>
  )
}
