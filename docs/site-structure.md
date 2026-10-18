# 站点栏目结构

本站按内容归属划分栏目。首页和技术博客以 AI 技术为主；阅读是独立栏目。哲学栏目只保留规划，当前不提供公开页面、导航项或 RSS。

| 栏目     | 页面                              | 内容来源                   | RSS              |
| -------- | --------------------------------- | -------------------------- | ---------------- |
| 技术博客 | `/blog`、`/blog/...`              | `data/blog/**/*.mdx`       | `/blog/feed.xml` |
| 阅读笔记 | `/read`、`/read/notes/...`        | `data/read/notes/**/*.mdx` | `/read/feed.xml` |
| 阅读记录 | `/read/list`、`/read/list/{year}` | `config/read-books.json`   | 无独立 RSS       |

原有的 `/feed.xml` 继续提供技术博客文章，供既有订阅者使用。阅读 RSS 只收录公开的读书笔记，不收录每条读书记录。栏目之间可以互相链接，但文章只归属一个栏目，因此阅读笔记不出现在 `/blog` 列表或技术博客 RSS 中。

## 阅读数据

`config/read-books.json` 是阅读记录的唯一渲染数据源。每条记录包含稳定的 `id`、`title`、`readDate`（`YYYY-MM-DD`）、`rating`（个人评分，1 到 5；未知为 `null`）和可为空的 `doubanUrl`。页面按 `readDate` 自动归入年份，添加新年份无需新增页面文件。

历史数据从 `public/read/bookrack.json` 迁入，旧文件仍保留作原始记录，不再供阅读页面使用。旧数据中的 `personalScore: "0.0"` 转为未评分。2026-10-17 从豆瓣「读过」列表补齐为 999 条，沿用已有记录的 ID 和书名，以豆瓣页面显示的日期、评分更新记录；豆瓣已失效的《看见》沿用旧记录。豆瓣链接只用作书籍来源链接；站点构建和访客浏览都读取本地配置，不实时请求豆瓣，也不会自动同步新读过的书。

一篇新笔记放在 `data/read/notes/`，使用 MDX frontmatter：

```yaml
---
title: '书名与笔记标题'
date: '2026-10-17'
summary: '一句摘要'
bookId: 349
---
```

`bookId` 可选；填写后，阅读列表中相应书籍会出现“阅读笔记”链接。笔记的发表日期与书籍的阅读日期分别保存，互不覆盖。将 `draft: true` 写入 frontmatter 可让笔记退出公开列表、文章路由和 RSS。

## 哲学栏目（暂不启用）

未来启用时，建议使用 `data/philosophy/**/*.mdx`、`/philosophy`、`/philosophy/...` 和 `/philosophy/feed.xml`。先建立独立内容集合与订阅源，再加入导航和站点地图。目前不创建这些公开入口，也不放占位文章。
