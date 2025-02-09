import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const Product = ({ data }) => {
    const { id, productName, price, productImage } = data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    return (
        <div className="product">
            <img src={productImage} alt={productName} />
            <div className="description">
                <p><b>{productName}</b></p>
                <p>${price}</p>
            </div>
            <button className="btn" onClick={() => addToCart(id)}>
                Add To Cart {cartItemAmount > 0 && <span>({cartItemAmount})</span>}
            </button>
        </div>
    );
};

export default Product;
