import { MetadataRoute } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  // 博客文章路由 - 添加更多元数据
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // 主要页面路由 - 添加频率和优先级
  const mainRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: 'blog', priority: 0.9, changeFrequency: 'daily' as const },
    { route: 'projects', priority: 0.7, changeFrequency: 'weekly' as const },
    { route: 'tags', priority: 0.6, changeFrequency: 'weekly' as const },
    { route: 'about', priority: 0.5, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}/${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }))

  // 作者页面
  const authorRoutes = allAuthors.map((author) => ({
    url: `${siteUrl}/authors/${author.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 标签页面 - 从博客文章中提取所有唯一标签
  const allTags = [...new Set(allBlogs.flatMap((post) => post.tags || []))]
  const tagRoutes = allTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // 合并所有路由
  return [...mainRoutes, ...authorRoutes, ...tagRoutes, ...blogRoutes]
}
