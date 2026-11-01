export const MIN_INDEXABLE_TAG_POSTS = 3

export function isIndexableTag(tag: string, counts: Record<string, number>): boolean {
  return (counts[tag] || 0) >= MIN_INDEXABLE_TAG_POSTS
}
