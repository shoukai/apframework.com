export interface ReadBook {
  id: number
  title: string
  readDate: string
  rating: number | null
  doubanUrl: string | null
}

export interface ReadingYear {
  year: number
  count: number
}

export function getReadingYears(books: ReadBook[]): ReadingYear[] {
  const counts = new Map<number, number>()

  for (const book of books) {
    const year = Number(book.readDate.slice(0, 4))
    counts.set(year, (counts.get(year) || 0) + 1)
  }

  return [...counts].map(([year, count]) => ({ year, count })).sort((a, b) => b.year - a.year)
}

export function getBooksForYear(books: ReadBook[], year?: number): ReadBook[] {
  return books
    .filter((book) => year === undefined || Number(book.readDate.slice(0, 4)) === year)
    .sort((a, b) => b.readDate.localeCompare(a.readDate))
}
