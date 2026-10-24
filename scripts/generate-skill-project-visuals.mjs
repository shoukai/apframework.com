// Run with: node scripts/generate-skill-project-visuals.mjs
// These are editorial diagrams, not screenshots of a Skill interface.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const visuals = [
  {
    slug: 'open-context-book-reader',
    file: 'reading-flow',
    accent: '#595fae',
    tint: '#ededfb',
    source: '非虚构图书',
    sourceTitle: '读完一本书，看清全貌',
    heading: '从章节走向全书结构',
    steps: [
      ['读前定位', '明确问题与阅读动机'],
      ['阅读地图', '串起章节与核心论证'],
      ['精选笔记', '留下原文位置与疑问'],
    ],
    footer: 'OPEN CONTEXT BOOK READER',
  },
  {
    slug: 'open-context-forge-vault-maintainer',
    file: 'knowledge-flow',
    accent: '#168064',
    tint: '#e0f4ed',
    source: '文章来源',
    sourceTitle: '从来源走向长期知识',
    heading: '让每条知识可以回查',
    steps: [
      ['原文快照', '保留来源与版本'],
      ['证据分析', '核对旧笔记与新主张'],
      ['知识笔记', '写下可复用的判断'],
    ],
    footer: 'VAULT MAINTAINER',
  },
  {
    slug: 'open-context-forge-tech-article-writer',
    file: 'writing-flow',
    accent: '#a96532',
    tint: '#f8ece0',
    source: '指定知识库',
    sourceTitle: '从证据写出自己的判断',
    heading: '把知识组织成文章',
    steps: [
      ['证据与立场', '分清来源和作者判断'],
      ['文章大纲', '安排论点与推进关系'],
      ['审稿成文', '核对事实并修订表达'],
    ],
    footer: 'TECH ARTICLE WRITER',
  },
  {
    slug: 'open-context-forge-article-publisher',
    file: 'publishing-flow',
    accent: '#ad3d72',
    tint: '#f9e7f0',
    source: '已审稿文章',
    sourceTitle: '从成稿走向渠道文件',
    heading: '准确记录发布阶段',
    steps: [
      ['公开性检查', '排除草稿与资源缺口'],
      ['渠道导出', '生成所需文章与图片'],
      ['发布核验', '区分备好与真正上线'],
    ],
    footer: 'ARTICLE PUBLISHER',
  },
]

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function makeSvg(visual) {
  const [first, second, third] = visual.steps
  const step = ([title, description], number, y) => `
    <circle cx="1262" cy="${y}" r="26" fill="${visual.accent}"/>
    <text x="1247" y="${y + 9}" fill="#fff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="23" font-weight="700">${number}</text>
    <text x="1310" y="${y - 8}" fill="#fff" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="32" font-weight="650">${escapeXml(title)}</text>
    <text x="1310" y="${y + 30}" fill="#b9c5cf" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="22">${escapeXml(description)}</text>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1865" height="960" viewBox="0 0 1865 960" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(visual.sourceTitle)} · 流程示意</title>
  <desc id="desc">左侧显示来源材料，右侧依次显示${visual.steps.map(([title]) => escapeXml(title)).join('、')}。</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f7f5"/><stop offset="1" stop-color="#e6eaed"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#273341"/><stop offset="1" stop-color="#17212c"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#24303b" flood-opacity=".12"/></filter>
  </defs>
  <rect width="1865" height="960" fill="url(#background)"/>
  <circle cx="151" cy="102" r="205" fill="${visual.tint}" opacity=".9"/>
  <circle cx="1757" cy="873" r="260" fill="#dce8ec" opacity=".8"/>
  <g filter="url(#shadow)">
    <rect x="64" y="58" width="1737" height="844" rx="32" fill="#fff"/>
    <path d="M96 58h1673a32 32 0 0 1 32 32v66H64V90a32 32 0 0 1 32-32Z" fill="#f9fafb"/>
    <path d="M64 156h1737" stroke="#e6e9ed" stroke-width="2"/>
    <circle cx="113" cy="108" r="10" fill="${visual.accent}" opacity=".55"/>
    <circle cx="147" cy="108" r="10" fill="#e6cf94"/>
    <circle cx="181" cy="108" r="10" fill="#b6d4c7"/>
    <text x="252" y="119" fill="#52606e" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="29" font-weight="600">${escapeXml(visual.source)} · 工作流程示意</text>
    <rect x="118" y="207" width="996" height="638" rx="22" fill="#fcfcfb" stroke="#e4e6e8" stroke-width="2"/>
    <rect x="157" y="248" width="218" height="44" rx="22" fill="${visual.tint}"/>
    <text x="188" y="278" fill="${visual.accent}" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="22" font-weight="600">${escapeXml(visual.source)}</text>
    <text x="160" y="361" fill="#25313d" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="47" font-weight="700">${escapeXml(visual.sourceTitle)}</text>
    <rect x="160" y="400" width="646" height="17" rx="8.5" fill="#d5dce1"/>
    <rect x="160" y="441" width="783" height="17" rx="8.5" fill="#e0e5e8"/>
    <rect x="160" y="482" width="719" height="17" rx="8.5" fill="#e0e5e8"/>
    <rect x="147" y="536" width="871" height="107" rx="14" fill="${visual.tint}"/>
    <rect x="147" y="536" width="8" height="107" rx="4" fill="${visual.accent}"/>
    <rect x="179" y="567" width="720" height="17" rx="8.5" fill="${visual.accent}" opacity=".52"/>
    <rect x="179" y="601" width="492" height="15" rx="7.5" fill="${visual.accent}" opacity=".28"/>
    <rect x="160" y="689" width="758" height="17" rx="8.5" fill="#e0e5e8"/>
    <rect x="160" y="730" width="648" height="17" rx="8.5" fill="#e0e5e8"/>
    <rect x="160" y="771" width="369" height="17" rx="8.5" fill="#e0e5e8"/>
    <path d="M1114 524h53" stroke="${visual.accent}" stroke-width="5" stroke-linecap="round"/>
    <path d="m1150 506 20 18-20 18" fill="none" stroke="${visual.accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="1185" y="207" width="561" height="638" rx="22" fill="url(#panel)"/>
    <text x="1231" y="277" fill="#e7edf1" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="25" font-weight="600">${escapeXml(visual.heading)}</text>
    <path d="M1232 311h466M1232 455h466M1232 600h466M1232 760h466" stroke="#44505e" stroke-width="2"/>
    ${step(first, '01', 382)}
    ${step(second, '02', 527)}
    ${step(third, '03', 672)}
    <text x="1232" y="803" fill="#899aa8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" letter-spacing="2">${escapeXml(visual.footer)}</text>
  </g>
</svg>`
}

for (const visual of visuals) {
  const directory = path.join('public', 'static', 'images', 'projects', visual.slug)
  await mkdir(directory, { recursive: true })
  const svg = makeSvg(visual)
  await writeFile(path.join(directory, `${visual.file}.svg`), svg)
  await sharp(Buffer.from(svg))
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(directory, `${visual.file}.webp`))
}
