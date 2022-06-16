import React from 'react';
// import { Link } from "react-router-dom";

import "../assets/Cart.css";


export default function Cart(props) {
    const {onAddToCart, onRemoveFromCart, cartItems, countCartItems, onDeleteFromCart} = props

    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.quantity, 0);
    const taxPrice = itemsPrice * .06;
    const shippingPrice = itemsPrice > 50 ? 0 : 12;
    const totalPrice = itemsPrice + taxPrice + shippingPrice



  return (
    <>
        <div>
            {cartItems.length === 0 && <div>Cart is Empty</div>}
        </div>
            <div className="d-flex justify-content-center my-5">
                <div className='card cart-card'>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item d-flex justify-content-between align-items-center my-2">
                            <img src={item.image} className="cart-image" alt="cart item"/>
                            <div>{item.name}</div>
                            <div>
                                <button onClick={() => onRemoveFromCart(item)} className="btn btn-danger">-</button>
                                <button onClick={() => onAddToCart(item)} className="btn btn-success">+</button>
                            </div>
                            <div>
                                {item.quantity} x {item.price}
                            </div>
                            <button onClick={() => onDeleteFromCart(item)} className="btn btn-secondary">x</button>
                        </div>
                        
                    ))}
                </div>
            </div>
            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="d-flex justify-content-center my-5">
                        <div className='card cart-card'>
                            <div className="cart-item">
                                <div className="d-flex justify-content-between pb-1">
                                    <div>Items (<div className="badge">{countCartItems}</div>):</div>
                                    <div className=''>${itemsPrice.toFixed(2)}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-1">
                                    <div>Taxes:</div>
                                    <div>${taxPrice.toFixed(2)}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-1">
                                    <div>Shipping & handling:</div>
                                    <div>${shippingPrice.toFixed(2)}</div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="cart-item">
                                <div className="d-flex font-weight-bold justify-content-between pt-1">
                                    <div className="font-weight-bold">Total Price</div>
                                    <div>${totalPrice.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end button-margin">
                                <button className="btn btn-success" onClick={() => alert('Implement Checkout')}>Checkout</button>
                            </div>
                            
                        </div>
                    </div>
                </>
            )}
    </>
  );
}
