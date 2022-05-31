import React from 'react';
// import { Link } from "react-router-dom";

import "../assets/Cart.css";


export default function Cart(props) {
    const {onAddToCart, onRemoveFromCart, cartItems} = props

    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.quantity, 0);
    const taxPrice = itemsPrice * .14;
    const shippingPrice = itemsPrice > 50 ? 0 : 12;
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    // const [cartItems, setCartItems] = useState([])
    
    // const onAddToCart = (product) => { 
    //     const exist = cartItems.find(x => x._id === product._id)
    //     if (exist) {
    //         setCartItems(cartItems.map(x => x._id === product._id ? {...exist, quantity: exist.quantity + 1} : x)) 
    //     } else {
    //         setCartItems([...cartItems, {...product, quantity: 1}])
    //     }
    // }

    // const onRemoveFromCart = (product) => {
    //     const exist = cartItems.find(x => x._id === product._id)
    //     if (exist.quantity === 1) {
    //         setCartItems(cartItems.filter(x => x.id !== product.id))
    //     } else {
    //         setCartItems(
    //             cartItems.map(x => x.id === product.id ? {...exist, quantity: exist.quantity - 1} : x)
    //         )
    //     }
    // }

  return (
    <>
        <h2>Cart Items</h2>
        <div>
            {cartItems.length === 0 && <div>Cart is Empty</div>}
        </div>
        <div className='container'>
            {cartItems.map(item => (
                <div key={item._id} className="row">
                    <div>{item.name}</div>
                    <div>
                        <button onClick={() => onAddToCart(item)} className="btn btn-success">+</button>
                        <button onClick={() => onRemoveFromCart(item)} className="btn btn-danger">-</button>
                    </div>
                    <div>
                        {item.quantity} x {item.price}
                    </div>
                </div>
                
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="row">
                        <h6>Product's Price</h6>
                        <div>${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <h6>Taxes</h6>
                        <div>${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <h6>Shipping</h6>
                        <div>${shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="row font-weight-bold">
                        <h6 className="font-weight-bold">Total Price</h6>
                        <div>${totalPrice.toFixed(2)}</div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <button className="btn btn-success" onClick={() => alert('Implement Checkout')}>Checkout</button>
                    </div>
                </>
            )}
        </div>
    </>
  );
}
