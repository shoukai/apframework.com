import { visit } from 'unist-util-visit'

export function remarkCodeCharts() {
  return (tree) => {
    visit(tree, 'code', (node: any, index, parent: any) => {
      if (node.lang === 'infographic') {
        const spec = node.value
        const mdxNode = {
          type: 'mdxJsxFlowElement',
          name: 'Infographic',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'spec', value: spec },
          ],
          children: [],
        }
        parent.children.splice(index, 1, mdxNode)
      } else if (node.lang === 'mermaid') {
        const chart = node.value
        const mdxNode = {
          type: 'mdxJsxFlowElement',
          name: 'Mermaid',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'chart', value: chart },
          ],
          children: [],
        }
        parent.children.splice(index, 1, mdxNode)
      }
    })
  }
}
