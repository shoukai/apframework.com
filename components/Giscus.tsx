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
    script.setAttribute('data-repo', 'shoukai/apframework.com') // 替换为你的 GitHub 用户名/仓库名
    script.setAttribute('data-repo-id', '897344566') // GitHub repository ID
    script.setAttribute('data-category', 'message') // 替换为你想使用的 discussion 分类
    script.setAttribute('data-category-id', '43354423') // 替换为分类 ID
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('data-lang', 'zh-CN')
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
      <div className="giscus" id="giscus-comments" />
    </div>
  )
}
