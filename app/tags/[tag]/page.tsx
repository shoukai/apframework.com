import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import { topicGuides } from '@/data/topicGuides'
import { isIndexableTag } from '@/lib/tagIndex'

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const guide = topicGuides[tag]
  return {
    ...genPageMetadata({
      title: guide?.title || tag,
      path: `/tags/${encodeURIComponent(tag)}`,
      description: guide?.description || `${siteMetadata.title} 中关于「${tag}」的文章`,
      alternates: {
        types: {
          'application/rss+xml': `${siteMetadata.siteUrl}/tags/${encodeURIComponent(tag)}/feed.xml`,
        },
      },
    }),
    robots: { index: isIndexableTag(tag, tagData), follow: true },
  }
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  if (filteredPosts.length === 0) {
    return notFound()
  }
  const guide = topicGuides[tag]
  const postByPath = new Map(filteredPosts.map((post) => [post.path, post]))
  const intro = guide ? (
    <section aria-label="主题导读" className="space-y-4 pb-10 text-gray-700 dark:text-gray-300">
      <p className="leading-7">{guide.description}</p>
      <p className="leading-7">{guide.takeaway}</p>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">建议阅读顺序</h2>
      <ol className="list-decimal space-y-3 pl-6">
        {guide.readings.map(({ path, reason }) => {
          const post = postByPath.get(path)
          return post ? (
            <li key={path}>
              <Link
                href={`/${path}`}
                className="font-medium text-primary-500 hover:text-primary-600"
              >
                {post.title}
              </Link>
              <span className="ml-2">{reason}</span>
            </li>
          ) : null
        })}
      </ol>
    </section>
  ) : undefined
  return <ListLayout posts={filteredPosts} title={guide?.title || title} intro={intro} />
}
