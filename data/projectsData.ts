export interface Project {
  kind: 'tool' | 'skill'
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
  kind: 'tool',
  slug: 'open-context-clipper',
  title: 'Open Context Clipper',
  subtitle: '文脉采集器',
  category: 'Chrome 扩展 · 本地优先',
  description: '把网页文章带回自己的本地知识库。预览、保存、整理，再按需导出为 Markdown。',
  image: '/static/images/projects/open-context-clipper/local-queue.webp',
  imageAlt: 'Open Context Clipper 的本地文章队列界面',
  githubUrl: 'https://github.com/apframework-studio/open-context-clipper',
}

export const openContextArticleReader: Project = {
  kind: 'skill',
  slug: 'open-context-article-reader',
  title: 'Open Context Article Reader',
  subtitle: '单篇文章阅读 Skill',
  category: 'Agent Skill · 文章理解',
  description:
    '读懂一篇文章，也看清证据能支持到哪里。提炼作者的中心意思，解释关键概念，区分原文陈述、推断与未知。',
  image: '/static/images/projects/open-context-article-reader/reading-flow.webp',
  imageAlt: '单篇文章从正文阅读到中心意思、关键概念和证据边界的流程示意',
  githubUrl: 'https://github.com/apframework-studio/open-context-article-reader',
}

export const openContextBookReader: Project = {
  kind: 'skill',
  slug: 'open-context-book-reader',
  title: 'Open Context Book Reader',
  subtitle: '非虚构图书阅读 Skill',
  category: 'Agent Skill · 图书阅读',
  description:
    '为非虚构图书做读前定位、读后阅读地图和可回查的精选笔记，支持从 PDF、EPUB 等本地文件提取内容。',
  image: '/static/images/projects/open-context-book-reader/reading-flow.webp',
  imageAlt: '从图书内容到读前定位、阅读地图和精选笔记的流程示意',
  githubUrl: 'https://github.com/apframework-studio/open-context-book-reader',
}

export const openContextForgeVaultMaintainer: Project = {
  kind: 'skill',
  slug: 'open-context-forge-vault-maintainer',
  title: 'Open Context Forge Vault Maintainer',
  subtitle: '可追溯的知识库维护 Skill',
  category: 'Agent Skill · 知识编译',
  description:
    '把文章保存为原文快照，核对证据与已有笔记，再编译成可追溯、可复用的 Markdown 知识笔记。',
  image: '/static/images/projects/open-context-forge-vault-maintainer/knowledge-flow.webp',
  imageAlt: '从文章原文快照到证据分析和知识笔记的流程示意',
  githubUrl: 'https://github.com/apframework-studio/open-context-forge-vault-maintainer',
}

export const openContextForgeTechArticleWriter: Project = {
  kind: 'skill',
  slug: 'open-context-forge-tech-article-writer',
  title: 'Open Context Forge Tech Article Writer',
  subtitle: '有据可查的中文技术写作 Skill',
  category: 'Agent Skill · 技术写作',
  description: '从指定知识库组织来源、立场和大纲，完成中文技术文章的写作与审稿，交付可审阅的成稿。',
  image: '/static/images/projects/open-context-forge-tech-article-writer/writing-flow.webp',
  imageAlt: '从知识库证据到写作大纲和可审阅文章的流程示意',
  githubUrl: 'https://github.com/apframework-studio/open-context-forge-tech-article-writer',
}

export const openContextForgeArticlePublisher: Project = {
  kind: 'skill',
  slug: 'open-context-forge-article-publisher',
  title: 'Open Context Forge Article Publisher',
  subtitle: '已审稿文章的渠道准备 Skill',
  category: 'Agent Skill · 发布准备',
  description:
    '检查已审稿文章与图片，生成 apframework.com、公众号编辑器或通用 Markdown 可用的发布文件，并记录交付阶段。',
  image: '/static/images/projects/open-context-forge-article-publisher/publishing-flow.webp',
  imageAlt: '从已审稿文章到公开性检查、渠道导出和发布核验的流程示意',
  githubUrl: 'https://github.com/apframework-studio/open-context-forge-article-publisher',
}

const projectsData: Project[] = [
  openContextClipper,
  openContextArticleReader,
  openContextBookReader,
  openContextForgeVaultMaintainer,
  openContextForgeTechArticleWriter,
  openContextForgeArticlePublisher,
]

export default projectsData
