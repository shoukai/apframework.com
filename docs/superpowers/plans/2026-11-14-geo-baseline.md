# GEO Baseline Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans or superpowers:subagent-driven-development task by task.

**Goal:** Establish a reproducible search and acquisition baseline, and make the static site's HTTP responses match its canonical URLs.

**Architecture:** Aliyun Nginx serves the existing Next.js static export. Route changes live in Nginx includes; no rebuild or DNS change is needed to apply them to an existing export with the matching target pages.

**Tech stack:** Nginx, Next.js 15 static export, Google Search Console, GA4, Baidu Tongji.

**Spec:** [Search Console checklist](../../seo/2026-11-01-search-console-checklist.md) and the November 14 GEO audit.

## Deployment checklist

1. Reproduce the production symptom with the existing export: HTTPS on `www`, HTTP, an unrecognized path, and known misencoded tags currently serve a page with status 200.
2. Validate the two Nginx includes against the existing `out/` files using local Nginx. Check host and scheme redirects, query preservation, tag redirects, proper 404s and successful requests for real pages and assets.
3. Open the Aliyun server and inspect the effective config with `nginx -T`. Back up the relevant vhosts. Confirm that the existing HTTPS certificate covers both names and that the document root contains `404.html` and the tag redirect destinations.
4. In the port 80 vhost for both names and the HTTPS `www.apframework.com` vhost, include `canonical-redirect.conf`. Keep the existing certificate and ACME handling; if ACME HTTP challenges are served locally, include the redirect inside the ordinary `location /` so the ACME location remains reachable.
5. In the HTTPS `apframework.com` vhost, merge `static-routes.conf` with the existing routing. Replace the existing generic fallback, keep the existing static root, TLS and headers, and check that specialized locations do not still fall back to `/index.html`. Do not add a second `location /` or a conflicting `error_page 404`.
6. Run `nginx -t`, reload only after it passes, then run the checks below against the public site. If a valid page, asset or redirect fails, restore the backed up vhosts and reload.

| Request | Expected |
| --- | --- |
| `http://apframework.com/blog?from=geo`, `http://www.apframework.com/blog?from=geo`, `https://www.apframework.com/blog?from=geo` | 301 to `https://apframework.com/blog?from=geo` |
| `https://apframework.com/tags/ai-agents` | 301 to `https://apframework.com/tags/ai-agent` |
| `https://apframework.com/tags/%C3%A6%C2%A8%C2%A1%C3%A5%C2%9E%C2%8B%C3%A9%C2%AA%C2%8C%C3%A8%C2%AF%C2%81?q=1` | 301 to `https://apframework.com/tags/%E6%A8%A1%E5%9E%8B%E9%AA%8C%E8%AF%81?q=1` |
| `/geo-nonexistent-url-check`, `/archive`, an unknown tag | 404 with the site's 404 page |
| `/`, `/blog`, `/blog/`, `/sitemap.xml`, `/robots.txt`, `/tags/ai-agent/feed.xml` | 200 |

Use `curl -sSI '<url>'` to check status and Location. Use a GET on an unknown route to confirm the error body. After publishing, inspect the primary URLs in Search Console and recheck the HTTP, www and misencoded versions.

## Measurement baseline

- **Search Console, 2026-11-14:** The performance chart showed data for October 31–November 10: 116 clicks, 5,590 impressions, 2.1% CTR and average position 7.2. Top pages: Mem0 (22 clicks), DeepAgents (13) and Chrome DevTools MCP (8). The index report updated November 9 showed 342 indexed URLs and 622 not indexed across all known URLs. Of the latter, 461 were alternate URLs with an appropriate canonical. These counts include URLs outside the current sitemap.
- **GA4, October 17–November 13:** 12,787 sessions; Direct 11,808, with 1.81% engaged and 1 second average engagement. `/archive` on the main hostname had 197 Direct sessions at 0 seconds, and some misencoded tag rows on the main hostname had a similar pattern. The external hostname `p3.rivergame.net` appeared in Direct (52 sessions landing on `/`). These observations warrant checking the tag and logs; they do not establish which requests were automated.
- **Reporting:** A temporary GA4 report filter for `apframework.com` and `www.apframework.com` reduced the October 17–November 13 baseline to 8,662 sessions, with 7,818 Direct (90.26%, 2.33% engaged). Gemini remained at 25 sessions (4 engaged). Report `tongji.baidu.com / referral` separately from organic search (58 sessions, 30 engaged even after the hostname filter). For future comparisons use the same hostname scope, which requires no permanent GA4 data filter. Before altering collection, compare origin access logs for `/archive` and malformed tags with GA4, and verify where the Google tag is actually installed.
- **Search Console link:** Link the verified domain property to the existing ApFramework web stream once approved. Google says the resulting data can be viewed by everyone with access to the GA4 property. Verify the associated search reports after the link.
- **Legacy GitHub Pages:** The sample of article paths on the old homepage did not have verified one-to-one equivalents in the current site. Keep that archive reachable; use a redirect or per-page canonical only after a replacement is verified. The new site's Nginx cannot redirect a request to the `github.io` hostname.

References: [Next.js static export](https://nextjs.org/docs/15/app/guides/static-exports), [Nginx core directives](https://nginx.org/en/docs/http/ngx_http_core_module.html), [GA4 and Search Console integration](https://support.google.com/analytics/answer/10737381).
