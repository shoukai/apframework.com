import Link from '@/components/Link'

export default function RelatedPosts({ posts }: { posts: { path: string; title: string }[] }) {
  if (posts.length === 0) return null

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"
    >
      <h2
        id="related-posts-heading"
        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        继续阅读
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {posts.map((post) => (
          <li key={post.path}>
            <Link href={`/${post.path}`} className="text-primary-500 hover:text-primary-600">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
