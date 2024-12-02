"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";

interface Book {
  id: number;
  name: string;
  bookLinkUrl: string | null;
  bookImageUrl: string | null;
  readTime: string;
  publishTime: string;
  doubanScore: string;
  personalScore: string;
  tags: string;
  notes: string[];
  yearMonthIndex: number;
  yearIndex: number;
}

interface MonthShelf {
  monthIndex: number;
  books: Book[];
}

interface ShelfYear {
  yearIndex: number;
  monthShelf: MonthShelf[];
}

const Bookrack: React.FC = () => {
  const [shelfYearList, setShelfYearList] = useState<ShelfYear[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleBooks, setVisibleBooks] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch("http://localhost:8081/book-self/list");
        const res = await fetch("/read/bookrack.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setShelfYearList(data.data.shelfYearList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bookId = Number(entry.target.getAttribute('data-book-id'));
            setVisibleBooks((prev) => new Set([...prev, bookId]));
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {shelfYearList.map((year) => (
        <div key={year.yearIndex} className="mb-10">
          <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 border-gray-200 text-gray-800 tracking-tight flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">{year.yearIndex}</span>
            <span className="ml-3 text-2xl text-gray-600">年度阅读</span>
          </h2>
          {year.monthShelf.map((month) => (
            <div key={month.monthIndex} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 pl-3 border-l-4 border-blue-500 flex items-center bg-blue-50/50 py-1.5 rounded-r-lg">
                <span className="text-blue-600">{month.monthIndex.toString().slice(4)}</span>
                <span className="ml-2 text-gray-600">月</span>
                <span className="ml-4 text-sm text-gray-500 font-normal">· {month.books.length} 本书</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                {month.books.map((book) => (
                  <div
                    key={book.id}
                    ref={(el) => {
                      if (el && observerRef.current) {
                        el.setAttribute('data-book-id', book.id.toString());
                        observerRef.current.observe(el);
                      }
                    }}
                  >
                    {visibleBooks.has(book.id) ? (
                      <Card
                        className="max-w-[180px] group hover:scale-105 transition-all duration-300 bg-white relative overflow-hidden"
                        isFooterBlurred
                        radius="sm"
                        style={{
                          border: '2px #e6e8ec',
                          boxShadow: '0 1px 2px -1px rgba(0, 0, 0, 0.1), -2px 0 5px rgba(0, 0, 0, 0.03)',
                          borderRadius: '20px',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <CardHeader className="pb-0 pt-2 px-3 flex-col items-start z-10 rounded-t-lg">
                          <div className="w-full">
                            <h4 className="font-bold text-sm line-clamp-1 group-hover:text-blue-600 transition-colors font-sans tracking-tight">
                              {book.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {new Date(book.readTime).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
                              </span>
                              {book.tags && (
                                <span className="bg-blue-50 text-blue-600 px-1 py-0.5 rounded text-[10px] max-w-[80px] truncate">
                                  {book.tags.split(',')[0]}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className="px-3 pt-1 pb-2 flex justify-center items-center">
                          <div className="w-full flex justify-center">
                            {book.bookLinkUrl && (
                              <a
                                href={book.bookLinkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:opacity-90 transition-opacity"
                              >
                                {book.bookImageUrl ? (
                                  <div className="relative group w-[180px] h-[240px] overflow-hidden rounded-lg">
                                    <img
                                      alt={book.name}
                                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-95"
                                      src={`read/images/${book.bookImageUrl}`}
                                      onError={(e) => {
                                        console.error('Image load error:', book.bookImageUrl);
                                        e.currentTarget.src = 'https://via.placeholder.com/180x240?text=No+Image';
                                      }}
                                      style={{
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <p className="text-white text-xs truncate">{book.name}</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-[180px] h-[240px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">暂无封面</span>
                                  </div>
                                )}
                              </a>
                            )}
                          </div>
                        </CardBody>
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 w-full justify-center rounded-b-lg overflow-hidden backdrop-blur-sm py-0.5">
                          <div className="flex items-center justify-center gap-2 w-full">
                            <div className="flex items-center gap-1">
                              <span className="text-white/90 text-[10px] font-semibold">豆瓣</span>
                              <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-sm text-[10px]">{book.doubanScore}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-white/90 text-[10px] font-semibold">出版</span>
                              <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-sm text-[10px]">
                                {new Date(book.publishTime).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
                              </span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ) : (
                      <div className="max-w-[180px] h-[320px] bg-gray-100 animate-pulse rounded-[20px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bookrack;
