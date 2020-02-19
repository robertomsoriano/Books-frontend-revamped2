import React, { useEffect, useState } from "react";
import { withRouter} from "react-router-dom";
import CartIcon from '../cart/CartIcon'
import BooksSearch from '../books/BooksSearch'
const TopSearch = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://libreriabiblica.org/api/books");
      const data = await res.json();
      setBooks(data);
    })();
  }, []);

  return (
    <div className="top-ribbon">
      <BooksSearch books={books}/>
      <div className="d-lg-none"><CartIcon /></div>
    </div>
  );
};

export default withRouter(TopSearch);
