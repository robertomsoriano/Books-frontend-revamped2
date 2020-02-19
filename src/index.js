import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import "./styles.css";
import App from "./App";
import { CartProvider } from "./components/cart/cartStore";



const rootElement = document.getElementById("root");
ReactDOM.render(<CartProvider><App /></CartProvider>, rootElement);
