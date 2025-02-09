import { useState, createContext, useEffect } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);


const getDefaultCart = () => {
    return PRODUCTS.reduce((cart, product) => {
        cart[product.id] = 0;
        return cart;
    }, {});
};

const ShopProvider = ({ children }) => {
    
    const loadCartFromLocalStorage = () => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            return storedCart;
        }
        return getDefaultCart();
    };

    const [cartItems, setCartItems] = useState(loadCartFromLocalStorage);

    
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(prev[itemId] - 1, 0),
        }));
    };

    const updateCart = (newAmount, itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(newAmount, 0),
        }));
    };

    const resetCart = () => {
        setCartItems(getDefaultCart());
    };

    const removeItem = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: 0, 
        }));
    };

    const contextValue = { cartItems, addToCart, removeFromCart, updateCart, resetCart, removeItem };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;
