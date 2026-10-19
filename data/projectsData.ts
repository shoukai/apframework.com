export interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  description: string
  image: string
  imageAlt: string
  githubUrl: string
}

export const openContextClipper: Project = {
  slug: 'open-context-clipper',
  title: 'Open Context Clipper',
  subtitle: '文脉采集器',
  category: 'Chrome 扩展 · 本地优先',
  description: '把网页文章带回自己的本地知识库。预览、保存、整理，再按需导出为 Markdown。',
  image: '/static/images/projects/open-context-clipper/local-queue.webp',
  imageAlt: 'Open Context Clipper 的本地文章队列界面',
  githubUrl: 'https://github.com/apframework-studio/open-context-clipper',
}

const projectsData: Project[] = [openContextClipper]

export default projectsData
