import React from "react";
import AppNavbar from "./components/main/AppNavbar";
import Conts from "./components/main/Conts";
import MainSlide from "./components/main/MainSlide";
// import AppSidebar from "./components/main/AppSidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TopSearch from "./components/main/TopSearch";
import SingleBook from "./components/books/SingleBook";
import Cart from "./components/cart/Cart";
import { useCartState } from "./components/cart/cartStore";

function App() {
  console.log(useCartState());
  return (
    <>
      <Router>
        <TopSearch />
        <div className="item1">
          <AppNavbar />
        </div>
        {/* <div className="item2"><AppSidebar /></div> */}
        <Switch>
          <Route
            path={"/"}
            exact
            render={() => (
              <>
                <div className="item3">
                  <MainSlide />
                </div>
                <div className="item4">
                  <Conts />
                </div>
              </>
            )}
          />
          <Route
            path="/books/"
            exact
            render={() => (
              <div className="item4">
                <Conts />
              </div>
            )}
          />
          <Route path="/books/:id" component={SingleBook} />
          <Route path="/cart" component={Cart} />
        </Switch>

        <footer id="sticky-footer" className="py-4 main-blue text-white-50">
          <div className="container text-center">
            <small>Copyright &copy; Roberto Soriano</small>
          </div>
        </footer>
      </Router>
    </>
  );
}

export default App;
