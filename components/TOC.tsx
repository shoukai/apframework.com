"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

type Heading = {
  id: string
  text: string
  level: number
}

type TOCProps = {
  toc: Heading[]
}

const TOC = ({ toc }: TOCProps) => {
  const [activeId, setActiveId] = useState<string>('')
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({})

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry
      })

      // Get all headings that are currently visible on the page
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const entry = headingElementsRef.current[key]
        if (entry.isIntersecting) visibleHeadings.push(entry)
      })

      // If there are visible headings, set the active ID to the first one
      if (visibleHeadings.length > 0) {
        // Sort by their position in the document (top to bottom)
        visibleHeadings.sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top
        })
        // Set the active ID to the first visible heading
        setActiveId(visibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
    headingElements.forEach((element) => observer.observe(element))

    return () => {
      headingElements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  // Function to determine the left padding and styling based on heading level
  const getHeadingStyle = (level: number) => {
    const base = 'border-l-2 py-1 pl-3 text-sm transition-colors duration-200'
    
    if (level === 2) return `${base} font-medium`
    if (level === 3) return `${base} pl-5 text-xs`
    if (level === 4) return `${base} pl-7 text-xs opacity-90`
    if (level === 5) return `${base} pl-9 text-xs opacity-80`
    return `${base} pl-11 text-xs opacity-70`
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">目录大纲</h2>
      <div className="max-h-[calc(100vh-8rem)] overflow-auto">
        <div className="flex flex-col space-y-2 text-sm">
          {toc.map((heading, index) => (
            <a
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
              className={`${getHeadingStyle(heading.level)} ${
                activeId === heading.id
                  ? 'border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
              } line-clamp-2`}
              onClick={(e) => {
                e.preventDefault()
                try {
                  // Try to find the element by ID directly, which is more reliable than querySelector
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }
                } catch (error) {
                  console.error('Error scrolling to heading:', error)
                }
              }}
            >
              {heading.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TOC
