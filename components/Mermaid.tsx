'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
})

interface MermaidProps {
  chart: string
  className?: string
}

const Mermaid = ({ chart, className }: MermaidProps) => {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const id = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`).current

  useEffect(() => {
    if (chart) {
      mermaid
        .render(id, chart)
        .then((renderResult) => {
          setSvg(renderResult.svg)
          setError('')
        })
        .catch((err) => {
          console.error('Mermaid render error:', err)
          setError('Failed to render Mermaid chart')
          // Mermaid error handling often writes to the DOM, so we might need to cleanup
        })
    }
  }, [chart, id])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div
      className={`mermaid-chart flex justify-center ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Mermaid
