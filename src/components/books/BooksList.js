import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import {
  setWithExpiry,
  getLSItems,
  BOOKS_LS,
  BOOKS_API
} from "./BooksFunctions";

const BooksList = props => {
  const [books, setBooks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    (async () => {
      // TODO
      // Cache response in Local Storage and set Expiry Date
      // If cache is expired then make API call.
      if (getLSItems(BOOKS_LS)) {
        let data = getLSItems(BOOKS_LS);
        console.log("from cache");
        setBooks(data);
        return;
      } else if (!getLSItems(BOOKS_LS)) {
        console.log("from API");
        const res = await fetch(BOOKS_API);
        const data = await res.json();
        setWithExpiry(BOOKS_LS, data);
        setBooks(data);
      }
    })();
  }, []);

  // Get current Books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books
    ? books.slice(indexOfFirstBook, indexOfLastBook)
    : [];
  // Change page
  const paginate = pageNumber => setPage(pageNumber);

  const setPage = page => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    return window.scroll(0, 0);
  };
  return (
    <>
      {!books === 0 && <div>Loading...</div>}
      {books && (
        <>
          {currentBooks.map(item => (
            <BookCard
              key={item._id}
              id={item._id}
              img={item.pic}
              title={item.name}
              price={item.price}
              sale={item.sale_price}
              author={item.author}
              obj={item}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            setPage={setPage}
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
};

export default BooksList;
