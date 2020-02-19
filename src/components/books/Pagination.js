import React from 'react';

const Pagination = ({currentPage,setPage,  booksPerPage, totalBooks, paginate }) => {
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  

  return (
    <nav className="pagination-container">
      <ul className='pagination' >
      <li class="page-item">
      <button class="page-link"  aria-label="First page" onClick={() => setPage(1)}>
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">First page</span>
      </button>
    </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number===currentPage? ` active`:``} ${number- 3 > currentPage? `d-none`: ``} ${number+ 2 < currentPage? `d-none`: ``}`}>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li class="page-item">
      <button class="page-link"  aria-label="Last Page" onClick={() => setPage(pageNumbers.length)}>
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Last page</span>
      </button>
    </li>
      </ul>
    </nav>
  );
};

export default Pagination;