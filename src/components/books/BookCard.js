import React, { useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { withRouter } from "react-router";
import { useCartDispatch } from "../cart/cartStore";
import Swal from "sweetalert2";
import { formatURI } from "./BooksFunctions";
const BookCard = props => {
  const dispatch = useCartDispatch();
  const [success, setSuccess] = useState(null);
  const price = (
    <>
      {props.sale !== undefined && props.sale < props.price && (
        <>
          <strike>${props.price} </strike> <strong> ${props.sale}</strong>
        </>
      )}
      {(props.sale === undefined || props.sale === props.price) && (
        <strong> ${props.price}</strong>
      )}
    </>
  );

  const addToCart = async obj => {
    if (obj.quantity > 0) {
      await dispatch({ type: "increaseQuantity", payload: obj });
      await handleSucess("positive");
      return;
    } else if (obj.quantity < 1) {
      Swal.fire({
        title: "This book is not available in our store",
        text: "Contact us to make a special request",
        type: "error"
      });
    }
  };

  const handleSucess = val => {
    setSuccess(val);
    setTimeout(() => {
      setSuccess(null);
    }, 800);
  };
  return (
    <>
      <Card className="book-card">
        <Image
          src={props.img}
          wrapped
          ui={true}
          style={styles}
          onClick={() =>
            props.history.push({
              pathname: `/books/${formatURI(props.title)}`,
              state: { item: props.obj }
            })
          }
        />
        <Card.Content
          style={styles}
          onClick={() =>
            props.history.push({
              pathname: `/books/${formatURI(props.title)}`,
              state: { item: props.obj }
            })
          }
        >
          <Card.Header style={{ whiteSpace: "nowrap" }}>
            {props.title.substring(0, 25)}
          </Card.Header>
          <Card.Description>{price}</Card.Description>
          <Card.Description style={{ fontSize: "14px" }}>
            {props.author}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Button
            className={`add-to-cart-btn ${success}`}
            onClick={() => {
              addToCart(props.obj);
              handleSucess();
            }}
          >
            Add to cart
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default withRouter(BookCard);

const styles = {
  cursor: "pointer"
};
