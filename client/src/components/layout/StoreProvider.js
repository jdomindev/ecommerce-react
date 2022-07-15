import React, {useEffect, useState} from "react";

import Cart from "./NavTabs"
import NavTabs from "../pages/Cart"
import Home from "../pages/Home"

export default function StoreProvider() {
  

  return (
    <>
        <Cart
        productIds={productIds()}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        onDeleteFromCart={onDeleteFromCart}
        />
        <NavTabs productIds={productIds()}/>
        <Home onAddToCart={onAddToCart}/>
    </>
  );
}
