import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

// Icons mapping using emoji-like strings
const getIconForLink = (type: string) => {
  switch (type) {
    case 'projects':
      return '💻'
    case 'read':
      return '📚'
    case 'about':
      return '🙂'
    case 'blog':
      return '📝'
    default:
      return '🔗'
  }
}

const LINKS = [
  {
    title: '博客 | 知识沉淀与思维碰撞的创作空间',
    href: '/blog',
    type: 'blog',
    ariaLabel: 'Read my blog posts',
  },
  {
    title: '项目 | 持续构建的技术创新实验室',
    href: '/projects',
    type: 'projects',
    ariaLabel: 'View my projects',
  },
  {
    title: '阅读 | 年阅百本的认知进化之旅',
    href: '/read',
    type: 'read',
    ariaLabel: 'View my reading list',
  },
  {
    title: '关于 | 从工程师到终身学习者的故事',
    href: '/about',
    type: 'about',
    ariaLabel: 'Learn more about me',
  },
]

export default function HomeLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {LINKS.map(({ title, href, type, ariaLabel }) => {
        const [mainTitle, subtitle] = title.split(' | ')
        return (
          <Link
            key={title}
            href={href}
            className="group flex items-start gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-all duration-300 shadow-sm hover:shadow"
            aria-label={ariaLabel}
          >
            <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-50 dark:bg-gray-800 text-primary-500 dark:text-primary-400 rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300 text-2xl">
              {getIconForLink(type)}
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {mainTitle}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
