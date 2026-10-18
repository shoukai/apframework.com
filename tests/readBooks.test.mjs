import assert from 'node:assert/strict'
import test from 'node:test'
import { getBooksForYear, getReadingYears } from '../lib/readBooks.ts'

const books = [
  { id: 1, title: 'First', readDate: '2024-02-01', rating: 4, doubanUrl: null },
  { id: 2, title: 'Earlier', readDate: '2023-12-01', rating: null, doubanUrl: null },
  { id: 3, title: 'Latest', readDate: '2024-11-02', rating: 5, doubanUrl: null },
]

test('reading years count records and sort newest first', () => {
  assert.deepEqual(getReadingYears(books), [
    { year: 2024, count: 2 },
    { year: 2023, count: 1 },
  ])
})

test('year pages show only that year, in reading-date order', () => {
  assert.deepEqual(
    getBooksForYear(books, 2024).map((book) => book.id),
    [3, 1]
  )
  assert.deepEqual(
    getBooksForYear(books).map((book) => book.id),
    [3, 1, 2]
  )
})
