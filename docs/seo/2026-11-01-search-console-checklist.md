# Search Console 核对清单

此清单用于发布后检查。当前仓库没有 Search Console 查询凭据，以下均为待核对项目，不是实际收录或流量结果。

## 发布产物

1. 构建静态站点并运行仓库测试。核对首页显示「Agent Production Framework」和「AI 智能体架构设计与生产落地」。
2. 部署后检查线上首页、`/robots.txt` 和 `/sitemap.xml` 返回 HTTP 200。核对 robots 中的 Sitemap 地址，以及线上 XML 是否含新发布的文章和两个专题。以线上响应确认部署版本。
3. 抽查下列五个 HTML URL，在网址检查中对照「测试实际网址」与已编入索引的版本，记录最近抓取时间、抓取是否成功、声明的 canonical 与 Google 选定的 canonical。首页若仍显示旧标题，先对比实时抓取的 HTML 和已编入索引的版本。

## 首轮抽查

- `https://apframework.com/`
- `https://apframework.com/tags/ontology`
- `https://apframework.com/blog/essay/2026-11-16-enterprise-ai-governance-control-mapping`
- `https://apframework.com/blog/essay/2026-05-31-ontology-vs-ddd`
- `https://apframework.com/blog/essay/2025-06-08-LangGraph-Tutorials`

OpenFGA 系列发布后，再抽查概览和实测文章是否进入 sitemap，以及两篇的规范 URL 是否与页面一致。检查 `/tags/openfga` 时按实际已发布篇数核对 robots 和 sitemap。

## 扩展抽查

- `https://apframework.com/sitemap.xml`
- `https://apframework.com/blog`
- `https://apframework.com/tags/ai-agent`
- `https://apframework.com/tags/context-engineering`
- `https://apframework.com/tags/agent-evaluation`
- `https://apframework.com/blog/essay/2026-10-24-thin-orchestrator-production-agent-orchestration`
- `https://apframework.com/blog/essay/2026-10-27-agentcore-production-evaluation-framework`
- `https://apframework.com/blog/essay/2026-10-29-graphify-codebase-knowledge-graph`
- `https://apframework.com/blog/essay/2026-11-01-ai-native-analytics-meta`
- `https://apframework.com/read/notes/2026-11-01-apocalypse-product-notes`

## 发布后检查

1. 提交或重新读取 sitemap；在“网页索引”查看新文章和专题页是否被发现、抓取及选为规范 URL。
2. 用 URL 检查工具抽查上面的页面；核对用户声明的规范 URL、Google 选择的规范 URL、抓取状态。旧的 `/tags/ai-agents`、`/tags/智能体`、`/tags/上下文工程` 应永久跳转到规范标签页。
3. 低于三篇文章的标签页保留站内导航，但应返回 `noindex,follow`，且不在 sitemap 中。重点检查一个样本页面及 sitemap。
4. 在搜索结果表现中按“页面”和“查询”记录发布前后可比的 28 天窗口：展示、点击、CTR、平均位置。新页面没有历史窗口时记录为“暂无基线”，不要把零或缺失解读为下降。
5. 若账号提供 AI 搜索表现报告，再按上述页面记录对应数据。普通自然搜索表现不能直接当作 AI 引用次数。
6. 检查预览抓取是否读取到文章专属的 PNG 分享图，并核对图像、标题、摘要与正文是否一致。

## 内容复核

- 对公开案例解读，持续标注原文事实、本站分析、本站实际验证；新实验只写可复查的环境、步骤、版本、结果和边界。
- 每次新增文章时优先复用规范标签；只有主题页能提供清楚的主题范围和阅读价值时，才考虑将新标签作为重点收录入口。

参考：[Google AI 搜索指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)、[Sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。
