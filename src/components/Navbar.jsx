import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import carty from "../assets/cart.png";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const [color, setColor] = useState(false);
  const [search, setSearch] = useState(""); 

  
  useEffect(() => {
    const changeColor = () => {
      setColor(window.scrollY >= 30);
    };

    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  
  const cartNumber = Object.values(cartItems).reduce(
    (total, itemCount) => total + itemCount,
    0
  );

  

  return (
    <nav className={color ? "navbar colors" : "navbar"}>
      <div className="nav">
        
        <div className="logo">
          <Link to="/">
            <h1>ChrisTech Shop</h1>
          </Link>
        </div>

       

        
        <div className="nav-links">
          <Link to="/cart" className="cart-link">
            <img src={carty} alt="Cart" />
            {cartNumber > 0 && <span className="cart-count">{cartNumber}</span>}
          </Link>
        </div>

       
        <div className="nav-mobile">
          <Link to="/cart" className="cart-link">
            <img src={carty} alt="Cart" />
            {cartNumber > 0 && (
              <span className="cart-counter">{cartNumber}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
