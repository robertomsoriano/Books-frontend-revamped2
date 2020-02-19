import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useCartState } from "./cartStore";

const CartIcon = () => {
 const quantity = useCartState().cartQuantity
 useEffect(() => {
}, [quantity]);

  return (
    <Link to="/cart">
      <div style={{ display: "flex" }} >
        <div className="CartLink" style={styles}>
          <span style={{ color: "white", margin: "1px 15px " }}>
            {quantity}
          </span>
          <i
            className="fa fa-shopping-cart"
            title="View Cart"
            style={{ color: "white", maring: "1px" }}
          >
            &nbsp;
          </i>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(CartIcon);

const styles = {
  background: "#000000",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  position: "relative",
  display: "block",
  margin: "auto auto",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: "20px",
  fontWeight: "700",
  padding: "5px"
};
