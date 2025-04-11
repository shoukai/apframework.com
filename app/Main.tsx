import Link from '@/components/Link'
import Tag from '@/components/Tag'
import HomeLinks from '@/components/HomeLinks'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 10

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          {/* Hero section with background image */}
          <div className="relative overflow-hidden rounded-xl mb-5 shadow-lg">
            <div className="h-80 md:h-[28rem]">
              <Image
                src="/static/images/main.jpeg"
                alt="Shoukai Discovery Tour"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <div className="self-end bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white shadow-sm border border-white/20">
                人生在于体会，今时哪及昔时 -- 木心
              </div>
              
              <div className="bg-black/20 backdrop-blur-md p-5 md:p-6 rounded-xl max-w-xl border border-white/10 shadow-xl">
                <h1 className="text-3xl font-normal leading-9 tracking-tight text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-3">
                  Shoukai Discovery Tour
                </h1>
                <p className="text-lg leading-7 text-gray-100">
                  互联网架构师 | 技术管理者 | AI 技术探索者 | 终身阅读者
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="pt-3 pb-8">
            <HomeLinks />
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6 mt-4">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
