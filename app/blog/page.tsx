import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

const POSTS_PER_PAGE = 5

const topics = [
  {
    title: '智能体架构与治理',
    description: '从 Agent Loop、多智能体编排到评估、安全与运行时控制。',
    href: '/tags/ai-agent',
    featuredHref: '/blog/essay/2026-10-25-agent-architecture-evolution',
    featuredTitle: '智能体系统的演进',
  },
  {
    title: '上下文与知识工程',
    description: '关注上下文、语义层与知识表示如何支撑可靠的智能体。',
    href: '/tags/context-engineering',
    featuredHref: '/blog/essay/2026-08-23-semantic-layer-for-ai-agents',
    featuredTitle: '为 AI Agent 构建企业语义层',
  },
  {
    title: 'Agent Skills 实践',
    description: '将阅读、知识整理和技术写作方法做成可复用的工具与技能。',
    href: '/tags/agent-skills',
    featuredHref: '/blog/essay/2025-12-14-Claude-Agent-Skills',
    featuredTitle: 'Claude Agent Skills 实践',
  },
] as const

const topicIntro = (
  <section aria-labelledby="featured-topics-heading" className="pb-10">
    <h2
      id="featured-topics-heading"
      className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100"
    >
      从这些主题开始
    </h2>
    <div className="grid gap-4 md:grid-cols-3">
      {topics.map((topic) => (
        <article
          key={topic.title}
          className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
        >
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            <Link href={topic.href} className="hover:text-primary-500">
              {topic.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {topic.description}
          </p>
          <Link
            href={topic.featuredHref}
            className="mt-4 inline-block text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {topic.featuredTitle} →
          </Link>
        </article>
      ))}
    </div>
  </section>
)

export const metadata = genPageMetadata({
  title: '博客',
  path: '/blog',
  description: '探索 AI 智能体架构、上下文工程、领域建模与软件实践的文章和研究笔记。',
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      intro={topicIntro}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="全部文章"
    />
  )
}
