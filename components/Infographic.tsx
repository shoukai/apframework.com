'use client'

import { useEffect, useRef } from 'react'
import { Infographic as AntVInfographic, registerResourceLoader, loadSVGResource } from '@antv/infographic'

// Register a custom resource loader to handle icon loading from Iconify
// This prevents "Failed to fetch" errors when the default AntV icon service is unreachable
let loaderRegistered = false
if (typeof window !== 'undefined' && !loaderRegistered) {
  registerResourceLoader(async (config) => {
    // Check if it's a custom source with string data (which AntV defaults to for simple icon strings)
    if (config.source === 'custom' && typeof config.data === 'string') {
      const data = config.data
      // Simple heuristic: "collection/name" format (e.g., "mingcute/save-2-fill")
      if (data.includes('/')) {
        const [collection, name] = data.split('/')
        if (collection && name) {
          try {
            const res = await fetch(`https://api.iconify.design/${collection}/${name}.svg`)
            if (res.ok) {
              const svg = await res.text()
              return loadSVGResource(svg)
            }
          } catch (e) {
            console.warn(`[Infographic] Failed to load icon ${data} from Iconify:`, e)
          }
        }
      } else {
        // Handle built-in assets (no slash) like "mobile-photos", "code-thinking"
        // AntV tries to fetch these from their server which fails.
        // We provide a fallback placeholder to prevent the crash.
        console.warn(`[Infographic] Intercepted built-in asset request: ${data}. Using placeholder to prevent crash.`)
        // A simple generic placeholder SVG (a rounded rectangle with a dot)
        const placeholderSvg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="60" height="60" rx="8" fill="#f0f0f0" stroke="#d9d9d9" stroke-width="2"/>
          <circle cx="32" cy="32" r="12" fill="#bfbfbf"/>
        </svg>`
        return loadSVGResource(placeholderSvg)
      }
      
      // If we reached here for a slashed path but failed to fetch, also return placeholder
      // to prevent AntV from falling back to its own server
      const errorSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#ff4d4f"/>
      </svg>`
      return loadSVGResource(errorSvg)
    }
    return null
  })
  loaderRegistered = true
}

interface InfographicProps {
  spec: string
  width?: string | number
  height?: string | number
  editable?: boolean
  className?: string
}

export default function Infographic({
  spec,
  width = '100%',
  height = 400,
  editable = false,
  className,
}: InfographicProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Use AntVInfographic type instead of any for chart reference
  const chartRef = useRef<AntVInfographic | null>(null)

  useEffect(() => {
    if (!containerRef.current || !spec) return

    // Initialize if not already done
    if (!chartRef.current) {
      chartRef.current = new AntVInfographic({
        container: containerRef.current,
        // AntV Infographic types might expect number for width/height, 
        // but it often accepts string (like '100%') in practice or via specific type casting.
        // Casting to unknown then specific type or keeping as any if types are loose.
        // To fix lint error properly, we cast to compatible type if known, or unknown first.
        width: width as unknown as number,
        height: height as unknown as number,
        editable,
      })
    }

    // Render the spec
    try {
      chartRef.current.render(spec)
    } catch (error) {
      console.error('Failed to render Infographic:', error)
    }

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [spec, width, height, editable])

  return <div ref={containerRef} style={{ width, height }} className={className} />
}
