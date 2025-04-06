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
    <div className="flex flex-col gap-3 py-6">
      {LINKS.map(({ title, href, type, ariaLabel }) => (
        <Link
          key={title}
          href={href}
          className="flex items-center gap-2 text-lg text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
          aria-label={ariaLabel}
        >
          <span className="text-xl">{getIconForLink(type)}</span>
          <span className="border-b border-dashed border-gray-400 hover:border-primary-500 dark:border-gray-600 dark:hover:border-primary-400">
            {title}
          </span>
        </Link>
      ))}
    </div>
  )
}
