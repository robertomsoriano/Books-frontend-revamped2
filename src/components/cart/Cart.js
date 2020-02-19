import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import CartItems from "./CartItems";
import { useCartState, useCartDispatch } from "./cartStore";


const Cart = props => {
  const dispatch = useCartDispatch()
  const products= useCartState().products;
 
  useEffect(() => {
    console.log(products)
  }, [products]);
  
  
  return  (
    <div style={{minHeight:'82vh'}}>
      {products.length < 1 &&(
      <Container>
        <h2>Your Shopping Cart is empty!</h2>
        <h6>Add a book to shopping cart!</h6>

        <Link to={"/"}>
          <Button>Go back to products</Button>
        </Link>
        
      </Container>
      )}
      {products.length > 0 && (
        <>
      <Container>
      <Button onClick={() => dispatch({type: 'clearCart'})}>Empty Cart</Button>
        <CartItems products={products} />
      </Container>
      </>
      )}
      
    </div>
  ) 
}

export default withRouter(Cart)