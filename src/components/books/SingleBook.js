import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useCartDispatch } from "../cart/cartStore";
import { withRouter } from "react-router";

const SingleBook = props => {
  const dispatch = useCartDispatch();
  const [bookQuantity, setBookQuantity] = useState(1);
  const [books, setBooks] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://libreriabiblica.org/api/books/${props.match.params.id}`
      );
      const data = await res.json();
      setBooks([data]);
    })();
  }, [props.match.params.id]);

  const handleQuantity = symb => {
    if (bookQuantity === 1 && symb === "-") return;
    if (symb === "-") {
      return setBookQuantity(bookQuantity => bookQuantity - 1);
    } else if (symb === "+") {
      handleSucess("yellow");
      setTimeout(() => {
        setSuccess(null);
      }, 800);
      return setBookQuantity(bookQuantity => bookQuantity + 1);
    }
  };
  const handleSucess = val => {
    setSuccess(val);
    setTimeout(() => {
      setSuccess(null);
    }, 800);
  };

  return (
    <div className="single-book-page container">
      {!books === 0 && <div>Loading...</div>}

      {books && (
        <>
          {books.map(item => (
            <div key={item._id} className="single-book">
              <img
                className="book-thumb d-none d-md-block"
                src={`${item.pic}`}
                alt={item.name}
                width="100px"
                height="100px"
              />
              <h1>
                {item.name} | {item.author}
              </h1>

              <img
                className="book-img"
                src={`${item.pic}`}
                data-full-src={`${item.pic}`}
                alt={item.name}
                width="600px"
                height="600px"
              />
              <div className="book-info">
                <>
                  <p>
                    {item.sale_price !== undefined &&
                      item.sale_price < item.price && (
                        <>
                          <strike>${item.price} </strike>{" "}
                          <strong> ${item.sale_price}</strong>
                        </>
                      )}
                    {(item.sale_price === undefined ||
                      item.sale_price === item.price) && (
                      <strong> ${item.price}</strong>
                    )}
                  </p>
                </>
                <div className="quantities">
                  {" "}
                  <Button
                    className={`edit-btn`}
                    size="small"
                    outline="true"
                    style={{ fontSize: "10px", margin: "4px" }}
                    onClick={() => handleQuantity("-")}
                  >
                    -
                  </Button>
                  {bookQuantity}
                  <Button
                    className={`edit-btn`}
                    outline="true"
                    size="small"
                    style={{ fontSize: "10px", margin: "4px" }}
                    onClick={() => handleQuantity("+")}
                  >
                    +
                  </Button>
                </div>
                <br />
                <Button
                  fluid
                  className={`add-to-cart-btn ${success}`}
                  onClick={() => {
                    dispatch({
                      type: "increaseQuantity",
                      payload: item,
                      quant: bookQuantity
                    });
                    handleSucess();
                  }}
                >
                  {" "}
                  Add to cart
                </Button>
                <h6>
                  <strong>Available for shipping or in-store pickup</strong>
                </h6>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </>
      )}
      <div className="back-btn">
        <Button
          outline="true"
          style={{ fontSize: "12px", margin: "4px" }}
          className="mt-5"
          onClick={() => props.history.push("/")}
        >
          <i className="fas fa-long-arrow-alt-left" /> Back to Books List
        </Button>
      </div>
    </div>
  );
};

export default withRouter(SingleBook);
