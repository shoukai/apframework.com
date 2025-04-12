"use client"

import { ReactNode, useEffect, useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Giscus from '@/components/Giscus'
import TOC from '@/components/TOC'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`


const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]
  
  // Extract headings from the children for TOC
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);
  
  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
    const headings = headingElements.map((element, index) => {
      // If element doesn't have an ID, generate one based on its text content
      if (!element.id) {
        const text = element.textContent || '';
        // Create a CSS-safe ID by removing problematic characters and ensuring it starts with a letter
        let id = text
          .toLowerCase()
          .trim()
          .replace(/[\s.。，,：:（）()]/g, '-') // Replace spaces and punctuation with hyphens
          .replace(/-+/g, '-')                // Replace multiple hyphens with a single one
          .replace(/^-+|-+$/g, '')           // Remove leading and trailing hyphens
          .replace(/[^a-z0-9-_]/g, '');      // Remove any other non-alphanumeric characters except hyphens and underscores
        
        // Ensure the ID starts with a letter (required for valid HTML IDs)
        if (!/^[a-z]/.test(id)) {
          id = 'h-' + id;
        }
        
        // Add the ID to the element if it doesn't have one
        if (id) {
          element.id = id;
        } else {
          // Fallback ID if text content doesn't generate a valid ID
          element.id = `heading-${index}`;
        }
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1), 10),
      };
    });
    setToc(headings);
  }, [children]);

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {/* Use a more controlled date format to avoid hydration errors */}
                      {new Date(date).getFullYear()}年
                      {new Date(date).getMonth() + 1}月
                      {new Date(date).getDate()}日
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter
                                .replace('https://twitter.com/', '@')
                                .replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-6 pt-6 dark:prose-invert">{children}</div>

              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}

                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
              
              {/* TOC Component */}
              <div className="pt-6 sticky top-8 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm z-10">
                <h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  目录大纲
                </h3>
                <div className="mt-4">
                  <TOC toc={toc} />
                </div>
              </div>
              
              {/* 添加 Giscus 评论组件 */}
              <div className="pt-8">
                <Giscus />
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
