import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Pagination from "./Pagination";

const BooksList = props => {
  const [books, setBooks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://libreriabiblica.org/api/books");
      const data = await res.json();
      setBooks(data);
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
