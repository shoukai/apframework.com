interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'shoukai.github.io',
    description: `过往博客：人生在于体会，今时哪及昔时。`,
    imgSrc: '/static/images/project-shoukai.github.png',
    href: 'https://shoukai.github.io/',
  },
  {
    title: 'Awesome LLM Resourses',
    description: `An awesome & curated list of the best LLMOps tools for developers.`,
    imgSrc: '/static/images/project-awesome-llm-resourses.png',
    href: 'https://github.com/shoukai/awesome-llm-resourses',
  },
]

export default projectsData
