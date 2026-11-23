import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { POSTS_PER_PAGE } from '@/lib/blogPagination'

const topics = [
  {
    title: 'AI Agent 架构与治理',
    description: '从单 Agent 到多智能体编排，了解架构选型、工具授权和运行时治理。',
    href: '/tags/ai-agent',
    featuredHref: '/blog/essay/2026-10-25-agent-architecture-evolution',
    featuredTitle: '智能体系统的演进',
  },
  {
    title: '本体工程与企业语义层',
    description: '理解本体建模与 DDD 的分工，以及语义层如何支持可信查询。',
    href: '/tags/ontology',
    featuredHref: '/blog/essay/2026-11-07-ontology-to-trustworthy-query',
    featuredTitle: '从本体到可信查询',
  },
  {
    title: 'Agent 评估与生产质量',
    description: '从工具调用到端到端回答，理解静默失败与质量反馈。',
    href: '/tags/agent-evaluation',
    featuredHref: '/blog/essay/2026-10-27-agentcore-production-evaluation-framework',
    featuredTitle: 'AgentCore 生产级评估',
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
  title: '文章',
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
