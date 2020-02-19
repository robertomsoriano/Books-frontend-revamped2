import React from 'react';

import { cartQuantity, cartTotal, getProducts, removeCartItem, increaseQuantity, decreaseQuantity, clearCart } from './CartFunctions';

export const CartStore = React.createContext();
export const CartDispatch = React.createContext();
const initialState = {
  products: getProducts(),
  cartQuantity: cartQuantity(),
  cartTotal: cartTotal(),
  loading: false
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'increaseQuantity': {
      increaseQuantity(action.payload, action.quant)

      return {...state, products: getProducts(),  cartQuantity: cartQuantity(), cartTotal: cartTotal(), loading: false}
    }
    case 'decreaseQuantity': {
      decreaseQuantity(action.payload)
      return {...state, products: getProducts(),  cartQuantity: cartQuantity(), cartTotal: cartTotal(), loading: false}
    }
    case 'removeCartItem': {
      removeCartItem(action.payload)
      return {...state, products: getProducts(),  cartQuantity: cartQuantity(), cartTotal: cartTotal(), loading: false}
    }
    case 'clearCart': {
      clearCart()
      return {...state, products: getProducts(),  cartQuantity: cartQuantity(), cartTotal: cartTotal(), loading: false}
    }
    case 'cartTotal': {
      return {...state, cartTotal: cartTotal()}
    }
    case 'cartQuantity': {
      return {...state, products: getProducts(),  cartQuantity: cartQuantity(), cartTotal: cartTotal(), loading: false}
    }
    case "CART_LOADING":
      return {
        ...state,
        loading: true
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


export function CartProvider({children}) {
  const [state, dispatch] = React.useReducer(cartReducer, initialState)
  return (
    <CartStore.Provider value={state}>
      <CartDispatch.Provider value={dispatch}>
        {children}
      </CartDispatch.Provider>
    </CartStore.Provider>
  )
}

export function useCartState() {
  const context = React.useContext(CartStore)
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartStore.Provider')
  }
  return context
}
export function useCartDispatch() {
  const context = React.useContext(CartDispatch)
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartDispatch.Provider')
  }
  return context
}

export function useCart() {
  return [useCartState, useCartDispatch]
}