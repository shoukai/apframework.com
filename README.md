# ApFramework

[ApFramework](https://apframework.com/) 是 Shoukai Huang 的个人站点，记录 AI 智能体架构与实践、软件工程、开源项目和阅读思考。

主站部署在阿里云服务器，站点页面保留所需的 ICP 与公安备案信息。本 GitHub 仓库保存源码和内容，并通过 GitHub Actions 校验构建；工作流不向生产服务器或 GitHub Pages 发布。

## 技术与内容

- Next.js 15、React 18、TypeScript、Tailwind CSS 3
- Contentlayer2 + MDX 管理文章，Pliny 提供博客相关组件
- 静态导出生成 `out/`，用于服务器侧发布

| 栏目 | 内容位置 | 公开路径 |
| --- | --- | --- |
| 技术博客 | `data/blog/**/*.mdx` | `/blog` |
| 阅读笔记 | `data/read/notes/**/*.mdx` | `/read/notes/...` |
| 阅读记录 | `config/read-books.json` | `/read/list` |
| 项目介绍 | `data/projectsData.ts` 等 | `/projects` |

栏目、RSS 和阅读数据的具体约定见 [站点结构](docs/site-structure.md)。

## 本地开发

使用 [`.nvmrc`](.nvmrc) 指定的 Node.js 22.22.1。仓库内置 Yarn 3.6.1，因此以下命令不依赖全局安装的 Yarn：

```sh
node .yarn/releases/yarn-3.6.1.cjs install --immutable
cp .env.example .env.local
node .yarn/releases/yarn-3.6.1.cjs dev
```

`.env.local` 可选。[`.env.example`](.env.example) 仅列出当前站点使用的可选 Giscus 与 Umami 配置；不要提交实际密钥或站点私有配置。

新增技术文章放在 `data/blog/` 的对应子目录；阅读笔记放在 `data/read/notes/`。两类内容都使用 MDX frontmatter，至少提供 `title` 和 `date`，建议补充 `summary`。技术文章可填写 `tags` 和 `images`；阅读笔记可填写 `bookId` 关联阅读记录。图片等公开资源放在 `public/static/`。可用 `draft: true` 暂停公开。

## 构建与校验

主站采用静态导出。在仓库根目录运行：

```sh
EXPORT=1 UNOPTIMIZED=1 node .yarn/releases/yarn-3.6.1.cjs build
node .yarn/releases/yarn-3.6.1.cjs test
```

`build` 生成 `out/`，随后由 `scripts/postbuild.mjs` 生成 RSS。测试中的页面与 SEO 检查读取本次构建产物，因此请先构建再测试。

[`ci.yml`](.github/workflows/ci.yml) 在推送到 `main`、提交拉取请求和手动触发时运行相同的静态构建与测试。它只提供构建反馈；阿里云服务器上的发布流程独立于本仓库的 GitHub Actions。

静态导出不会执行 Next.js 的 API 路由和 middleware，也不会自动应用 `next.config.js` 中的 redirects 或 headers。需要在服务器生效的跳转和响应头应由服务器配置承接；相关配置变更须单独核对线上行为。

## 来源与许可

本站基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 改造。原项目的版权与 MIT 许可见 [LICENSE](LICENSE)。
