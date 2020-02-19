import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Swal from "sweetalert2";
import { useCartDispatch, useCartState } from "./cartStore";


const CartItems = props => {
  let books = props.products;
  const dispatch = useCartDispatch()
  const CartTotal = () => {
    return useCartState().cartTotal
  }
  useEffect(() => {
    
  }, [books])
  const [stock, setStock] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://libreriabiblica.org/api/books");
      const data = await res.json();
      setStock(data);
    })();
  }, []);
// Remove Item from Cart
  const handleDelete = (e, book) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove item from cart?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        //TO DO
        dispatch({type: 'removeCartItem', payload: book._id})
        // removeCartItem(book._id)
      }
    })
  };



  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <h2>Your Shopping Cart</h2>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            <CSSTransition timeout={0} classNames="fade">
              <ListGroupItem>
                <h4>Cart Items</h4>
                <hr />
                <Table
                  hover
                  responsive
                  borderless
                  style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr>
                      <th />
                      <th />
                      <th />
                      <th>Quantity</th>
                      <th>Item Price</th>
                      <th>Item Total</th>
                    </tr>
                  </thead>
                  {books.length > 0 &&
                    books.map(book => (
                      <tbody key={book._id}>
                        <tr>
                          <th scope="row" />
                          <td>
                            <img
                              src={`${book.pic}`}
                              alt={book.name}
                              width="100px"
                              height="100px"
                            />
                          </td>
                          <td>{book.name}</td>

                          <td>
                            <div className="d-flex justify-content-center">
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                size="sm"
                                outline
                                onClick={e => {
                                  if (book.quantity === 1) {
                                    handleDelete(e, book);
                                    return;
                                  }
                                  dispatch({type: 'decreaseQuantity', payload: book})
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                -
                              </Button>
                            </Link>
                            {book.quantity}
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                outline
                                size="sm"
                                onClick={() => {
                                  let inQuestion = stock.filter(item => item._id===book._id)
                                  if((book.quantity + 1) > inQuestion[0].quantity){
                                    return Swal.fire({
                                      title: 'Could not add more books',
                                      text: "There are not enough books in stock to complete your order",
                                      type: 'error',
                                      confirmButtonColor: '#3085d6',
                                      footer: '<a href="/books">Check inventory</a>'
                                    })
                                  }
                                  else{dispatch({type: 'increaseQuantity', payload: book})}
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                +
                              </Button>
                            </Link>
                            </div>
                            <br />
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              outline
                              onClick={e => handleDelete(e, book)}
                              style={{ fontSize: "11px", margin: "2px" }}
                            >
                              &times; remove
                            </Button>
                          </td>
                          <td>${book.price}</td>
                          <td>${(book.price * book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
            </CSSTransition>
          </TransitionGroup>
        </ListGroup>
        <ListGroupItem className="float-md-right">
          Subtotal: <strong> ${CartTotal()}</strong> <br />
          <hr />
          {/* <Link
            to={{
              pathname: `/checkout`,
              state: { books }
            }}
          > */}
            <Button style={{ textDecoration: "none" }} onClick={() => {
              Swal.fire({
                title: 'Do you like what you see?',
                text: "Let's talk! Shoot me a message.",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Go to Contact form',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Keep looking'
                
              }).then((result) => {
                if (result.value) {
                  //TO DO
                  window.location.replace('https://robertmsoriano.com/#contact')
                  // removeCartItem(book._id)
                }
              })
            }}>
              Proceed to Checkout
            </Button>
          {/* </Link> */}
        </ListGroupItem>
        <ListGroupItem className="float-md-left">
          <Link to={"/books"}>
            <Button className="light-blue">Click here to keep shopping</Button>
          </Link>
        </ListGroupItem>
      </Container>
    </>
  );
};

export default withRouter(CartItems);
