import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const CartItem = ({ data }) => {
    const { id, productName, price, productImage } = data;
    const { cartItems, addToCart, removeFromCart, updateCart, removeItem } = useContext(ShopContext);

  

    return (
        <div className="cartitem">
            <img src={productImage} alt={productName} />

            <div className="description">
                <p><b>{productName}</b></p>
                <p>${price}</p>

                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button>
                    <input
                        
                        value={cartItems[id] || 0}
                        min="0"
                        onChange={(e) => updateCart(id, Number(e.target.value))}
                    />
                    <button onClick={() => addToCart(id)}> + </button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(id)} >Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
