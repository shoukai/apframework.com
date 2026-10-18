import Link from '@/components/Link'
import YearSelect from '@/components/read/YearSelect'
import booksData from '@/config/read-books.json'
import { getBooksForYear, getReadingYears, type ReadBook } from '@/lib/readBooks'
import { allReadNotes } from 'contentlayer/generated'

const books = booksData as ReadBook[]

export default function ReadingList({ selectedYear }: { selectedYear?: number }) {
  const years = getReadingYears(books)
  const visibleYears = selectedYear ? years.filter(({ year }) => year === selectedYear) : years
  const yearRange = `${years[years.length - 1].year} 至 ${years[0].year} 年`
  const notePaths = new Map(
    allReadNotes
      .filter((note) => !note.draft && note.bookId !== undefined)
      .map((note) => [note.bookId, note.path])
  )

  return (
    <div className="pb-10">
      <header className="pt-6">
        <Link
          href="/read"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          &larr; 阅读
        </Link>
        <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          我的阅读列表
        </h1>
        <div aria-label="阅读统计" className="mt-7 grid max-w-sm grid-cols-2 gap-6 pb-9">
          <div>
            <p className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-gray-100">
              {books.length}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">阅读记录</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-gray-100">
              {years.length}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">阅读年份</p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{yearRange}</p>
          </div>
        </div>
      </header>

      <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">书目</h2>
        <YearSelect years={years} selectedYear={selectedYear} />
      </div>

      {visibleYears.map(({ year, count }) => (
        <section key={year} aria-labelledby={`reading-year-${year}`} className="pt-7">
          <h3
            id={`reading-year-${year}`}
            className="flex items-baseline justify-between gap-4 border-b border-gray-200 pb-3 text-xl font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100"
          >
            <span>{year} 年</span>
            <span className="whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
              {count} 本
            </span>
          </h3>
          <ul>
            {getBooksForYear(books, year).map((book) => {
              const notePath = notePaths.get(book.id)
              return (
                <li
                  key={book.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-b border-gray-100 py-3.5 dark:border-gray-800 sm:grid-cols-[7.5rem_minmax(0,1fr)_5.5rem] sm:items-baseline"
                >
                  <time
                    dateTime={book.readDate}
                    className="col-start-1 row-start-2 mt-1 text-xs text-gray-500 dark:text-gray-400 sm:col-start-1 sm:row-start-1 sm:mt-0 sm:text-sm"
                  >
                    {book.readDate}
                  </time>
                  <div className="col-start-1 row-start-1 min-w-0 sm:col-start-2">
                    {book.doubanUrl ? (
                      <a
                        href={book.doubanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words font-medium text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                      >
                        {book.title}
                      </a>
                    ) : (
                      <span className="break-words font-medium text-gray-900 dark:text-gray-100">
                        {book.title}
                      </span>
                    )}
                    {notePath && (
                      <Link
                        href={`/${notePath}`}
                        className="ml-3 whitespace-nowrap text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        阅读笔记
                      </Link>
                    )}
                  </div>
                  <span
                    className="col-start-2 row-span-2 self-center whitespace-nowrap text-right text-sm tabular-nums text-gray-600 dark:text-gray-300 sm:col-start-3 sm:row-span-1"
                    aria-label={
                      book.rating === null ? '未评分' : `我的评分 ${book.rating} 分，满分 5 分`
                    }
                  >
                    {book.rating === null ? '未评分' : `${book.rating}/5`}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
