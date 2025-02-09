import React, { useContext } from 'react';
import { PRODUCTS } from '../../products';
import CartItem from './CartItem';
import { ShopContext } from "../../context/ShopContext";
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, resetCart } = useContext(ShopContext); 

    const getTotalPrice = () => {
        return PRODUCTS.reduce((total, product) => {
            return total + product.price * cartItems[product.id];
        }, 0);
    };

    const handleResetCart = () => {
        resetCart(); 
    };

    
    const hasItemsInCart = Object.values(cartItems).some(itemCount => itemCount > 0);
    const itemCount = Object.values(cartItems).reduce((total, itemCount) => total + itemCount, 0); 
    const isMoreThanTwo = itemCount > 2; 
    return (
        <div className="cart">
            <h1>Your Cart Items <hr /></h1>
            {hasItemsInCart ? (
                <div className={isMoreThanTwo ? "wrapitem" : "limited"}>
                    {PRODUCTS.map((product) =>
                        cartItems[product.id] !== 0 ? (
                            <CartItem key={product.id} data={product} />
                        ) : null
                    )}
                </div>
            ) : (
                <>
                    <h1>No Products Selected</h1>
                    <Link to="/"><h3>Go to Products</h3></Link>
                </>
            )}

            <div className="checkout">
                {hasItemsInCart && (
                    <>
                        <p>Subtotal: <span>${getTotalPrice().toFixed(2)}</span></p>
                        <Link to="/">
                            <button>Continue Shopping</button>
                        </Link>
                        <button>Checkout</button>
                        <button className="reset-btn" onClick={handleResetCart}>Reset Cart</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
