import { PRODUCTS } from '../../products.js';
import './Shop.css';
import Product from './Product.jsx';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const Shop = () => {
  const { cartItems, resetCart } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search input
  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasItemsInCart = Object.values(cartItems).some(item => item > 0);

  const handleResetCart = () => {
    resetCart(); 
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className='cont'>
      <div className='shopTitle'>
        <h1>ChrisTech Products</h1>
      </div>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={clearSearch}>❌</button>
        )}
      </div>

      {/* Products */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>

      {/* Cart Buttons */}
      <div className='viewe'>
        <Link to="/cart">
          <button>Show Cart</button>
        </Link>
      </div>

      {hasItemsInCart && (
        <button onClick={handleResetCart} className="reset-btn">
          Reset Cart
        </button>
      )}
    </div>
  );
};

export default Shop;
