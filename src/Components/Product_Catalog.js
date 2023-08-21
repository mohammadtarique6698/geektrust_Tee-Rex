import React, { useState, useEffect } from "react";
import Filters from "./Filter";
import CartPage from "./Cart";

const Catalog = ({
  products,
  addToCart,
  cartItems,
  updateCartItemQuantity,
  removeItemFromCart
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, products]);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="catalog-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ paddingLeft: "1em" }}
          onClick={handleSearch}
        ></i>
        <i className="fa-solid fa-filter" style={{ paddingLeft: "1em" }}></i>
      </div>
      <div className="product-grid">
        <div className="filter-container">
          <Filters
            products={products}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            searchText={searchText}
          />
        </div>
        <div className="product-cards">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageURL}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-border">
                  <span className="product-price">Rs {product.price}</span>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showCartPage && (
          <div className="cart-page-container">
            <CartPage
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              removeCartItem={removeItemFromCart}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;