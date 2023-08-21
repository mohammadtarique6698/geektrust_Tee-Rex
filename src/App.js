import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Catalog from "./Components/Product_Catalog";
import CartPage from "./Components/Cart";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToCart = (product) => {
    // Find if the product already exists in the cart
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      updateCartItemQuantity(product.id, existingCartItem.quantity + 1);
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItemFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const getTotalCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  console.log(getTotalCartAmount());

  return (
    <Router>
      <>
        <Header cartItemCount={getTotalCartQuantity()} />
        <Routes>
          <Route
            path="/"
            element={
              <Catalog
                products={products}
                addToCart={addToCart}
                updateCartItemQuantity={updateCartItemQuantity}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeCartItem={removeItemFromCart}
                totalAmount={cartItems.length > 0 ? getTotalCartAmount() : 0}
              />
            }
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;