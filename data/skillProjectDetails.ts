import {
  openContextArticleReader,
  openContextBookReader,
  openContextForgeArticlePublisher,
  openContextForgeTechArticleWriter,
  openContextForgeVaultMaintainer,
  type Project,
} from './projectsData'

export interface SkillProjectDetail {
  project: Project
  focusTitle: string
  focus: string[]
  points: { title: string; description: string }[]
  usageTitle: string
  usage: string
  example: string
  status: string
}

export const articleReaderDetail: SkillProjectDetail = {
  project: openContextArticleReader,
  focusTitle: '从一篇文章的正文开始',
  focus: [
    '提供单篇博文或网络文章的链接、粘贴正文、Markdown/MDX，或可读取的本地文本。Skill 会先确认能读到哪些内容，再根据文章的用途选择合适的理解方式。',
    '技术教程、商业观点和哲学讨论都可以阅读；整本书、完整论文和批量订阅不在这个 Skill 的范围内。',
  ],
  points: [
    {
      title: '还原中心意思',
      description:
        '先读正文，找出作者在回答什么问题、主要结论是什么。结语可以提供线索，但要回到正文核对。',
    },
    {
      title: '解释关键概念',
      description: '选出真正支撑文章的少数要点，用通俗语言说明含义，并接上文中的做法、例子或论证。',
    },
    {
      title: '标记证据边界',
      description:
        '区分作者陈述、基于原文的推断、外部核对与未知项；正文或关键材料不可读时，明确说明限制。',
    },
  ],
  usageTitle: '加入 Agent 的 Skill 搜索路径',
  usage:
    '按仓库说明安装，保留 SKILL.md 与 references/ 的相对位置。Skill 可用后，给出一篇文章，并告诉 Agent 希望理解的重点。例如：',
  example: [
    '使用 $open-context-article-reader 阅读这篇文章：〈文章链接或本地文件路径〉',
    '',
    '请仅依据本文，按以下顺序回答：',
    '1. 中心意思：用一句话概括作者要回答的问题和主要结论。',
    '2. 关键概念：选出 3–5 个支撑结论的概念或要点，结合原文例子解释。',
    '3. 证据边界：分别指出作者的原文陈述、基于原文的推断，以及尚缺的证据。',
    '',
    '请标注重要判断在原文中的位置；若正文或关键材料无法读取，先说明限制。',
  ].join('\n'),
  status:
    '这是由说明文件组成的独立 Skill，无需运行服务，也不依赖知识库；阅读效果仍在通过不同类型的文章持续验证。',
}

export const bookReaderDetail: SkillProjectDetail = {
  project: openContextBookReader,
  focusTitle: '先确认读到了哪些部分',
  focus: [
    '面向非虚构图书，尤其适合 AI、科学、技术与哲学。可读取本地 PDF、EPUB、TXT、Markdown 和 HTML，并检查提取质量与章节覆盖。',
    '只有书名、简介或目录时，会提供明确标记的初步定位；只有部分章节时，也不会把局部阅读说成通读全书。',
  ],
  points: [
    {
      title: '读前定位',
      description: '梳理作者、背景、领域、核心问题和适合的读者，让阅读目标更清楚。',
    },
    {
      title: '阅读地图',
      description: '说明各部分如何推进全书的问题、框架和论证，而不是只复述目录。',
    },
    {
      title: '可回查的笔记',
      description: '精选笔记保留原书位置，区分作者观点、读者理解、质疑和待查证点。',
    },
  ],
  usageTitle: '从本地图书或目录开始',
  usage:
    '将整个仓库加入 Agent 的 Skill 搜索路径，或让 Agent 先读取仓库根目录的 SKILL.md。提供图书文件、目录或导出的划线笔记，并说明希望先定位还是做读后分析。例如：',
  example: [
    '使用 $open-context-book-reader 阅读：〈本地图书文件路径〉',
    '',
    '请先检查文本提取质量和实际读取的章节，再按以下顺序回答：',
    '1. 读前定位：说明本书的核心问题、适合的读者和阅读重点。',
    '2. 阅读地图：解释各部分如何推进全书的框架与论证。',
    '3. 精选笔记：整理关键观点，标注章节或原文位置，并区分作者观点、你的理解与待查证问题。',
    '',
    '若只能读取目录或部分章节，请标明覆盖范围，不将局部分析写成全书结论。',
  ].join('\n'),
  status:
    '仓库提供本地提取脚本；生成的提取包可能包含图书全文，应保存在自己指定的仓库外目录。扫描版和复杂图表仍需要人工核查。',
}

