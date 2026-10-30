# SEO and GEO Hardening Implementation Plan

> **For agentic workers:** Execute inline in this session. The user approved the prioritized audit in the current conversation.

**Goal:** Make public URLs, metadata, and sitemap entries consistent, then improve article attribution and topic discovery.

**Architecture:** Give each page its own canonical and Open Graph URL through the existing metadata helper or its route metadata. Generate sitemap entries from the same public slugs as the pages. Keep the existing content model and add a small curated topic entry point on the blog index.

**Tech Stack:** Next.js 15 App Router, Contentlayer2, MDX, Node test runner.

**Spec:** `docs/site-structure.md`, plus the user-approved SEO/GEO audit in this conversation.

## Global Constraints

- Preserve unrelated uncommitted work and the current Agentic Practice copy.
- Keep `/about` article text in English.
- Use the public route path as the source of canonical and Open Graph URLs.
- Do not claim indexing or AI citations without Search Console or Bing Webmaster data.

---

### Task 1: Rendered SEO regression checks

**Files:** Create `tests/seo-output.test.mjs`.

- [x] Write tests against generated `.next/server/app/*.html` and `sitemap.xml.body` for self-canonical URLs, article Open Graph URL, valid sitemap routes, and absolute BlogPosting image and author URL.
- [x] Run `node --test tests/seo-output.test.mjs`; confirm failures match the current rendered defects.

### Task 2: Page metadata and canonical URLs

**Files:** Modify `app/layout.tsx`, `app/page.tsx`, `app/seo.tsx`, `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/page/[page]/page.tsx`, `app/blog/[...slug]/page.tsx`, `app/tags/page.tsx`, `app/tags/[tag]/page.tsx`, `app/read/page.tsx`.

- [x] Remove the root canonical default. Add route-specific canonical and Open Graph URLs, including paginated pages.
- [x] Give the home page a descriptive search title, while keeping the visible ApFramework brand.
- [x] Give the blog and about pages distinct descriptions.
- [x] Build and rerun the rendered SEO checks.

### Task 3: Sitemap accuracy

**Files:** Modify `app/sitemap.ts` and extend `tests/seo-output.test.mjs`.

- [x] Generate tag URLs using the same slug function as the tag pages; remove the non-existent author route.
- [x] Stop assigning the build date as the modification date of unchanged static pages. Retain article and note dates.
- [x] Build and verify every sitemap URL maps to a generated page.

### Task 4: Article attribution and topic discovery

**Files:** Modify `contentlayer.config.ts`, `app/blog/[...slug]/page.tsx`, and `app/blog/page.tsx`.

- [x] Use an absolute, displayed article image when available, and an absolute fallback otherwise.
- [x] Add the real about-page URL to the default author in BlogPosting data.
- [x] Add concise topic links for agent architecture, context engineering, and Agent Skills to the blog index.
- [x] Build, run all SEO checks, and inspect representative rendered pages.
