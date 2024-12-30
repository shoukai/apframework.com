'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

export default function Giscus() {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark' ? 'transparent_dark' : 'light'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'shoukai/apframework.com')
    script.setAttribute('data-repo-id', '897344566')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', '43354423')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById('giscus-comments')
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById('giscus-comments')
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme])

  // 主题改变时重新加载评论
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) return
    LoadComments()
  }, [LoadComments])

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && (
        <button onClick={LoadComments}>加载评论</button>
      )}
      <div id="giscus-comments" className="giscus-frame-container" />
    </div>
  )
}