export const vaultMaintainerDetail: SkillProjectDetail = {
  project: openContextForgeVaultMaintainer,
  focusTitle: '从来源走向长期知识',
  focus: [
    '把网页文章或本地 Markdown 纳入明确指定的 Markdown / Obsidian vault。先保存不可变的原文快照，再分析来源与证据，查找相关旧笔记。',
    '导入脚本只负责保存和查询等确定性工作；完整的知识编译仍需要 Agent 阅读材料、制定计划、写回笔记并校验。',
  ],
  points: [
    {
      title: '保留原文快照',
      description: '记录来源、作者归属和内容版本，让后续笔记能回到原文。',
    },
    {
      title: '先分析再写入',
      description: '比对已有知识，分清新判断、重复内容与可能的冲突。',
    },
    {
      title: '校验知识笔记',
      description: '为笔记保留证据位置，并检查链接、来源字段和原文指纹。',
    },
  ],
  usageTitle: '每次明确目标知识库',
  usage:
    '让 Agent 读取整个 Skill 目录，并提供要导入的文章以及目标 vault 路径或配置名称。运行辅助脚本需要 Node.js 20 或更新版本。例如：',
  example: [
    '使用 $open-context-forge-vault-maintainer，将〈文章链接或本地 Markdown 路径〉编译进〈目标 vault 绝对路径〉。',
    '文章归属：〈本人原创／第三方作者及姓名／未知〉',
    '',
    '请按以下顺序处理：',
    '1. 核对正文完整性和目标 vault，保存原文快照与来源信息。',
    '2. 查找相关旧笔记，区分新增、重复与冲突内容，记录分析和编译计划。',
    '3. 写入或局部更新知识笔记，校验证据引用、链接与索引。',
    '',
    '完成后列出创建、更新和跳过的文件及待确认问题；若只有摘要或截断正文，先说明限制，不按全文编译。',
  ].join('\n'),
  status:
    'Skill 与脚本已在公开仓库提供；它不提供常驻服务。目标 vault 由使用者选择，普通导入不会自行写入其他知识库。',
}

export const techArticleWriterDetail: SkillProjectDetail = {
  project: openContextForgeTechArticleWriter,
  focusTitle: '用知识库写出有依据的判断',
  focus: [
    '从指定 Markdown 知识库读取已有判断、来源和风格线索，整理证据表与立场，再形成大纲、草稿和可审阅的中文技术文章。',
    '写作项目与知识库分开保存；默认只读 vault，不负责导入来源或把文章发布到网站。',
  ],
  points: [
    {
      title: '厘清来源与立场',
      description: '分开记录用户判断、知识库观点、来源事实与仍有争议的问题。',
    },
    {
      title: '组织论证大纲',
      description: '为每节安排论点、证据与推进关系，明确文章怎样回答核心问题。',
    },
    {
      title: '写作并审稿',
      description: '检查事实、证据、风格与未完成项，交付可继续审阅的 article.md。',
    },
  ],
  usageTitle: '指定知识库与写作目标',
  usage:
    '将整个仓库作为 Skill 使用，并在每次任务里指定目标 vault。可以从主题、大纲或已有草稿开始；完整写作通常会先确认大纲。例如：',
  example: [
    '使用 $open-context-forge-tech-article-writer，基于〈目标 vault 绝对路径〉写一篇关于〈主题〉的中文技术文章。',
    '我希望表达的判断：〈你的观点；如未确定，请先帮我澄清〉',
    '',
    '请按以下阶段推进：',
    '1. 证据与立场：区分知识库中的事实、已有观点、我的判断和待核实问题。',
    '2. 论证大纲：说明每节的论点与依据，先交给我确认。',
    '3. 大纲确认后再写作和审稿，交付可审阅的 article.md，并标明未核实事项。',
    '',
    '默认只读目标 vault，不发布文章。',
  ].join('\n'),
  status:
    '仓库已公开。写作产物放在独立的 writing project 中；本 Skill 完成于可审阅成稿，不自动改写知识库或发布文章。',
}

export const articlePublisherDetail: SkillProjectDetail = {
  project: openContextForgeArticlePublisher,
  focusTitle: '把审过的稿件准备给目标渠道',
  focus: [
    '读取已审稿的 Markdown 或 MDX 与本地图片，检查草稿标记、未解析链接和缺失素材，再生成目标渠道需要的文章与图片文件。',
    '当前支持 apframework.com 的 Contentlayer MDX、公众号编辑器导入包，以及可迁移的通用 Markdown。生成文件只是准备阶段，不等于文章已上线。',
  ],
  points: [
    {
      title: '核对成稿',
      description: '检查公开发布的阻断项、文章元数据、图片与资源路径。',
    },
    {
      title: '按渠道导出',
      description: '为博客、公众号编辑器或通用 Markdown 生成各自可用的文件。',
    },
    {
      title: '报告真实阶段',
      description: '区分发布包已准备、已写入仓库和公开页面真正可访问。',
    },
  ],
  usageTitle: '从已审稿文章开始',
  usage:
    '将整个仓库加入 Agent 的 Skill 搜索路径，保留 scripts/ 与 references/。指定已审稿的文章或写作项目、目标渠道和输出目录。例如：',
  example: [
    '使用 $open-context-forge-article-publisher，将〈已审稿文章文件或写作项目目录〉准备为 apframework 发布包，输出到〈审阅目录〉。',
    '',
    '请按以下顺序处理：',
    '1. 检查正式稿、公开元数据、链接和图片，列出发布阻断项。',
    '2. 检查通过后生成 MDX 与静态图片，并列出交付文件。',
    '3. 报告当前发布阶段、已完成的验证，以及构建、部署和公开链接检查中尚未完成的工作。',
    '',
    '这次只准备本地发布包；不要把生成文件说成已上线。',
  ].join('\n'),
  status:
    '仓库已公开。脚本可准备发布文件或写入已检出的博客仓库；构建、部署和公开 URL 检查仍需分别完成，公众号导入包也不代表已经群发。',
}
