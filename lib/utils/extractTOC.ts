import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

type Heading = {
  id: string
  text: string
  level: number
}

export function extractTOC(content: string): Heading[] {
  const headings: Heading[] = []

  const tree = remark().parse(content)

  visit(tree, 'heading', (node) => {
    const text = toString(node)
    // Create an ID from the heading text (similar to what rehype-slug does)
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    
    headings.push({
      id,
      text,
      level: node.depth,
    })
  })

  return headings
}
