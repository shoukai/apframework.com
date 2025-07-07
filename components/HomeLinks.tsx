import Link from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'

const LINKS = [
  { key: 'blog', ...headerNavLinks.find((l) => l.href === '/blog') },
  { key: 'projects', ...headerNavLinks.find((l) => l.href === '/projects') },
  { key: 'read', ...headerNavLinks.find((l) => l.href === '/read') },
  { key: 'about', ...headerNavLinks.find((l) => l.href === '/about') },
]

const descriptions = {
  blog: '知识沉淀的创作空间',
  projects: '探索与技术创新的实验室',
  read: '年阅百本的认知进化之旅',
  about: '终身学习者的故事',
}

export default function HomeLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {LINKS.map((link) => {
        if (!link.href) return null;
        return (
          <Link
            key={link.key}
            href={link.href}
            aria-label={link.title}
            className="relative flex flex-col justify-between h-28 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-primary-300 dark:hover:border-primary-700"
          >
            {/* 左上角大号英文单词 */}
            <span className="absolute left-4 top-4 text-xl font-extrabold tracking-wide text-gray-300 group-hover:text-primary-400 select-none uppercase">
              {link.title}
            </span>
            {/* 右上角icon */}
            <span className="absolute right-4 top-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-gray-400 group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400 transition-colors"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
            </span>
            {/* 标题和描述 */}
            <div className="mt-10">
              <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-relaxed tracking-wide">
                {descriptions[link.key]}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
