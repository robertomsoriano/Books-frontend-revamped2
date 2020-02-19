import React from "react";
import {withRouter} from 'react-router-dom'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import CartIcon from "../cart/CartIcon";

const AppNavbar = (props) => {

return (
  <div style={styles}>
  <Navbar expand="lg mx-auto">
  <Navbar.Brand onClick={() => props.history.push("/")}><strong style={{fontSize: '30px'}}>Sendas Antiguas</strong></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mx">
      <Nav.Link className={window.location.pathname=== '/'? 'active active-link': ''} onClick={() => props.history.push("/")}>Home</Nav.Link>
      <Nav.Link className={window.location.pathname=== '/books'? 'active active-link': ''} onClick={() => props.history.push("/books")}>Books</Nav.Link>
      <Nav.Link href="https://robertmsoriano.com" target="_blank">About</Nav.Link>
      <Nav.Link href="https://github.com/robertomsoriano/books-app" target="_blank">Github</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
  <div className="cart-icon">
  <CartIcon />
  </div>
</Navbar>
</div>
);
}

export default withRouter(AppNavbar);

const styles ={
  backgroundColor: '#fff !important',
  margin: '0 rem'
}