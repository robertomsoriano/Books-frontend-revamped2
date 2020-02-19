const getProducts = () => {
  return localStorage.getItem("CartItems")? [...JSON.parse(localStorage.getItem("CartItems"))] : []
}
const increaseQuantity = (book, orderQuantity=null) => {
  // let item = JSON.parse(JSON.stringify(book));
  if (localStorage.getItem("CartItems")) {
    // console.log("cart was not empty");
    if (localStorage.getItem("CartItems").includes(book._id)) {
      // console.log("item found in cart");
      let item = [...JSON.parse(localStorage.getItem("CartItems"))].filter(
        item => item._id === book._id
      );
      item = item[0];
      // console.log(item);
      let quant = orderQuantity? orderQuantity+item.quantity : item.quantity + 1;
      item = Object.assign(item, { quantity: quant });
      let items = [...JSON.parse(localStorage.getItem("CartItems"))];
      items = items.filter(book => book._id !== item._id);
      items.push(item);
      // console.log(...items);
      localStorage.setItem("CartItems", JSON.stringify(items));
      // console.log(localStorage.getItem("CartItems"));

      return;
    } else if (!localStorage.getItem("CartItems").includes(book._id)) {
      // console.log("item not found in cart");
      let item = JSON.parse(JSON.stringify(book));
      item = Object.assign(item, { quantity:( orderQuantity? orderQuantity : 1) });
      let items = [...JSON.parse(localStorage.getItem("CartItems"))];
      items.push(item);
      // console.log(...items);
      localStorage.setItem("CartItems", JSON.stringify(items));
      // console.log(localStorage.getItem("CartItems"));

      return;
    }
  } else {
    // console.log("cart was empty");
    let item = JSON.parse(JSON.stringify(book));
    item = Object.assign(item, { quantity: ( orderQuantity? orderQuantity : 1) });
    let items = Array.of(item);
    // console.log(items);
    localStorage.setItem("CartItems", JSON.stringify(items));
    // console.log(localStorage.getItem("CartItems"));
    return;
  }
  return;
};

const decreaseQuantity = (book) => {
  let item = [...JSON.parse(localStorage.getItem("CartItems"))].filter(
    item => item._id === book._id
  );
  item = item[0];
  let quant = item.quantity - 1;
  item = Object.assign(item, { quantity: quant });
  let items = [...JSON.parse(localStorage.getItem("CartItems"))];
  items = items.filter(book => book._id !== item._id);
  items.push(item);
  localStorage.setItem("CartItems", JSON.stringify(items));
  return;
};

const removeCartItem = (id) => {
  let items = [...JSON.parse(localStorage.getItem("CartItems"))];
    if (items){
      let newItems = items.filter(item => item._id !== id);
      return localStorage.setItem("CartItems", JSON.stringify(newItems));
    }
};


const clearCart = () => {
  if (localStorage.removeItem("CartItems")) localStorage.removeItem("CartItems");
};
const cartTotal = () => {
  let products = localStorage.getItem("CartItems")? [...JSON.parse(localStorage.getItem("CartItems"))] : []
  if (products.length > 0){
    let quant = products.map(prod => prod.price * prod.quantity);
    quant = quant.reduce((acc, curr) => acc + curr);
    return Math.round(quant * 100) / 100;}
  else{
    return 0
  }
};

const cartQuantity = () => {
  if (!localStorage.getItem("CartItems")) {
    return 0;
  }
  if (localStorage.getItem("CartItems")) {
    let products = [...JSON.parse(localStorage.getItem("CartItems"))];
    if(products.length > 0){
      let quant = products.map(prod => prod.quantity)
      quant = quant.reduce((acc, curr) => acc + curr)
      return quant
    }
    return 0
  }
  return 0;
};

export {getProducts, increaseQuantity, decreaseQuantity, removeCartItem, clearCart, cartTotal, cartQuantity };
