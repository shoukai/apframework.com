import { MetadataRoute } from 'next'
import { allBlogs, allReadNotes } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import books from '@/config/read-books.json'
import { getReadingYears } from '@/lib/readBooks'
import projectsData from '@/data/projectsData'
import { slug } from 'github-slugger'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const publishedPosts = allBlogs.filter((post) => !post.draft)

  const blogRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))

  const readNoteRoutes = allReadNotes
    .filter((note) => !note.draft)
    .map((note) => ({
      url: `${siteUrl}/${note.path}`,
      lastModified: note.date,
    }))

  const readingYearRoutes = getReadingYears(books).map(({ year }) => ({
    url: `${siteUrl}/read/list/${year}`,
  }))

  const mainRoutes = [
    '',
    'blog',
    'read',
    'read/list',
    'projects',
    ...projectsData.map((project) => `projects/${project.slug}`),
    'tags',
    'about',
  ].map((route) => ({ url: `${siteUrl}/${route}` }))

  const tagSlugs = [
    ...new Set(publishedPosts.flatMap((post) => (post.tags || []).map((tag) => slug(tag)))),
  ]
  const tagRoutes = tagSlugs.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
  }))

  // 合并所有路由
  return [
    ...mainRoutes,
    ...readingYearRoutes,
    ...tagRoutes,
    ...blogRoutes,
    ...readNoteRoutes,
  ]
}
