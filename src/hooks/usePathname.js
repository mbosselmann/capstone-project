import { useEffect, useCallback } from 'react'

export default function usePathname(pathname, books, setFilteredBooks) {
  const handleBookList = useCallback(
    (status, books) => {
      if (status === '/library') {
        const readBooks = books.filter(book => book.finished === true)
        setFilteredBooks(readBooks)
      }
      if (status === '/currently-reading') {
        const currentlyReadBooks = books.filter(book => book.finished === false)
        setFilteredBooks(currentlyReadBooks)
      }
    },
    [setFilteredBooks]
  )

  useEffect(() => {
    if (pathname === '/currently-reading') {
      handleBookList('/currently-reading', books)
    }
    if (pathname === '/library') {
      handleBookList('/library', books)
    }
  }, [pathname, books, handleBookList])
}
