'use client'

import type { ReadingYear } from '@/lib/readBooks'
import { useRouter } from 'next/navigation'

export default function YearSelect({
  years,
  selectedYear,
}: {
  years: ReadingYear[]
  selectedYear?: number
}) {
  const router = useRouter()

  return (
    <div className="w-36 sm:w-40">
      <label
        htmlFor="reading-year"
        className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400"
      >
        年份
      </label>
      <select
        id="reading-year"
        aria-label="选择阅读年份"
        value={selectedYear ?? 'all'}
        onChange={(event) => {
          const year = event.currentTarget.value
          router.push(year === 'all' ? '/read/list' : `/read/list/${year}`)
        }}
        className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="all">全部年份</option>
        {years.map(({ year }) => (
          <option key={year} value={year}>
            {year} 年
          </option>
        ))}
      </select>
    </div>
  )
}
